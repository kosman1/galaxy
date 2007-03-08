import logging, threading, sys, os, time, subprocess, string, tempfile, re

from galaxy import util, model
from galaxy.model import mapping

import pkg_resources
pkg_resources.require( "PasteDeploy" )

from paste.deploy.converters import asbool

from Queue import Queue, Empty

log = logging.getLogger( __name__ )

# States for running a job. These are NOT the same as data states
JOB_WAIT, JOB_ERROR, JOB_OK, JOB_READY = 'wait', 'error', 'ok', 'ready'

class Sleeper( object ):
    """
    Provides a 'sleep' method that sleeps for a number of seconds *unless*
    the notify method is called (from a different thread).
    """
    def __init__( self ):
        self.condition = threading.Condition()
    def sleep( self, seconds ):
        self.condition.acquire()
        self.condition.wait( seconds )
        self.condition.release()
    def wake( self ):
        self.condition.acquire()
        self.condition.notify()
        self.condition.release()

class JobQueue( object ):
    """
    Job manager, waits for jobs to be runnable and then dispatches to 
    a JobRunner.
    """
    STOP_SIGNAL = object()
    def __init__( self, app ):
        """Start the job manager"""
        self.app = app
        # Should we use IPC to communicate (needed if forking)
        self.track_jobs_in_database = app.config.get( 'track_jobs_in_database', False )
        # Keep track of the pid that started the job manager, only it
        # has valid threads
        self.parent_pid = os.getpid()
        # Contains new jobs
        self.queue = Queue()
        # Contains jobs that are waiting (only use from monitor thread)
        self.waiting = []
        # Helper for interruptable sleep
        self.sleeper = Sleeper()
        self.running = True
        self.dispatcher = DefaultJobDispatcher( app )
        self.monitor_thread = threading.Thread( target=self.monitor )
        self.monitor_thread.start()
        log.debug( "job manager started" )

    def monitor( self ):
        """
        Continually iterate the waiting jobs, checking is each is ready to 
        run and dispatching if so.
        """
        # HACK: Delay until after forking, we need a way to do post fork notification!!!
        time.sleep( 10 )
        while self.running:
            # Pull all new jobs from the queue at once
            new_jobs = []
            if self.track_jobs_in_database:
                model = self.app.model
                for j in model.Job.select( model.Job.c.state == 'new' ):
                    job = JobWrapper( j.id, self.app.toolbox.tools_by_id[ j.tool_id ], self )
                    new_jobs.append( job )
            else:
                try:
                    while 1:
                        message = self.queue.get_nowait()
                        if message is self.STOP_SIGNAL:
                            return
                        # Unpack the message
                        job_id, tool_id = message
                        # Create a job wrapper from it
                        job = JobWrapper( job_id, self.app.toolbox.tools_by_id[ tool_id ], self )
                        # Append to watch queue
                        new_jobs.append( job )
                except Empty:
                    pass
            # Iterate over new and waiting jobs and look for any that are 
            # ready to run
            new_waiting = []
            for job in ( new_jobs + self.waiting ):
                try:
                    # Run the job, requeue if not complete                    
                    job_state = job.check_if_ready_to_run()
                    if job_state == JOB_WAIT: 
                        new_waiting.append( job )
                        #log.debug( "the job has been requeued" )
                    elif job_state == JOB_ERROR:
                        log.info( "job %d ended with an error" % job.job_id )
                    elif job_state == JOB_READY:
                        self.dispatcher.put( job )
                        log.debug( "job %d dispatched" % job.job_id )
                    else:
                        log.error( "unknown job state '%s' for job '%d'", job_state, job.job_id )
                except:
                    job.fail("failure running job")
                    log.exception( "failure running job %d" % job.job_id  )
            # Update the waiting list
            self.waiting = new_waiting
            # Sleep
            self.sleeper.sleep( 1 )
            
    def put( self, job_id, tool ):
        """Add a job to the queue (by job identifier)"""
        if not self.track_jobs_in_database:
            self.queue.put( ( job_id, tool.id ) )
            self.sleeper.wake()
    
    def shutdown( self ):
        """Attempts to gracefully shut down the worker thread"""
        if self.parent_pid != os.getpid():
            # We're not the real job queue, do nothing
            return
        else:
            log.info( "sending stop signal to worker thread" )
            self.running = False
            if not self.track_jobs_in_database:
                self.queue.put( self.STOP_SIGNAL )
            self.sleeper.wake()
            log.info( "job queue stopped" )
            self.dispatcher.shutdown()

