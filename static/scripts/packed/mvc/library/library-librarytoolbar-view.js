define(["galaxy.masthead","utils/utils","libs/toastr","mvc/library/library-model"],function(a,c,d,b){var e=Backbone.View.extend({el:"#center",events:{"click #create_new_library_btn":"delegate_modal","click #include_deleted_chk":"check_include_deleted"},initialize:function(){this.render()},render:function(){var h=this.templateToolBar();var g=false;var f=false;if(Galaxy.currUser){g=Galaxy.currUser.isAdmin();f=Galaxy.currUser.isAnonymous()}else{f=true}this.$el.html(h({admin_user:g,anon_user:f}));if(g){this.$el.find("#include_deleted_chk")[0].checked=Galaxy.libraries.preferences.get("with_deleted")}},delegate_modal:function(f){Galaxy.libraries.libraryListView.show_library_modal(f)},check_include_deleted:function(f){if(f.target.checked){Galaxy.libraries.preferences.set({with_deleted:true});Galaxy.libraries.libraryListView.render()}else{Galaxy.libraries.preferences.set({with_deleted:false});Galaxy.libraries.libraryListView.render()}},templateToolBar:function(){tmpl_array=[];tmpl_array.push('<div class="library_style_container">');tmpl_array.push('  <div id="toolbar_form" margin-top:0.5em; ">');tmpl_array.push('       <h3>Data Libraries Beta Test. This is work in progress. Please report problems & ideas via <a href="mailto:galaxy-bugs@bx.psu.edu?Subject=DataLibrariesBeta_Feedback" target="_blank">email</a> and <a href="https://trello.com/c/nwYQNFPK/56-data-library-ui-progressive-display-of-folders" target="_blank">Trello</a>.</h3>');tmpl_array.push("   <% if(admin_user === true) { %>");tmpl_array.push('       <div id="library_toolbar">');tmpl_array.push('           <span data-toggle="tooltip" data-placement="top" title="Include deleted libraries"><input id="include_deleted_chk" style="margin: 0;" type="checkbox"> <span class="fa fa-trash-o fa-lg"></span></input></span>');tmpl_array.push('           <span data-toggle="tooltip" data-placement="top" title="Create New Library"><button id="create_new_library_btn" class="primary-button btn-xs" type="button"><span class="fa fa-plus"></span> New Library</button><span>');tmpl_array.push("       </div>");tmpl_array.push("   <% } %>");tmpl_array.push("  </div>");tmpl_array.push('  <div id="libraries_element">');tmpl_array.push("  </div>");tmpl_array.push("</div>");return _.template(tmpl_array.join(""))}});return{LibraryToolbarView:e}});