define(["mvc/base-mvc","utils/localization"],function(a,c){var b=Backbone.View.extend(a.LoggableMixin).extend(a.HiddenUntilActivatedViewMixin).extend({tagName:"div",className:"annotation-display",initialize:function(d){d=d||{};this.tooltipConfig=d.tooltipConfig||{placement:"bottom"};this.listenTo(this.model,"change:annotation",function(){this.render()});this.hiddenUntilActivated(d.$activator,d)},render:function(){var d=this;this.$el.html(this._template());this.$el.find("[title]").tooltip(this.tooltipConfig);this.$annotation().make_text_editable({use_textarea:true,on_finish:function(e){d.$annotation().text(e);d.model.save({annotation:e},{silent:true}).fail(function(){d.$annotation().text(d.model.previous("annotation"))})}});return this},_template:function(){var d=this.model.get("annotation");return['<label class="prompt">',c("Annotation"),"</label>",'<div class="annotation" title="',c("Edit annotation"),'">',_.escape(d),"</div>"].join("")},$annotation:function(){return this.$el.find(".annotation")},remove:function(){this.$annotation.off();this.stopListening(this.model);Backbone.View.prototype.remove.call(this)},toString:function(){return["AnnotationEditor(",this.model+"",")"].join("")}});return{AnnotationEditor:b}});