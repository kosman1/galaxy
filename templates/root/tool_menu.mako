## Render a tool
<%def name="render_tool( tool, section )">
    %if not tool.hidden:
        %if section:
            <div class="toolTitle">
        %else:
            <div class="toolTitleNoSection">
        %endif
            <%
                if tool.input_required:
                    link = h.url_for( controller='tool_runner', tool_id=tool.id )
                else:
                    link = h.url_for( tool.action, ** tool.get_static_param_values( t ) )
            %>
            ## FIXME: This doesn't look right
            ## %if "[[" in tool.description and "]]" in tool.description:
            ##   ${tool.description.replace( '[[', '<a href="link" target="galaxy_main">' % $tool.id ).replace( "]]", "</a>" )
            %if tool.name:
                <a id="link-${tool.id}" href="${link}" target=${tool.target} minsizehint="${tool.uihints.get( 'minwidth', -1 )}">${_(tool.name)}</a> ${tool.description} 
            %else:
                <a id="link-${tool.id}" href="${link}" target=${tool.target} minsizehint="${tool.uihints.get( 'minwidth', -1 )}">${tool.description}</a>
            %endif
        </div>
    %endif
</%def>

## Render a workflow
<%def name="render_workflow( key, workflow, section )">
    %if section:
        <div class="toolTitle">
    %else:
        <div class="toolTitleNoSection">
    %endif
        <% encoded_id = key.lstrip( 'workflow_' ) %>
        <a id="link-${workflow.id}" href="${ h.url_for( controller='workflow', action='run', id=encoded_id, check_user=False )}" target="_parent"}">${_(workflow.name)}</a>
    </div>
</%def>

## Render a label
<%def name="render_label( label )">
    <div class="toolPanelLabel" id="title_${label.id}">
        <span>${label.text}</span>
    </div>