class JobWrapper( object ):
    """
    Wraps a 'model.Job' with convience methods for running processes and 
    state management.
    """
    def __init__(self, job_id, tool, queue ):
        self.job_id = job_id
        self.tool = tool
        self.queue = queue
        self.app = queue.app
        
    def fail( self, message ):
        """
        Indicate job failure by setting state and message on all output 
        datasets.
        """
        job = model.Job.get( self.job_id )
        job.refresh()
        for dataset_assoc in job.output_datasets:
            dataset = dataset_assoc.dataset
            dataset.refresh()
            dataset.state = dataset.states.ERROR
            dataset.blurb = 'tool error'
            dataset.info = "ERROR: " + message
            dataset.flush()
        job.state = model.Job.states.ERROR
        job.flush()
        
    def change_state( self, state ):
        job = model.Job.get( self.job_id )
        job.refresh()
        for dataset_assoc in job.output_datasets:
            dataset = dataset_assoc.dataset
            dataset.refresh()
            dataset.state = state
            dataset.flush()
        job.state = state
        job.flush()
        
    def check_if_ready_to_run( self ):
        job = model.Job.get( self.job_id )
        job.refresh()
        for dataset_assoc in job.input_datasets:
            idata = dataset_assoc.dataset
            idata.refresh()
            # an error in the input data causes us to bail immediately
            if idata.state == idata.states.ERROR:
                self.fail( "error in input data %d" % idata.hid )
                return JOB_ERROR
            elif idata.state == idata.states.FAKE:
                continue
            elif idata.state != idata.states.OK:
                # need to requeue
                return JOB_WAIT
        return JOB_READY
        
    def finish( self, stdout, stderr ):
        # default post job setup
        mapping.context.current.clear()
        job = model.Job.get( self.job_id )
        job.state = 'ok'
        for dataset_assoc in job.output_datasets:
            dataset = dataset_assoc.dataset
            dataset.refresh()
            dataset.state = model.Dataset.states.OK
            dataset.blurb = 'done'
            dataset.peek  = 'no peek'
            dataset.info  = stdout + stderr
            if dataset.has_data():
                dataset.set_peek()
            else:
                if stderr: 
                    dataset.state = model.Dataset.states.ERROR
                    dataset.blurb = "error"
                    job.state = "error"
                else:
                    dataset.blurb = "empty"
        # Save stdout and stderr    
        if len( stdout ) > 32768:
            log.error( "stdout for job '%d' is greater than 32K, only first part will be logged to database", job.id )
        job.stdout = stdout[:32768]
        if len( stderr ) > 32768:
            log.error( "stderr for job '%d' is greater than 32K, only first part will be logged to database", job.id )
        job.stderr = stderr[:32768]  
        # custom post process setup
        inp_data = dict( [ ( da.name, da.dataset ) for da in job.input_datasets ] )
        out_data = dict( [ ( da.name, da.dataset ) for da in job.output_datasets ] )
        param_dict = dict( [ ( p.name, p.value ) for p in job.parameters ] )
        self.tool.call_hook( 'exec_after_process', self.queue.app, inp_data=inp_data, 
                             out_data=out_data, param_dict=param_dict, 
                             tool=self.tool, stdout=stdout, stderr=stderr )
        # remove temporary file
        if job.param_filename: 
            os.remove( job.param_filename )
        # remove 'fake' datasets 
        for dataset_assoc in job.input_datasets:
            data = dataset_assoc.dataset
            if data.state == data.states.FAKE:
                data.deleted = True
        # validate output datasets
        for out_dataset in job.output_datasets:
            # file must exist in order to validate it
            if os.path.exists(out_dataset.dataset.file_name):
                errors = out_dataset.dataset.datatype.validate(out_dataset.dataset)
                if len(errors) > 0:
                    # create child dataset with errors
                    errordata = model.Dataset( hid=out_dataset.dataset.hid,
                                               state=model.Dataset.states.OK,
                                               extension='text',
                                               name='Errors',
                                               info='', blurb='Errors!')
                    assoc = model.DatasetChildAssociation()
                    assoc.child = errordata
                    out_dataset.dataset.children.append( assoc )
                    errordata.flush()
                    errorfile = open(errordata.file_name,"w")
                    for error in errors:
                        print >> errorfile, str( error )
                    errorfile.close()
                    errordata.set_peek()
                    self.app.model.flush()
        mapping.context.current.flush()
        log.debug('job ended, id: %d' % self.job_id )
        
    def get_command_line( self ):
        job = model.Job.get( self.job_id )
        return job.command_line
    
    def get_session_id( self ):
        job = model.Job.get( self.job_id )
        return job.session_id

    def get_input_fnames( self ):
        job = model.Job.get( self.job_id )
        return [ da.dataset.file_name for da in job.input_datasets ]

    def get_output_fnames( self ):
        job = model.Job.get( self.job_id )
        return [ da.dataset.file_name for da in job.output_datasets ]

class DefaultJobDispatcher( object ):
    def __init__( self, app ):
        self.app = app
        self.use_pbs = asbool( app.config.use_pbs )
        import runners.local
        self.local_job_runner = runners.local.LocalJobRunner( app )
        if self.use_pbs:
            import runners.pbs
            self.pbs_job_runner = runners.pbs.PBSJobRunner( app )
            self.put = self.dispatch_pbs
        else:
            self.put = self.dispatch_default
            
    def dispatch_default( self, job_wrapper ):
        self.local_job_runner.put( job_wrapper )
        log.debug( "dispatching job %d to local runner", job_wrapper.job_id )
            
    def dispatch_pbs( self, job_wrapper ):
        command_line = job_wrapper.get_command_line()
        if ( command_line is None ) or ( "/tools/data_source" in command_line ):
            log.debug( "dispatching job %d to local runner", job_wrapper.job_id )
            self.local_job_runner.put( job_wrapper )
        else:
            self.pbs_job_runner.put( job_wrapper )
            log.debug( "dispatching job %d to pbs runner", job_wrapper.job_id )
        
    def shutdown( self ):
        self.local_job_runner.shutdown()
        if self.use_pbs:
            self.pbs_job_runner.shutdown()  
    
    
