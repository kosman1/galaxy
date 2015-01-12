define(["utils/utils","mvc/ui/ui-misc","mvc/tools/tools-form-base","mvc/tools/tools-jobs"],function(c,e,b,a){var d=b.extend({initialize:function(g){var f=this;this.job_handler=new a(this);this.buttons={execute:new e.Button({icon:"fa-check",tooltip:"Execute: "+g.name,title:"Execute",cls:"btn btn-primary",floating:"clear",onclick:function(){f.job_handler.submit()}})};b.prototype.initialize.call(this,g)},_buildModel:function(){var f=this;var g=galaxy_config.root+"api/tools/"+this.options.id+"/build?";if(this.options.job_id){g+="job_id="+this.options.job_id}else{if(this.options.dataset_id){g+="dataset_id="+this.options.dataset_id}else{g+="tool_version="+this.options.version+"&";var i=top.location.href;var j=i.indexOf("?");if(i.indexOf("tool_id=")!=-1&&j!==-1){g+=i.slice(j+1)}}}var h=this.deferred.register();c.request({type:"GET",url:g,success:function(k){f.options=k;f._buildForm();f.message.update({status:"success",message:"Now you are using '"+f.options.name+"' version "+f.options.version+".",persistent:false});f.deferred.done(h);console.debug("tools-form::initialize() - Initial tool model ready.");console.debug(k)},error:function(k){f.deferred.done(h);console.debug("tools-form::initialize() - Initial tool model request failed.");console.debug(k);var l=k.error||"Uncaught error.";f.modal.show({title:"Tool cannot be executed",body:l,buttons:{Close:function(){f.modal.hide()}}})}})},_updateModel:function(){var f=this;var g=this.tree.finalize({data:function(k){if(k.values.length>0&&k.values[0]&&k.values[0].src==="hda"){return f.content.get({id:k.values[0].id,src:"hda"}).id_uncoded}return null}});console.debug("tools-form::_refreshForm() - Refreshing states.");console.debug(g);function j(n){for(var l in f.input_list){var m=f.field_list[l];var k=f.input_list[l];if(k.is_dynamic&&m.wait&&m.unwait){if(n){m.wait()}else{m.unwait()}}}}j(true);var i=this.deferred.register();var h=galaxy_config.root+"api/tools/"+this.options.id+"/build?tool_version="+this.options.version;c.request({type:"GET",url:h,data:g,success:function(k){f.tree.matchModel(k,function(m,q){var l=f.input_list[m];if(l&&l.options){if(!_.isEqual(l.options,q.options)){l.options=q.options;var r=f.field_list[m];if(r.update){var p=[];if((["data","data_collection","drill_down"]).indexOf(l.type)!=-1){p=l.options}else{for(var o in q.options){var n=q.options[o];if(n.length>2){p.push({label:n[0],value:n[1]})}}}r.update(p);r.trigger("change");console.debug("Updating options for "+m)}}}});j(false);f.deferred.done(i);console.debug("tools-form::_refreshForm() - States refreshed.");console.debug(k)},error:function(k){f.deferred.done(i);console.debug("tools-form::_refreshForm() - Refresh request failed.");console.debug(k)}})}});return{View:d}});