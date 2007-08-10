"""
Provides mapping between extensions and datatypes, mime-types, etc.
"""
import os
import logging
import data, tabular, interval, images, sequence
import galaxy.util
from galaxy.util.odict import odict

class Registry( object ):
    def __init__( self, datatypes = [] ):
        self.log = logging.getLogger(__name__)
        self.datatypes_by_extension = {}
        self.mimetypes_by_extension = {}
        self.datatype_converters = odict()
        for ext, kind in datatypes:
            try:
                mime_type = None
                fields = kind.split(",")
                if len(fields)>1:
                    kind = fields[0].strip()
                    mime_type = fields[1].strip()
                fields = kind.split(":")
                datatype_module = fields[0]
                datatype_class = fields[1]
                fields = datatype_module.split(".")
                module = __import__(fields.pop(0))
                for mod in fields: module = getattr(module,mod)
                self.datatypes_by_extension[ext] = getattr(module, datatype_class)()
                if mime_type is None:
                    # Use default mime type as per datatype spec
                    mime_type = self.datatypes_by_extension[ext].get_mime()
                self.mimetypes_by_extension[ext] = mime_type
            except:
                self.log.warning('error loading datatype: %s' % ext)
        #default values
        if len(self.datatypes_by_extension) < 1:
            self.datatypes_by_extension = { 
                'data'     : data.Data(), 
                'bed'      : interval.Bed(), 
                'txt'      : data.Text(), 
                'text'     : data.Text(),
                'interval' : interval.Interval(), 
                'tabular'  : tabular.Tabular(),
                'png'      : images.Image(), 
                'pdf'      : images.Image(), 
                'fasta'    : sequence.Fasta(),
                'maf'      : sequence.Maf(),
                'axt'      : sequence.Axt(),
                'gff'      : interval.Gff(),
                'wig'      : interval.Wiggle(),
                'gmaj.zip' : images.Gmaj(),
                'laj'      : images.Laj(),
                'lav'      : sequence.Lav(),
                'html'     : images.Html(),
                'customtrack' : interval.CustomTrack(),
                'gbrowsetrack' : interval.GBrowseTrack()
            }
            self.mimetypes_by_extension = { 
                'data'     : 'application/octet-stream', 
                'bed'      : 'text/plain', 
                'txt'      : 'text/plain', 
                'text'     : 'text/plain',
                'interval' : 'text/plain', 
                'tabular'  : 'text/plain',
                'png'      : 'image/png', 
                'pdf'      : 'application/pdf', 
                'fasta'    : 'text/plain',
                'maf'      : 'text/plain',
                'axt'      : 'text/plain',
                'gff'      : 'text/plain',
                'wig'      : 'text/plain',
                'gmaj.zip' : 'application/zip',
                'laj'      : 'text/plain',
                'lav'      : 'text/plain',
                'html'     : 'text/html',
                'customtrack' : 'text/plain',
                'gbrowsetrack' : 'text/plain'
            }
    
    def get_mimetype_by_extension(self, ext ):
        """
        Returns a mimetype based on an extension
        """
        try:
            mimetype = self.mimetypes_by_extension[ext]
        except KeyError:
            #datatype was never declared
            mimetype = 'application/octet-stream'
            self.log.warning('unkown mimetype in data factory %s' % ext)
        return mimetype
    
    def get_datatype_by_extension(self, ext ):
        """
        Returns a datatype based on an extension
        """
        try:
            builder = self.datatypes_by_extension[ext]
        except KeyError:
            builder = data.Text()
            self.log.warning('unknown extension in data factory %s' % ext)
        return builder

    def change_datatype(self, data, ext ):
        data.extension = ext
        # call init_meta and copy metadata from itself.  The datatype
        # being converted *to* will handle any metadata copying and
        # initialization.
        data.init_meta( copy_from=data )
        if data.has_data():
            data.set_peek()
        return data

    def old_change_datatype(self, data, ext):
        """
        Creates and returns a new datatype based on an existing data and an extension
        """
        newdata = factory(ext)(id=data.id)
        for key, value in data.__dict__.items():
            setattr(newdata, key, value)
        newdata.ext = ext
        return newdata
        
    def load_datatype_converters(self, datatype_converters_config, datatype_converters_path, toolbox):
        """Loads datatype converters from a file, and adds to the toolbox"""
        self.datatype_converters = odict()        
        tree = galaxy.util.parse_xml( datatype_converters_config )
        root = tree.getroot()
        self.log.debug( "Loading converters from %s" % (datatype_converters_config) )
        for elem in root.findall("converter"):
            path = elem.get("file")
            source_datatype = elem.get("source_datatype").split(",")
            target_datatype = elem.get("target_datatype")
            converter = toolbox.load_tool( os.path.join( datatype_converters_path, path ) )
            self.log.debug( "Loaded converter: %s", converter.id )
            toolbox.tools_by_id[converter.id] = converter
            for source_d in source_datatype:
                if source_d not in self.datatype_converters:
                    self.datatype_converters[source_d] = odict()
                self.datatype_converters[source_d][target_datatype] = converter
    def get_converters_by_datatype(self, ext):
        """Returns available converters by source type"""
        converters = odict()
        source_datatype = type(self.get_datatype_by_extension(ext))
        for ext2, dict in self.datatype_converters.items():
            converter_datatype = type(self.get_datatype_by_extension(ext2))
            if issubclass(source_datatype, converter_datatype):
                converters.update(dict)
        #Ensure ext-level converters are present
        if ext in self.datatype_converters.keys():
            converters.update(self.datatype_converters[ext])
        return converters
    def get_converter_by_target_type(self, source_ext, target_ext):
        """Returns a converter based on source and target datatypes"""
        converters = self.get_converters_by_datatype(source_ext)
        if target_ext in converters.keys():
            return converters[target_ext]
        return None
