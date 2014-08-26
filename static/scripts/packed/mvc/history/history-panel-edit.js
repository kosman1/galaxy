define(["mvc/history/history-panel","mvc/history/history-contents","mvc/dataset/states","mvc/history/hda-model","mvc/history/hda-li-edit","mvc/history/hdca-li-edit","mvc/tags","mvc/annotations","utils/localization"],function(f,h,k,d,c,g,j,a,b){var i=f.ReadOnlyHistoryPanel;var e=i.extend({HDAViewClass:c.HDAListItemEdit,HDCAViewClass:g.HDCAListItemEdit,initialize:function(l){l=l||{};this.selectedHdaIds=[];this.lastSelectedViewId=null;this.tagsEditor=null;this.annotationEditor=null;this.purgeAllowed=l.purgeAllowed||false;this.selecting=l.selecting||false;this.annotationEditorShown=l.annotationEditorShown||false;this.tagsEditorShown=l.tagsEditorShown||false;i.prototype.initialize.call(this,l)},_setUpModelEventHandlers:function(){i.prototype._setUpModelEventHandlers.call(this);this.model.on("change:nice_size",this.updateHistoryDiskSize,this);this.model.contents.on("change:deleted",this._handleHdaDeletionChange,this);this.model.contents.on("change:visible",this._handleHdaVisibleChange,this);this.model.contents.on("change:purged",function(l){this.model.fetch()},this)},renderModel:function(){var l=$("<div/>");l.append(e.templates.historyPanel(this.model.toJSON()));this.$emptyMessage(l).text(this.emptyMsg);if(Galaxy&&Galaxy.currUser&&Galaxy.currUser.id&&Galaxy.currUser.id===this.model.get("user_id")){this._renderTags(l);this._renderAnnotation(l)}l.find(".history-secondary-actions").prepend(this._renderSelectButton());l.find(".history-dataset-actions").toggle(this.selecting);l.find(".history-secondary-actions").prepend(this._renderSearchButton());this._setUpBehaviours(l);this.renderHdas(l);return l},_renderTags:function(l){var m=this;this.tagsEditor=new j.TagsEditor({model:this.model,el:l.find(".history-controls .tags-display"),onshowFirstTime:function(){this.render()},onshow:function(){m.toggleHDATagEditors(true,m.fxSpeed)},onhide:function(){m.toggleHDATagEditors(false,m.fxSpeed)},$activator:faIconButton({title:b("Edit history tags"),classes:"history-tag-btn",faIcon:"fa-tags"}).appendTo(l.find(".history-secondary-actions"))})},_renderAnnotation:function(l){var m=this;this.annotationEditor=new a.AnnotationEditor({model:this.model,el:l.find(".history-controls .annotation-display"),onshowFirstTime:function(){this.render()},onshow:function(){m.toggleHDAAnnotationEditors(true,m.fxSpeed)},onhide:function(){m.toggleHDAAnnotationEditors(false,m.fxSpeed)},$activator:faIconButton({title:b("Edit history annotation"),classes:"history-annotate-btn",faIcon:"fa-comment"}).appendTo(l.find(".history-secondary-actions"))})},_renderSelectButton:function(l){return faIconButton({title:b("Operations on multiple datasets"),classes:"history-select-btn",faIcon:"fa-check-square-o"})},_setUpBehaviours:function(l){l=l||this.$el;i.prototype._setUpBehaviours.call(this,l);if(!this.model){return}this.actionsPopup=this._setUpDatasetActionsPopup(l);if((!Galaxy.currUser||Galaxy.currUser.isAnonymous())||(Galaxy.currUser.id!==this.model.get("user_id"))){return}var m=this;l.find(".history-name").attr("title",b("Click to rename history")).tooltip({placement:"bottom"}).make_text_editable({on_finish:function(n){var o=m.model.get("name");if(n&&n!==o){m.$el.find(".history-name").text(n);m.model.save({name:n}).fail(function(){m.$el.find(".history-name").text(m.model.previous("name"))})}else{m.$el.find(".history-name").text(o)}}})},_setUpDatasetActionsPopup:function(l){var m=this,n=[{html:b("Hide datasets"),func:function(){var o=d.HistoryDatasetAssociation.prototype.hide;m.getSelectedHdaCollection().ajaxQueue(o)}},{html:b("Unhide datasets"),func:function(){var o=d.HistoryDatasetAssociation.prototype.unhide;m.getSelectedHdaCollection().ajaxQueue(o)}},{html:b("Delete datasets"),func:function(){var o=d.HistoryDatasetAssociation.prototype["delete"];m.getSelectedHdaCollection().ajaxQueue(o)}},{html:b("Undelete datasets"),func:function(){var o=d.HistoryDatasetAssociation.prototype.undelete;m.getSelectedHdaCollection().ajaxQueue(o)}}];if(m.purgeAllowed){n.push({html:b("Permanently delete datasets"),func:function(){if(confirm(b("This will permanently remove the data in your datasets. Are you sure?"))){var o=d.HistoryDatasetAssociation.prototype.purge;m.getSelectedHdaCollection().ajaxQueue(o)}}})}n.push({html:b("Build Dataset List (Experimental)"),func:function(){m.getSelectedHdaCollection().promoteToHistoryDatasetCollection(m.model,"list")}});n.push({html:b("Build Dataset Pair (Experimental)"),func:function(){m.getSelectedHdaCollection().promoteToHistoryDatasetCollection(m.model,"paired")}});n.push({html:b("Build List of Dataset Pairs (Experimental)"),func:_.bind(m._showPairedCollectionModal,m)});return new PopupMenu(l.find(".history-dataset-action-popup-btn"),n)},_showPairedCollectionModal:function(){var l=this,m=l.getSelectedHdaCollection().toJSON().filter(function(n){return n.history_content_type==="dataset"&&n.state===k.OK});if(m.length){require(["mvc/collection/paired-collection-creator"],function(n){window.creator=n.pairedCollectionCreatorModal(m,{historyId:l.model.id})})}else{}},_handleHdaDeletionChange:function(l){if(l.get("deleted")&&!this.storage.get("show_deleted")){this.removeHdaView(this.hdaViews[l.id])}},_handleHdaVisibleChange:function(l){if(l.hidden()&&!this.storage.get("show_hidden")){this.removeHdaView(this.hdaViews[l.id])}},_getContentOptions:function(m){var l=i.prototype._getContentOptions.call(this,m);_.extend(l,{selectable:this.selecting,purgeAllowed:this.purgeAllowed,tagsEditorShown:(this.tagsEditor&&!this.tagsEditor.hidden),annotationEditorShown:(this.annotationEditor&&!this.annotationEditor.hidden)});return l},_setUpHdaListeners:function(m){var l=this;i.prototype._setUpHdaListeners.call(this,m);m.on("selected",function(p,o){if(!o){return}var n=[];if((o.shiftKey)&&(l.lastSelectedViewId&&_.has(l.hdaViews,l.lastSelectedViewId))){var r=l.hdaViews[l.lastSelectedViewId];n=l.selectDatasetRange(p,r).map(function(s){return s.model.id})}else{var q=p.model.id;l.lastSelectedViewId=q;n=[q]}l.selectedHdaIds=_.union(l.selectedHdaIds,n)});m.on("de-selected",function(o,n){var p=o.model.id;l.selectedHdaIds=_.without(l.selectedHdaIds,p)})},toggleHDATagEditors:function(l){var m=arguments;_.each(this.hdaViews,function(n){if(n.tagsEditor){n.tagsEditor.toggle.apply(n.tagsEditor,m)}})},toggleHDAAnnotationEditors:function(l){var m=arguments;_.each(this.hdaViews,function(n){if(n.annotationEditor){n.annotationEditor.toggle.apply(n.annotationEditor,m)}})},removeHdaView:function(m){if(!m){return}var l=this;m.$el.fadeOut(l.fxSpeed,function(){m.off();m.remove();delete l.hdaViews[m.model.id];if(_.isEmpty(l.hdaViews)){l.trigger("empty-history",l);l._renderEmptyMsg()}})},events:_.extend(_.clone(i.prototype.events),{"click .history-select-btn":"toggleSelectors","click .history-select-all-datasets-btn":"selectAllDatasets","click .history-deselect-all-datasets-btn":"deselectAllDatasets"}),updateHistoryDiskSize:function(){this.$el.find(".history-size").text(this.model.get("nice_size"))},showSelectors:function(l){l=(l!==undefined)?(l):(this.fxSpeed);this.selecting=true;this.$(".history-dataset-actions").slideDown(l);_.each(this.hdaViews,function(m){m.showSelector()});this.selectedHdaIds=[];this.lastSelectedViewId=null},hideSelectors:function(l){l=(l!==undefined)?(l):(this.fxSpeed);this.selecting=false;this.$(".history-dataset-actions").slideUp(l);_.each(this.hdaViews,function(m){m.hideSelector()});this.selectedHdaIds=[];this.lastSelectedViewId=null},toggleSelectors:function(){if(!this.selecting){this.showSelectors()}else{this.hideSelectors()}},selectAllDatasets:function(l){_.each(this.hdaViews,function(m){m.select(l)})},deselectAllDatasets:function(l){this.lastSelectedViewId=null;_.each(this.hdaViews,function(m){m.deselect(l)})},selectDatasetRange:function(n,m){var l=this.hdaViewRange(n,m);_.each(l,function(o){o.select()});return l},getSelectedHdaViews:function(){return _.filter(this.hdaViews,function(l){return l.selected})},getSelectedHdaCollection:function(){return new h.HistoryContents(_.map(this.getSelectedHdaViews(),function(l){return l.model}),{historyId:this.model.id})},toString:function(){return"HistoryPanel("+((this.model)?(this.model.get("name")):(""))+")"}});return{HistoryPanel:e}});