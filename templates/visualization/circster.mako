<%inherit file="/webapps/galaxy/base_panels.mako"/>

<%def name="init()">
<%
    self.has_left_panel=False
    self.has_right_panel=False
    self.active_view="visualization"
    self.message_box_visible=False
%>
</%def>

<%def name="stylesheets()">
    ${parent.stylesheets()}
</%def>

<%def name="javascripts()">
    ${parent.javascripts()}

    ${h.js( "libs/require", "mvc/data" )}

    <script type="text/javascript">

        require.config({ 
            baseUrl: "${h.url_for('/static/scripts')}",
            shim: {
                "libs/d3": { exports: "d3" }
            }
        });

        require( [ "libs/d3", "viz/visualization", "viz/circster" ], function( d3, visualization, circster ) {

            $(function() {
                
                // -- Visualization menu and set up.
                var menu = create_icon_buttons_menu([
                    { icon_class: 'plus-button', title: 'Add tracks', on_click: function() { add_tracks(); } },
                    { icon_class: 'disk--arrow', title: 'Save', on_click: function() { 
                        // Show saving dialog box
                        show_modal("Saving...", "progress");

                        $.ajax({
                            url: "${h.url_for( action='save' )}",
                            type: "POST",
                            data: {
                                'id': view.vis_id,
                                'title': view.name,
                                'dbkey': view.dbkey,
                                'type': 'trackster',
                                'config': JSON.stringify(payload)
                            },
                            dataType: "json",
                            success: function(vis_info) {
                                hide_modal();
                                view.vis_id = vis_info.vis_id;
                                view.has_changes = false;

                                // Needed to set URL when first saving a visualization.
                                window.history.pushState({}, "", vis_info.url + window.location.hash);
                            },
                            error: function() { 
                                show_modal( "Could Not Save", "Could not save visualization. Please try again later.", 
                                            { "Close" : hide_modal } );
                            }
                        });
                    } },
                    { icon_class: 'cross-circle', title: 'Close', on_click: function() { 
                        window.location = "${h.url_for( controller='visualization', action='list' )}";
                    } }
                ], {
                    tooltip_config: { placement: 'bottom' }
                });

                menu.$el.attr("style", "float: right");
                $("#center .unified-panel-header-inner").append(menu.$el);
                // Manual tooltip config because default gravity is S and cannot be changed.
                $(".menu-button").tooltip( { placement: 'bottom' } );
                
                // -- Viz set up. --
                
                var genome = new visualization.Genome(JSON.parse('${ h.to_json_string( genome ) }'))
                    vis = new visualization.GenomeVisualization(JSON.parse('${ h.to_json_string( viz_config ) }')),
                    viz_view = new circster.CircsterView({
                        el: $('#vis'),
                        // Gap is difficult to set because it very dependent on chromosome size and organization.
                        total_gap: 2 * Math.PI * 0.1,
                        genome: genome,
                        model: vis,
                        dataset_arc_height: 25
                    });
                
                // -- Render viz. --
                    
                viz_view.render();

            });
        });
    </script>
</%def>

<%def name="center_panel()">
    <div class="unified-panel-header" unselectable="on">
        <div class="unified-panel-header-inner">
            <div style="float:left;" id="title">${viz_config[ 'title' ]} (${viz_config[ 'dbkey' ]})</div>
        </div>
        <div style="clear: both"></div>
    </div>
    <div id="vis" class="unified-panel-body"></div>
</%def>
