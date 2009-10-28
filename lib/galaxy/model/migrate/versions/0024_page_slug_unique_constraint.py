"""
Remove unique constraint from page slugs to allow creating a page with
the same slug as a deleted page.
"""

from sqlalchemy import *
from migrate import *
from migrate.changeset import *

import datetime
now = datetime.datetime.utcnow

import logging
log = logging.getLogger( __name__ )

metadata = MetaData( migrate_engine )

def upgrade():
    print __doc__
    metadata.reflect()

    Page_table = Table( "page", metadata, autoload=True )

    i = Index( "ix_page_slug", Page_table.c.slug )
    i.drop()
    
    i = Index( "ix_page_slug", Page_table.c.slug, unique=False )
    i.create()


def downgrade():
    metadata.reflect()
    #Page_table = Table( "page", metadata, autoload=True )
    #Page_table.c.slug.alter( unique=True )
