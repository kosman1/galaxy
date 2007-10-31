<!-- -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>
<title>Galaxy</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link href="${h.url_for('/static/style/history.css')}" rel="stylesheet" type="text/css" />
<link href="${h.url_for('/static/style/base.css')}" rel="stylesheet" type="text/css" />

<style type="text/css">
div.toolForm{
    margin-top: 10px;
    margin-bottom: 10px;
}
div.historyItem {
    margin-right: 0;
}
th {
    border-bottom: solid black 1px;
}
</style>

<script type="text/javascript">
## Always try to hide the history pane since it is redundant on this page
if ( window.parent && window.parent.handle_minwidth_hint ) {
    window.parent.handle_minwidth_hint( 10000 );
}
</script>

</head>

<body>

<%def name="history_item( data )">
    %if data.state in [ "no state", "", None ]:
        <% data_state = "queued" %>
    %else:
        <% data_state = data.state %>
    %endif
    <div class="historyItemWrapper historyItem historyItem-${data_state}" id="historyItem-$data.id">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                %if data_state != 'ok':
                    <td style="width: 20px;">
                        <div style='padding-right: 5px;'><img src="${h.url_for( '/static/style/data_%s.png' % data_state )}" border="0" align="middle"></div>
                    </td>
                %endif
                <td>
                    <div style="overflow: hidden;">
                        <span class="historyItemTitle"><b>${data.hid}: ${data.display_name()}</b></span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</%def>

<p>The following list contains each tool that was run to create the
datasets in your current history. Please select those that you wish
to include in the workflow.</p>

<p>Tools which cannot be run interactively and thus cannot be incorporated
into a workflow will be shown in gray.</p>

%for warning in warnings:
    <div class="warningmark">${warning}</div>
%endfor

<form method="post" action="${h.url_for()}">
<div class='form-row'>
    <label>Workflow name</label>
    <input name="workflow_name" type="text" value="Unnamed workflow" />
</div>
<p><input type="submit" value="Create Workflow" /></p>

<table border="0" cellspacing="0">
    
    <tr>
        <th style="width: 47.5%">Tool</th>
        <th style="width: 5%"></th>
        <th style="width: 47.5%">History items created</th>
    </tr>

%for job, datasets in jobs.iteritems():

    <%
    tool = app.toolbox.tools_by_id[ job.tool_id ]
    cls = "toolForm"
    if not( tool.is_workflow_compatible ):
        cls += " toolFormDisabled"
        disabled = True
    else:
        disabled = False
    %>
    
    <tr>
        <td>
            <div class="${cls}">

                <div class="toolFormTitle">${tool.name}</div>
                <div class="toolFormBody">
                    %if disabled:
                        <div style="font-style: italic; color: gray">This tool cannot be used in workflows</div>
                    %else:
                        <div><input type="checkbox" name="job_ids" value="${job.id}" checked="true" />Include "${tool.name}" in workflow</div>
                    %endif
                </div>
            </div>
        </td>
        <td style="text-align: center;">
            &#x25B6;
        </td>
        <td>
            %for _, data in datasets:
                <div>${history_item( data )}</div>     
            %endfor
        </td>
    </tr>

%endfor

</table>

</form>
    
</body>

</html>