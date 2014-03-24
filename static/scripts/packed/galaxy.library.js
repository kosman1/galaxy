var view=null;var library_router=null;var responses=[];define(["galaxy.masthead","utils/utils","libs/toastr"],function(l,i,n){var f=Backbone.Model.extend({urlRoot:"/api/libraries/"});var c=Backbone.Model.extend({urlRoot:"/api/folders"});var o=Backbone.Collection.extend({url:"/api/libraries",model:f,sort_key:"name",sort_order:null,});var j=Backbone.Model.extend({urlRoot:"/api/libraries/datasets"});var d=Backbone.Collection.extend({model:j});var e=Backbone.Model.extend({defaults:{folder:new d(),full_path:"unknown",urlRoot:"/api/folders/",id:"unknown"},parse:function(r){this.full_path=r[0].full_path;this.get("folder").reset(r[1].folder_contents);return r}});var b=Backbone.Model.extend({urlRoot:"/api/histories/"});var k=Backbone.Model.extend({url:"/api/histories/"});var p=Backbone.Collection.extend({url:"/api/histories",model:k});var m=Backbone.View.extend({el:"#center",progress:0,progressStep:1,lastSelectedHistory:"",modal:null,folders:null,initialize:function(){this.folders=[];this.queue=jQuery.Deferred();this.queue.resolve()},templateFolder:function(){var r=[];r.push('<div class="library_container" style="width: 90%; margin: auto; margin-top: 2em; ">');r.push('<h3>Data Libraries Beta Test. This is work in progress. Please report problems & ideas via <a href="mailto:galaxy-bugs@bx.psu.edu?Subject=DataLibrariesBeta_Feedback" target="_blank">email</a> and <a href="https://trello.com/c/nwYQNFPK/56-data-library-ui-progressive-display-of-folders" target="_blank">Trello</a>.</h3>');r.push('<div id="library_folder_toolbar" >');r.push('   <button title="Create New Folder" id="toolbtn_create_folder" class="primary-button" type="button"><span class="fa fa-plus"></span> <span class="fa fa-folder-close"></span> folder</button>');r.push('   <button title="Import selected datasets into history" id="toolbtn_bulk_import" class="primary-button" style="display: none; margin-left: 0.5em;" type="button"><span class="fa fa-book"></span> to history</button>');r.push('   <div id="toolbtn_dl" class="btn-group" style="margin-left: 0.5em; display: none; ">');r.push('       <button title="Download selected datasets" id="drop_toggle" type="button" class="primary-button dropdown-toggle" data-toggle="dropdown">');r.push('       <span class="fa fa-download"></span> download <span class="caret"></span>');r.push("       </button>");r.push('       <ul class="dropdown-menu" role="menu">');r.push('          <li><a href="#/folders/<%= id %>/download/tgz">.tar.gz</a></li>');r.push('          <li><a href="#/folders/<%= id %>/download/tbz">.tar.bz</a></li>');r.push('          <li><a href="#/folders/<%= id %>/download/zip">.zip</a></li>');r.push("       </ul>");r.push("   </div>");r.push("</div>");r.push('<ol class="breadcrumb">');r.push('   <li><a title="Return to the list of libraries" href="#">Libraries</a></li>');r.push("   <% _.each(path, function(path_item) { %>");r.push("   <% if (path_item[0] != id) { %>");r.push('   <li><a title="Return to this folder" href="#/folders/<%- path_item[0] %>"><%- path_item[1] %></a> </li> ');r.push("<% } else { %>");r.push('   <li class="active"><span title="You are in this folder"><%- path_item[1] %></span></li>');r.push("   <% } %>");r.push("   <% }); %>");r.push("</ol>");r.push('<table id="folder_table" class="grid table table-condensed">');r.push("   <thead>");r.push('       <th class="button_heading"></th>');r.push('       <th style="text-align: center; width: 20px; "><input id="select-all-checkboxes" style="margin: 0;" type="checkbox"></th>');r.push("       <th>name</th>");r.push("       <th>data type</th>");r.push("       <th>size</th>");r.push("       <th>date (UTC)</th>");r.push("   </thead>");r.push("   <tbody>");r.push('       <td><a href="#<% if (upper_folder_id !== 0){ print("folders/" + upper_folder_id)} %>" title="Go to parent folder" class="btn_open_folder btn btn-default btn-xs">..<a></td>');r.push("       <td></td>");r.push("       <td></td>");r.push("       <td></td>");r.push("       <td></td>");r.push("       <td></td>");r.push("       </tr>");r.push("       <% _.each(items, function(content_item) { %>");r.push('           <% if (content_item.get("type") === "folder") { %>');r.push('               <tr class="folder_row light" id="<%- content_item.id %>">');r.push("                   <td>");r.push('                       <span title="Folder" class="fa fa-folder-o"></span>');r.push("                   </td>");r.push("                   <td></td>");r.push("                   <td>");r.push('                       <a href="#folders/<%- content_item.id %>"><%- content_item.get("name") %></a>');r.push('                       <% if (content_item.get("item_count") === 0) { %>');r.push('                           <span class="muted">(empty folder)</span>');r.push("                       <% } %>");r.push("                   </td>");r.push("                   <td>folder</td>");r.push('                   <td><%= _.escape(content_item.get("item_count")) %> item(s)</td>');r.push('                   <td><%= _.escape(content_item.get("time_updated")) %></td>');r.push("               </tr>");r.push("           <% } else {  %>");r.push('               <tr class="dataset_row light" id="<%- content_item.id %>">');r.push("                   <td>");r.push('                       <span title="Dataset" class="fa fa-file-o"></span>');r.push("                   </td>");r.push('                   <td style="text-align: center; "><input style="margin: 0;" type="checkbox"></td>');r.push('                   <td><a href="#" class="library-dataset"><%- content_item.get("name") %><a></td>');r.push('                   <td><%= _.escape(content_item.get("data_type")) %></td>');r.push('                   <td><%= _.escape(content_item.get("readable_size")) %></td>');r.push('                   <td><%= _.escape(content_item.get("time_updated")) %></td>');r.push("               </tr>");r.push("               <% } %>  ");r.push("       <% }); %>");r.push("       ");r.push("   </tbody>");r.push("</table>");r.push("</div>");return r.join("")},templateDatasetModal:function(){var r=[];r.push('<div class="modal_table">');r.push('   <table class="grid table table-striped table-condensed">');r.push("       <tr>");r.push('           <th scope="row" id="id_row" data-id="<%= _.escape(item.get("ldda_id")) %>">Name</th>');r.push('           <td><%= _.escape(item.get("name")) %></td>');r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Data type</th>');r.push('           <td><%= _.escape(item.get("data_type")) %></td>');r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Genome build</th>');r.push('           <td><%= _.escape(item.get("genome_build")) %></td>');r.push("       </tr>");r.push('           <th scope="row">Size</th>');r.push("           <td><%= _.escape(size) %></td>");r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Date uploaded (UTC)</th>');r.push('           <td><%= _.escape(item.get("date_uploaded")) %></td>');r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Uploaded by</th>');r.push('           <td><%= _.escape(item.get("uploaded_by")) %></td>');r.push("       </tr>");r.push('           <tr scope="row">');r.push('           <th scope="row">Data Lines</th>');r.push('           <td scope="row"><%= _.escape(item.get("metadata_data_lines")) %></td>');r.push("       </tr>");r.push('       <th scope="row">Comment Lines</th>');r.push('           <% if (item.get("metadata_comment_lines") === "") { %>');r.push('               <td scope="row"><%= _.escape(item.get("metadata_comment_lines")) %></td>');r.push("           <% } else { %>");r.push('               <td scope="row">unknown</td>');r.push("           <% } %>");r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Number of Columns</th>');r.push('           <td scope="row"><%= _.escape(item.get("metadata_columns")) %></td>');r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Column Types</th>');r.push('           <td scope="row"><%= _.escape(item.get("metadata_column_types")) %></td>');r.push("       </tr>");r.push("       <tr>");r.push('           <th scope="row">Miscellaneous information</th>');r.push('           <td scope="row"><%= _.escape(item.get("misc_blurb")) %></td>');r.push("       </tr>");r.push("   </table>");r.push('   <pre class="peek">');r.push("   </pre>");r.push("</div>");return r.join("")},templateHistorySelectInModal:function(){var r=[];r.push('<span id="history_modal_combo" style="width:100%; margin-left: 1em; margin-right: 1em; ">');r.push("Select history: ");r.push('<select id="dataset_import_single" name="dataset_import_single" style="width:40%; margin-bottom: 1em; "> ');r.push("   <% _.each(histories, function(history) { %>");r.push('       <option value="<%= _.escape(history.get("id")) %>"><%= _.escape(history.get("name")) %></option>');r.push("   <% }); %>");r.push("</select>");r.push("</span>");return r.join("")},templateBulkImportInModal:function(){var r=[];r.push('<span id="history_modal_combo_bulk" style="width:90%; margin-left: 1em; margin-right: 1em; ">');r.push("Select history: ");r.push('<select id="dataset_import_bulk" name="dataset_import_bulk" style="width:50%; margin-bottom: 1em; "> ');r.push("   <% _.each(histories, function(history) { %>");r.push('       <option value="<%= _.escape(history.get("id")) %>"><%= _.escape(history.get("name")) %></option>');r.push("   <% }); %>");r.push("</select>");r.push("</span>");return r.join("")},templateProgressBar:function(){var r=[];r.push('<div class="import_text">');r.push("Importing selected datasets to history <b><%= _.escape(history_name) %></b>");r.push("</div>");r.push('<div class="progress">');r.push('   <div class="progress-bar progress-bar-import" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 00%;">');r.push('       <span class="completion_span">0% Complete</span>');r.push("   </div>");r.push("</div>");r.push("");return r.join("")},templateNewFolderInModal:function(){tmpl_array=[];tmpl_array.push('<div id="new_folder_modal">');tmpl_array.push("<form>");tmpl_array.push('<input type="text" name="Name" value="" placeholder="Name">');tmpl_array.push('<input type="text" name="Description" value="" placeholder="Description">');tmpl_array.push("</form>");tmpl_array.push("</div>");return tmpl_array.join("")},events:{"click #select-all-checkboxes":"selectAll","click #toolbtn_bulk_import":"modalBulkImport","click #toolbtn_dl":"bulkDownload","click #toolbtn_create_folder":"createFolderFromModal","click .library-dataset":"showDatasetDetails","click .dataset_row":"selectClickedRow"},render:function(r){$("#center").css("overflow","auto");view=this;var t=this;var s=new e({id:r.id});s.url=s.attributes.urlRoot+r.id+"/contents";s.fetch({success:function(u){for(var w=0;w<s.attributes.folder.models.length;w++){var v=s.attributes.folder.models[w];if(v.get("type")==="file"){v.set("readable_size",t.size_to_string(v.get("file_size")))}}var y=s.full_path;var z;if(y.length===1){z=0}else{z=y[y.length-2][0]}var x=_.template(t.templateFolder(),{path:s.full_path,items:s.attributes.folder.models,id:r.id,upper_folder_id:z});t.$el.html(x)},error:function(){n.error("An error occured :(")}})},size_to_string:function(r){var s="";if(r>=100000000000){r=r/100000000000;s="TB"}else{if(r>=100000000){r=r/100000000;s="GB"}else{if(r>=100000){r=r/100000;s="MB"}else{if(r>=100){r=r/100;s="KB"}else{r=r*10;s="b"}}}}return(Math.round(r)/10)+s},showDatasetDetails:function(u){u.preventDefault();var v=$(u.target).parent().parent().parent().attr("id");if(typeof v==="undefined"){v=$(u.target).parent().attr("id")}if(typeof v==="undefined"){v=$(u.target).parent().parent().attr("id")}var t=new j();var s=new p();t.id=v;var r=this;t.fetch({success:function(w){s.fetch({success:function(x){r.renderModalAfterFetch(w,x)},error:function(){n.error("An error occured during fetching histories:(");r.renderModalAfterFetch(w)}})},error:function(){n.error("An error occured during loading dataset details :(")}})},renderModalAfterFetch:function(w,t){var u=this.size_to_string(w.get("file_size"));var v=_.template(this.templateDatasetModal(),{item:w,size:u});var s=this;this.modal=Galaxy.modal;this.modal.show({closing_events:true,title:"Dataset Details",body:v,buttons:{Import:function(){s.importCurrentIntoHistory()},Download:function(){s.downloadCurrent()},Close:function(){s.modal.hide()}}});$(".peek").html("Peek:"+w.get("peek"));if(typeof history.models!==undefined){var r=_.template(this.templateHistorySelectInModal(),{histories:t.models});$(this.modal.elMain).find(".buttons").prepend(r);if(s.lastSelectedHistory.length>0){$(this.modal.elMain).find("#dataset_import_single").val(s.lastSelectedHistory)}}},downloadCurrent:function(){this.modal.disableButton("Import");this.modal.disableButton("Download");var r=[];r.push($("#id_row").attr("data-id"));var s="/api/libraries/datasets/download/uncompressed";var t={ldda_ids:r};folderContentView.processDownload(s,t);this.modal.enableButton("Import");this.modal.enableButton("Download")},importCurrentIntoHistory:function(){this.modal.disableButton("Import");this.modal.disableButton("Download");var t=$(this.modal.elMain).find("select[name=dataset_import_single] option:selected").val();this.lastSelectedHistory=t;var r=$("#id_row").attr("data-id");var u=new b();var s=this;u.url=u.urlRoot+t+"/contents";u.save({content:r,source:"library"},{success:function(){n.success("Dataset imported");s.modal.enableButton("Import");s.modal.enableButton("Download")},error:function(){n.error("An error occured! Dataset not imported. Please try again.");s.modal.enableButton("Import");s.modal.enableButton("Download")}})},selectAll:function(s){var r=s.target.checked;that=this;$(":checkbox").each(function(){this.checked=r;$row=$(this.parentElement.parentElement);(r)?that.makeDarkRow($row):that.makeWhiteRow($row)});this.checkTools()},selectClickedRow:function(s){var u="";var r;var t;if(s.target.localName==="input"){u=s.target;r=$(s.target.parentElement.parentElement);t="input"}else{if(s.target.localName==="td"){u=$("#"+s.target.parentElement.id).find(":checkbox")[0];r=$(s.target.parentElement);t="td"}}if(u.checked){if(t==="td"){u.checked="";this.makeWhiteRow(r)}else{if(t==="input"){this.makeDarkRow(r)}}}else{if(t==="td"){u.checked="selected";this.makeDarkRow(r)}else{if(t==="input"){this.makeWhiteRow(r)}}}this.checkTools()},makeDarkRow:function(r){r.removeClass("light");r.find("a").removeClass("light");r.addClass("dark");r.find("a").addClass("dark");r.find("span").removeClass("fa-file-o");r.find("span").addClass("fa-file")},makeWhiteRow:function(r){r.removeClass("dark");r.find("a").removeClass("dark");r.addClass("light");r.find("a").addClass("light");r.find("span").addClass("fa-file-o");r.find("span").removeClass("fa-file")},checkTools:function(){var r=$("#folder_table").find(":checked");if(r.length>0){$("#toolbtn_bulk_import").show();$("#toolbtn_dl").show()}else{$("#toolbtn_bulk_import").hide();$("#toolbtn_dl").hide()}},modalBulkImport:function(){var s=this;var r=new p();r.fetch({success:function(t){var u=_.template(s.templateBulkImportInModal(),{histories:t.models});s.modal=Galaxy.modal;s.modal.show({closing_events:true,title:"Import into History",body:u,buttons:{Import:function(){s.importAllIntoHistory()},Close:function(){s.modal.hide()}}})},error:function(){n.error("An error occured :(")}})},importAllIntoHistory:function(){this.modal.disableButton("Import");var t=$("select[name=dataset_import_bulk] option:selected").val();var x=$("select[name=dataset_import_bulk] option:selected").text();var z=[];$("#folder_table").find(":checked").each(function(){if(this.parentElement.parentElement.id!=""){z.push(this.parentElement.parentElement.id)}});var y=_.template(this.templateProgressBar(),{history_name:x});$(this.modal.elMain).find(".modal-body").html(y);var u=100/z.length;this.initProgress(u);var r=[];for(var s=z.length-1;s>=0;s--){library_dataset_id=z[s];var v=new b();var w=this;v.url=v.urlRoot+t+"/contents";v.content=library_dataset_id;v.source="library";r.push(v)}this.chainCall(r)},chainCall:function(s){var r=this;var t=s.pop();if(typeof t==="undefined"){n.success("All datasets imported");this.modal.hide();return}var u=$.when(t.save({content:t.content,source:t.source})).done(function(v){r.updateProgress();responses.push(v);r.chainCall(s)})},initProgress:function(r){this.progress=0;this.progressStep=r},updateProgress:function(){this.progress+=this.progressStep;$(".progress-bar-import").width(Math.round(this.progress)+"%");txt_representation=Math.round(this.progress)+"% Complete";$(".completion_span").text(txt_representation)},download:function(r,v){var t=[];$("#folder_table").find(":checked").each(function(){if(this.parentElement.parentElement.id!=""){t.push(this.parentElement.parentElement.id)}});var s="/api/libraries/datasets/download/"+v;var u={ldda_ids:t};this.processDownload(s,u,"get")},processDownload:function(s,t,u){if(s&&t){t=typeof t=="string"?t:$.param(t);var r="";$.each(t.split("&"),function(){var v=this.split("=");r+='<input type="hidden" name="'+v[0]+'" value="'+v[1]+'" />'});$('<form action="'+s+'" method="'+(u||"post")+'">'+r+"</form>").appendTo("body").submit().remove();n.info("Your download will begin soon")}},createFolderFromModal:function(){event.preventDefault();event.stopPropagation();var r=this;this.modal=Galaxy.modal;this.modal.show({closing_events:true,title:"Create New Folder",body:this.templateNewFolderInModal(),buttons:{Create:function(){r.create_new_folder_event()},Close:function(){r.modal.hide();r.modal=null}}})},create_new_folder_event:function(){var r=this.serialize_new_folder();if(this.validate_new_folder(r)){var t=new c();url_items=Backbone.history.fragment.split("/");current_folder_id=url_items[url_items.length-1];t.url=t.urlRoot+"/"+current_folder_id;var s=this;t.save(r,{success:function(u){s.modal.hide();n.success("Folder created");s.render({id:current_folder_id})},error:function(){n.error("An error occured :(")}})}else{n.error("Folder's name is missing")}return false},serialize_new_folder:function(){return{name:$("input[name='Name']").val(),description:$("input[name='Description']").val()}},validate_new_folder:function(r){return r.name!==""}});var a=Backbone.View.extend({el:"#libraries_element",events:{"click .edit_library_btn":"edit_button_event","click .save_library_btn":"save_library_modification","click .cancel_library_btn":"cancel_library_modification","click .delete_library_btn":"delete_library","click .undelete_library_btn":"undelete_library"},modal:null,collection:null,initialize:function(){var r=this;this.collection=new o();this.collection.fetch({success:function(s){r.render();$("#center [data-toggle]").tooltip();$("#center").css("overflow","auto")},error:function(t,s){n.error("An error occured. Please try again.")}})},render:function(s){var t=this.templateLibraryList();var u=null;var r=false;var v=null;if(typeof s!=="undefined"){r=typeof s.with_deleted!=="undefined"?s.with_deleted:false;v=typeof s.models!=="undefined"?s.models:null}if(this.collection!==null&&v===null){if(r){u=this.collection.models}else{u=this.collection.where({deleted:false})}}else{if(v!==null){u=v}else{u=[]}}this.$el.html(t({libraries:u,order:this.collection.sort_order}))},sortLibraries:function(s,r){if(s==="name"){if(r==="asc"){this.collection.sort_order="asc";this.collection.comparator=function(u,t){if(u.get("name").toLowerCase()>t.get("name").toLowerCase()){return 1}if(t.get("name").toLowerCase()>u.get("name").toLowerCase()){return -1}return 0}}else{if(r==="desc"){this.collection.sort_order="desc";this.collection.comparator=function(u,t){if(u.get("name").toLowerCase()>t.get("name").toLowerCase()){return -1}if(t.get("name").toLowerCase()>u.get("name").toLowerCase()){return 1}return 0}}}this.collection.sort()}},templateLibraryList:function(){tmpl_array=[];tmpl_array.push('<div class="library_container table-responsive">');tmpl_array.push("<% if(libraries.length === 0) { %>");tmpl_array.push("<div>I see no libraries. Why don't you create one?</div>");tmpl_array.push("<% } else{ %>");tmpl_array.push('<table class="grid table table-condensed">');tmpl_array.push("   <thead>");tmpl_array.push('     <th style="width:30%;"><a title="Click to reverse order" href="#sort/name/<% if(order==="desc"||order===null){print("asc")}else{print("desc")} %>">name</a> <span title="Sorted alphabetically" class="fa fa-sort-alpha-<%- order %>"></span></th>');tmpl_array.push('     <th style="width:22%;">description</th>');tmpl_array.push('     <th style="width:22%;">synopsis</th> ');tmpl_array.push('     <th style="width:26%;"></th> ');tmpl_array.push("   </thead>");tmpl_array.push("   <tbody>");tmpl_array.push("       <% _.each(libraries, function(library) { %>");tmpl_array.push('           <tr class="<% if(library.get("deleted") === true){print("active");}%>" data-id="<%- library.get("id") %>">');tmpl_array.push('               <td><a href="#folders/<%- library.get("root_folder_id") %>"><%- library.get("name") %></a></td>');tmpl_array.push('               <td><%= _.escape(library.get("description")) %></td>');tmpl_array.push('               <td><%= _.escape(library.get("synopsis")) %></td>');tmpl_array.push('               <td class="right-center">');tmpl_array.push('                   <button data-toggle="tooltip" data-placement="top" title="Modify library" class="primary-button btn-xs edit_library_btn" type="button"><span class="fa fa-pencil"></span></button>');tmpl_array.push('                   <button data-toggle="tooltip" data-placement="top" title="Save changes" class="primary-button btn-xs save_library_btn" type="button" style="display:none;"><span class="fa fa-floppy-o"> Save</span></button>');tmpl_array.push('                   <button data-toggle="tooltip" data-placement="top" title="Discard changes" class="primary-button btn-xs cancel_library_btn" type="button" style="display:none;"><span class="fa fa-times"> Cancel</span></button>');tmpl_array.push('                   <button data-toggle="tooltip" data-placement="top" title="Delete library (can be undeleted later)" class="primary-button btn-xs delete_library_btn" type="button" style="display:none;"><span class="fa fa-trash-o"> Delete</span></button>');tmpl_array.push('                   <button data-toggle="tooltip" data-placement="top" title="Undelete library" class="primary-button btn-xs undelete_library_btn" type="button" style="display:none;"><span class="fa fa-unlock"> Undelete</span></button>');tmpl_array.push("               </td>");tmpl_array.push("           </tr>");tmpl_array.push("       <% }); %>");tmpl_array.push("   </tbody>");tmpl_array.push("</table>");tmpl_array.push("<% }%>");tmpl_array.push("</div>");return _.template(tmpl_array.join(""))},templateNewLibraryInModal:function(){tmpl_array=[];tmpl_array.push('<div id="new_library_modal">');tmpl_array.push("   <form>");tmpl_array.push('       <input type="text" name="Name" value="" placeholder="Name">');tmpl_array.push('       <input type="text" name="Description" value="" placeholder="Description">');tmpl_array.push('       <input type="text" name="Synopsis" value="" placeholder="Synopsis">');tmpl_array.push("   </form>");tmpl_array.push("</div>");return tmpl_array.join("")},save_library_modification:function(u){var t=$(u.target).closest("tr");var r=this.collection.get(t.data("id"));var s=false;var w=t.find(".input_library_name").val();if(typeof w!=="undefined"&&w!==r.get("name")){if(w.length>2){r.set("name",w);s=true}else{n.warning("Library name has to be at least 3 characters long");return}}var v=t.find(".input_library_description").val();if(typeof v!=="undefined"&&v!==r.get("description")){r.set("description",v);s=true}var x=t.find(".input_library_synopsis").val();if(typeof x!=="undefined"&&x!==r.get("synopsis")){r.set("synopsis",x);s=true}if(s){r.save(null,{patch:true,success:function(y){n.success("Changes to library saved");galaxyLibraryview.toggle_library_modification(t)},error:function(z,y){n.error("An error occured during updating the library :(")}})}},edit_button_event:function(r){this.toggle_library_modification($(r.target).closest("tr"))},toggle_library_modification:function(u){var r=this.collection.get(u.data("id"));u.find(".edit_library_btn").toggle();u.find(".save_library_btn").toggle();u.find(".cancel_library_btn").toggle();if(r.get("deleted")){u.find(".undelete_library_btn").toggle()}else{u.find(".delete_library_btn").toggle()}if(u.find(".edit_library_btn").is(":hidden")){var s=r.get("name");var w='<input type="text" class="form-control input_library_name" placeholder="name">';u.children("td").eq(0).html(w);if(typeof s!==undefined){u.find(".input_library_name").val(s)}var t=r.get("description");var w='<input type="text" class="form-control input_library_description" placeholder="description">';u.children("td").eq(1).html(w);if(typeof t!==undefined){u.find(".input_library_description").val(t)}var v=r.get("synopsis");var w='<input type="text" class="form-control input_library_synopsis" placeholder="synopsis">';u.children("td").eq(2).html(w);if(typeof v!==undefined){u.find(".input_library_synopsis").val(v)}}else{u.children("td").eq(0).html(r.get("name"));u.children("td").eq(1).html(r.get("description"));u.children("td").eq(2).html(r.get("synopsis"))}},cancel_library_modification:function(t){var s=$(t.target).closest("tr");var r=this.collection.get(s.data("id"));this.toggle_library_modification(s);s.children("td").eq(0).html(r.get("name"));s.children("td").eq(1).html(r.get("description"));s.children("td").eq(2).html(r.get("synopsis"))},undelete_library:function(t){var s=$(t.target).closest("tr");var r=this.collection.get(s.data("id"));this.toggle_library_modification(s);r.url=r.urlRoot+r.id+"?undelete=true";r.destroy({success:function(u){u.set("deleted",false);galaxyLibraryview.collection.add(u);s.removeClass("active");n.success("Library has been undeleted")},error:function(){n.error("An error occured while undeleting the library :(")}})},delete_library:function(t){var s=$(t.target).closest("tr");var r=this.collection.get(s.data("id"));this.toggle_library_modification(s);r.destroy({success:function(u){s.remove();u.set("deleted",true);galaxyLibraryview.collection.add(u);n.success("Library has been marked deleted")},error:function(){n.error("An error occured during deleting the library :(")}})},redirectToHome:function(){window.location="../"},redirectToLogin:function(){window.location="/user/login"},show_library_modal:function(s){s.preventDefault();s.stopPropagation();var r=this;this.modal=Galaxy.modal;this.modal.show({closing_events:true,title:"Create New Library",body:this.templateNewLibraryInModal(),buttons:{Create:function(){r.create_new_library_event()},Close:function(){r.modal.hide()}}})},create_new_library_event:function(){var t=this.serialize_new_library();if(this.validate_new_library(t)){var s=new f();var r=this;s.save(t,{success:function(u){r.collection.add(u);r.modal.hide();r.clear_library_modal();r.render();n.success("Library created")},error:function(){n.error("An error occured :(")}})}else{n.error("Library's name is missing")}return false},clear_library_modal:function(){$("input[name='Name']").val("");$("input[name='Description']").val("");$("input[name='Synopsis']").val("")},serialize_new_library:function(){return{name:$("input[name='Name']").val(),description:$("input[name='Description']").val(),synopsis:$("input[name='Synopsis']").val()}},validate_new_library:function(r){return r.name!==""}});var h=Backbone.View.extend({el:"#center",events:{"click #create_new_library_btn":"delegate_modal","click #include_deleted_chk":"check_include_deleted"},initialize:function(){this.render()},delegate_modal:function(r){galaxyLibraryview.show_library_modal(r)},check_include_deleted:function(r){if(r.target.checked){galaxyLibraryview.render({with_deleted:true})}else{galaxyLibraryview.render({with_deleted:false})}},render:function(){var r=this.templateToolBar();this.$el.html(r())},templateToolBar:function(){tmpl_array=[];tmpl_array.push('<div id="libraries_container" style="width: 90%; margin: auto; margin-top:2em; overflow: auto !important; ">');tmpl_array.push('  <div id="toolbar_form" margin-top:0.5em; ">');tmpl_array.push('       <h3>Data Libraries Beta Test. This is work in progress. Please report problems & ideas via <a href="mailto:galaxy-bugs@bx.psu.edu?Subject=DataLibrariesBeta_Feedback" target="_blank">email</a> and <a href="https://trello.com/c/nwYQNFPK/56-data-library-ui-progressive-display-of-folders" target="_blank">Trello</a>.</h3>');tmpl_array.push('       <div id="library_toolbar">');tmpl_array.push('           <input id="include_deleted_chk" style="margin: 0;" type="checkbox">include deleted</input>');tmpl_array.push('           <button data-toggle="tooltip" data-placement="top" title="Create New Library" id="create_new_library_btn" class="primary-button" type="button"><span class="fa fa-plus"></span> New Library</button>');tmpl_array.push("       </div>");tmpl_array.push("  </div>");tmpl_array.push('  <div id="libraries_element">');tmpl_array.push("  </div>");tmpl_array.push("</div>");return _.template(tmpl_array.join(""))}});var q=Backbone.Router.extend({routes:{"":"libraries","sort/:sort_by/:order":"sort_libraries","folders/:id":"folder_content","folders/:folder_id/download/:format":"download"}});var g=Backbone.View.extend({initialize:function(){toolbarView=new h();galaxyLibraryview=new a();library_router=new q();folderContentView=new m();library_router.on("route:libraries",function(){toolbarView=new h();galaxyLibraryview=new a()});library_router.on("route:sort_libraries",function(s,r){galaxyLibraryview.sortLibraries(s,r);galaxyLibraryview.render()});library_router.on("route:folder_content",function(r){folderContentView.render({id:r})});library_router.on("route:download",function(r,s){if($("#center").find(":checked").length===0){library_router.navigate("folders/"+r,{trigger:true,replace:true})}else{folderContentView.download(r,s);library_router.navigate("folders/"+r,{trigger:false,replace:true})}});Backbone.history.start({pushState:false})}});return{GalaxyApp:g}});