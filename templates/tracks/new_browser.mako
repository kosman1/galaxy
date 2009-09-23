<%inherit file="/base.mako"/>

<%def name="javascripts()">
${parent.javascripts()}
<script type="text/javascript">
$( function() {
    $( "select[refresh_on_change='true']").change( function() {
        $("#form").submit();
    });
});
</script>
</%def>

<div class="form">
    <div class="form-title">Select datasets to include in browser</div>
    <div id="dbkey" class="form-body">
        <form id="form" method="POST">
            <div class="form-row">
                <label for="dbkey">Reference genome build (dbkey): </label>
                <div class="form-row-input">
                    <select name="dbkey" id="dbkey" refresh_on_change="true">
                        %for tmp_dbkey in dbkey_set:
                        <option value="${tmp_dbkey}"
                        %if tmp_dbkey == dbkey:
                        selected="selected"
                        %endif
                        >${tmp_dbkey}</option>
                        %endfor
                    </select>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="form-row">
                <label for="dataset_ids">Datasets to include: </label>
                %for dataset_id, dataset_name in datasets.items():
                <div>
                    <input type="checkbox" id="${dataset_id}" name="dataset_ids" value="${dataset_id}" />
                    <label style="display:inline; font-weight: normal" for="${dataset_id}">${dataset_name}</label>
                </div>
                %endfor

                <div style="clear: both;"></div>
            </div>
        </div>
        <div class="form-row">
            <input type="submit" name="browse" value="Browse"/>
        </div>
    </form>    
</div>
