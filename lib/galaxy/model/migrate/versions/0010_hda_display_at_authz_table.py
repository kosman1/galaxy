from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.exceptions import *
from migrate import *
from migrate.changeset import *

import datetime
now = datetime.datetime.utcnow

import sys, logging
log = logging.getLogger( __name__ )
log.setLevel(logging.DEBUG)
handler = logging.StreamHandler( sys.stdout )
format = "%(name)s %(levelname)s %(asctime)s %(message)s"
formatter = logging.Formatter( format )
handler.setFormatter( formatter )
log.addHandler( handler )

# Need our custom types, but don't import anything else from model
from galaxy.model.custom_types import *

metadata = MetaData( migrate_engine )
db_session = scoped_session( sessionmaker( bind=migrate_engine, autoflush=False, transactional=False ) )

HistoryDatasetAssociationDisplayAtAuthorization_table = Table( "history_dataset_association_display_at_authorization", metadata,
    Column( "id", Integer, primary_key=True ),
    Column( "create_time", DateTime, default=now ),
    Column( "update_time", DateTime, index=True, default=now, onupdate=now ),
    Column( "history_dataset_association_id", Integer, ForeignKey( "history_dataset_association.id" ), index=True ),
    Column( "user_id", Integer, ForeignKey( "galaxy_user.id" ), index=True ),
    Column( "site", TrimmedString( 255 ) ) )

def upgrade():
    # Load existing tables
    metadata.reflect()
    try:
        HistoryDatasetAssociationDisplayAtAuthorization_table.create()
    except Exception, e:
        log.debug( "Creating history_dataset_association_display_at_authorization table failed: %s" % str( e ) )  
    
def downgrade():
    # Load existing tables
    metadata.reflect()
    try:
        HistoryDatasetAssociationDisplayAtAuthorization_table.drop()
    except Exception, e:
        log.debug( "Dropping history_dataset_association_display_at_authorization table failed: %s" % str( e ) )  
