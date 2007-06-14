import logging, os, sys, time, sets, tempfile
from galaxy import util
from cgi import escape
import galaxy.datatypes.registry
from galaxy.datatypes.metadata import *
log = logging.getLogger(__name__)

# Constants for data states
DATA_NEW, DATA_OK, DATA_FAKE = 'new', 'ok', 'fake'

class DataMeta( type ):
    def __init__( cls, name, bases, dict_ ):
        cls._metadataspec = MetadataSpecCollection()
        Statement.process( cls )

class Data( object ):
    __metaclass__ = DataMeta

    def set_peek( self, dataset ):
        dataset.peek  = ''
        dataset.blurb = 'data'
    def init_meta( self, dataset ):
        # set values according to defaults set in metadata_spec
        if "metadata" not in dataset: dataset.metadata = MetadataCollection()
        for item in self.get_metadata_spec():
            dataset.metadata[item.name] = item.default
    def missing_meta( self, dataset):
        return False
    def bed_viewport( self, dataset ):
        raise Exception( "'bed_viewport' not supported for this datatype" )
    def as_bedfile( self, dataset ):
        raise Exception( "'as_bedfile' not supported for this datatype" )
    def display_peek(self, dataset):
        try:
            return escape(dataset.peek)
        except:
            return "peek unavailable"
    def display_name(self, dataset):
        try:
            return escape(dataset.name)
        except:
            return "name unavailable"
    def display_info(self, dataset):
        try:
            return escape(dataset.info)
        except:
            return "info unavailable"
    def get_ucsc_sites(self, dataset):
        return util.get_ucsc_by_build(dataset.dbkey)
    def validate(self, dataset):
        """Unimplemented validate, return no exceptions"""
        return list()
    def repair_methods(self, dataset):
        """Unimplemented method, returns dict with method/option for repairing errors"""
        return None

    @classmethod
    def get_metadata_spec( cls ):
        return cls._metadataspec

    @classmethod
    def convert_to( cls, dataset, target_cls ):
        # This is by no means supposed to perform anything more
        # complex than simply changing the datatype of the dataset,
        # and copying over any metadata that could or should possibly
        # stay the same.
        old_meta = dataset.metadata
        dataset.metadata = dict()
        new_obj = target_cls()
        new_obj.init_meta( dataset )
        
class Text( Data ):
    def write_from_stream(self, stream):
        "Writes data from a stream"
        # write it twice for now 
        fd, temp_name = tempfile.mkstemp()
        while 1:
            chunk = stream.read(1048576)
            if not chunk:
                break
            os.write(fd, chunk)
        os.close(fd)

        # rewrite the file with unix newlines
        fp = open(self.file_name, 'wt')
        for line in file(temp_name, "U"):
            line = line.strip() + '\n'
            fp.write(line)
        fp.close()

    def set_raw_data(self, data):
        """Saves the data on the disc"""
        fd, temp_name = tempfile.mkstemp()
        os.write(fd, data)
        os.close(fd)

        # rewrite the file with unix newlines
        fp = open(self.file_name, 'wt')
        for line in file(temp_name, "U"):
            line = line.strip() + '\n'
            fp.write(line)
        fp.close()

        os.remove( temp_name )

    def delete(self):
        """Remove the file that corresponds to this data"""
        obj.DBObj.delete(self)
        try:
            os.remove(self.file_name)
        except OSError, e:
            log.critical('%s delete error %s' % (self.__class__.__name__, e))

    def get_mime(self):
        """Returns the mime type of the data"""
        return galaxy.datatypes.registry.Registry().get_mimetype_by_extension( self.extension.lower() )
   
    def set_peek(self, dataset):
        dataset.peek  = get_file_peek( dataset.file_name )
        dataset.blurb = util.commaify( str( get_line_count( dataset.file_name ) ) ) + " lines"

class Binary( Data ):
    """Binary data"""
    def set_peek( self, dataset ):
        dataset.peek  = 'binary data'
        dataset.blurb = 'data'

def nice_size(size):
    """
    Returns a readably formatted string with the size

    >>> nice_size(100)
    '100.0 bytes'
    >>> nice_size(10000)
    '9.8 Kb'
    >>> nice_size(1000000)
    '976.6 Kb'
    >>> nice_size(100000000)
    '95.4 Mb'
    """
    words = [ 'bytes', 'Kb', 'Mb', 'Gb' ]
    for ind, word in enumerate(words):
        step  = 1024 ** (ind + 1)
        if step > size:
            size = size / float(1024 ** ind)
            out  = "%.1f %s" % (size, word)
            return out
    return '??? bytes'

def get_file_peek(file_name, WIDTH=256, LINE_COUNT=5 ):
    """Returns the first LINE_COUNT lines wrapped to WIDTH"""
    
    lines = []
    count = 0
    for line in file(file_name):
        line = line.strip()[:WIDTH]
        lines.append(line)
        if count==LINE_COUNT:
            break
        count += 1
    text  = '\n'.join(lines)
    return text

def get_line_count(file_name):
    """Returns the number of lines in a file that are neither null nor comments"""
    count = 0
    for line in file(file_name):
        line = line.strip()
        if line and line[0] != '#':
            count += 1
    return count