</%def>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>${_('Galaxy Tools')}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="${h.url_for('/static/style/base.css')}" rel="stylesheet" type="text/css" />
        <link href="${h.url_for('/static/style/tool_menu.css')}" rel="stylesheet" type="text/css" />

        ##<script type="text/javascript" src="${h.url_for('/static/scripts/jquery.js')}"></script>
        ${h.js( "jquery", "galaxy.base" )}

        <script type="text/javascript">
            $(document).ready(function() { 
                $( "div.toolSectionBody" ).hide();
                $( "div.toolSectionTitle > span" ).wrap( "<a href='#'></a>" )
                var last_expanded = null;
                $( "div.toolSectionTitle" ).each( function() { 
                   var body = $(this).next( "div.toolSectionBody" );
                   $(this).click( function() {
                       if ( body.is( ":hidden" ) ) {
                            if ( last_expanded ) {
                                last_expanded.slideUp( "fast" );
                            }
                            last_expanded = body;
                            body.slideDown( "fast" );
                       }
                       else {
                           body.slideUp( "fast" );
                           last_expanded = null;
                       }
                       return false;
                   });
                });
                
                $( "a[minsizehint]" ).click( function() {
                    if ( parent.handle_minwidth_hint ) {
                        parent.handle_minwidth_hint( $(this).attr( "minsizehint" ) );
                    }
                });
                
                // Init searching.
                $("#tool-search-query").click( function (){
                    $(this).focus();
                    $(this).select();
                })
                .keyup( function () {
                    // Remove italics.
                    $(this).css("font-style", "normal");
                    
                    // Don't update if same value as last time
                    if ( this.value.length < 3 ) {
                        reset_tool_search(false);
                    } else if ( this.value != this.lastValue ) {
                        // input.addClass(config.loadingClass);
                        // Add '*' to facilitate partial matching.
                        var q = this.value + '*';
                        // Stop previous ajax-request
                        if (this.timer) {
                            clearTimeout(this.timer);
                        }
                        // Start a new ajax-request in X ms
                        $("#search-spinner").show();
                        this.timer = setTimeout(function () {
                            $.get( "tool_search", { query: q }, function (data) {
                                // input.removeClass(config.loadingClass);
                                // Show live-search if results and search-term aren't empty
                                $("#search-no-results").hide();
                                $(".toolSectionWrapper").hide();
                                $(".toolTitle").hide();
                                if ( data.length != 0 ) {
                                    // Map tool ids to element ids and join them.
                                    var s = $.map( data, function( n, i ) { return "#link-" + n; } ).join( ", " );
                                    
                                    // First pass to show matching tools and their parents.
                                    $(s).parent().show().parent().parent().show().parent().show();
                                    
                                    // Hide labels that have no visible children.
                                    $(".toolPanelLabel").each( function() {
                                       var this_label = $(this);                                   
                                       var next = this_label.next();
                                       var no_visible_tools = true;
                                       // Look through tools following label and, if none are visible, hide label.
                                       while (next.length != 0 && next.hasClass("toolTitle"))
                                       {
                                           if (next.is(":visible"))
                                           {
                                               no_visible_tools = false;
                                               break;
                                           }
                                           else
                                               next = next.next();
                                        }
                                        if (no_visible_tools)
                                            this_label.hide();
                                    });
                                } else {
                                    $("#search-no-results").show();
                                }
                                $("#search-spinner").hide();
                            }, "json" );
                        }, 200 );
                    }
                    this.lastValue = this.value;
                });
            });
        </script>
    </head>

    <body class="toolMenuPage">
        <div class="toolMenu">
            
                ## Tool search.
                <div id="tool-search" style="padding-bottom: 5px; position: relative; display: none; width: 100%">
                    <input type="text" name="query" value="search tools" id="tool-search-query" style="width: 100%; font-style:italic; font-size: inherit"/>
                    <img src="${h.url_for('/static/images/loading_small_white_bg.gif')}" id="search-spinner" style="display: none; position: absolute; right: 0; top: 5px;"/>
                </div>
                
                ## Tools.
                %for key, val in toolbox.tool_panel.items():
                    <div class="toolSectionWrapper">
                    %if key.startswith( 'tool' ):
                        ${render_tool( val, False )}
                    %elif key.startswith( 'workflow' ):
                        ${render_workflow( key, val, False )}
                    %elif key.startswith( 'section' ):
                        <% section = val %>
                        <div class="toolSectionTitle" id="title_${section.id}">
                            <span>${section.name}</span>
                        </div>
                        <div id="${section.id}" class="toolSectionBody">
                            <div class="toolSectionBg">
                                %for section_key, section_val in section.elems.items():
                                    %if section_key.startswith( 'tool' ):
                                        ${render_tool( section_val, True )}
                                    %elif section_key.startswith( 'workflow' ):
                                        ${render_workflow( section_key, section_val, True )}
                                    %elif section_key.startswith( 'label' ):
                                        ${render_label( section_val )}
                                    %endif
                                %endfor
                            </div>
                        </div>
                    %elif key.startswith( 'label' ):
                        ${render_label( val )}
                    %endif
                    <div class="toolSectionPad"></div>
                    </div>
                %endfor
                
                ## Feedback when search returns no results.
                <div id="search-no-results" style="display: none; padding-top: 5px">
                    <em><strong>Your search did not match any tools.</strong></em>
                </div>
                
                ## Link to workflow management. The location of this may change, but eventually
                ## at least some workflows will appear here (the user should be able to
                ## configure which of their stored workflows appear in the tools menu). 
                
                %if t.user:
                    <div class="toolSectionPad"></div>
                    <div class="toolSectionPad"></div>
                    <div class="toolSectionTitle" id="title_XXinternalXXworkflow">
                      <span>Workflows</span>
                    </div>
                    <div id="XXinternalXXworkflow" class="toolSectionBody">
                        <div class="toolSectionBg">
                            %if t.user.stored_workflow_menu_entries:
                                %for m in t.user.stored_workflow_menu_entries:
                                    <div class="toolTitle">
                                        <a href="${h.url_for( controller='workflow', action='run', id=trans.security.encode_id(m.stored_workflow_id) )}" target="galaxy_main">${m.stored_workflow.name}</a>
                                    </div>
                                %endfor
                            %endif
                            <div class="toolTitle">
                                <a href="${h.url_for( controller='workflow', action='list_for_run')}" target="galaxy_main">All workflows</a>
                            </div>
                        </div>
                    </div>
                %endif
                
            </div>
        </div>
    </body>
</html>
