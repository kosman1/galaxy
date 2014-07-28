define(["mvc/base-mvc","mvc/citation/citation-model","utils/localization"],function(a,d,c){var b=Backbone.View.extend({tagName:"div",className:"citations",render:function(){this.$el.append("<p>"+this.formattedReference()+"</p>");return this},formattedReference:function(){var j=this.model;var i=j.entryType();var k=j.fields();var g="";var n=this._asSentence((k.author?k.author:"")+(k.year?(" ("+k.year+")"):""))+" ";var m=k.title||"";var h=k.pages?("pp. "+k.pages):"";var o=k.address;if(i=="article"){g=n+this._asSentence(m)+(k.journal?("In <em>"+k.journal+", "):"")+(k.volume?k.volume:"")+(k.number?("("+k.number+"), "):", ")+this._asSentence(h)+this._asSentence(k.address)+"</em>"}else{if(i=="inproceedings"||i=="proceedings"){g=n+this._asSentence(m)+(k.booktitle?("In <em>"+k.booktitle+", "):"")+(h?h:"")+(o?", "+o:"")+".</em>"}else{if(i=="mastersthesis"||i=="phdthesis"){g=n+this._asSentence(m)+(k.howpublished?k.howpublished+". ":"")+(k.note?k.note+".":"")}else{if(i=="techreport"){g=n+". "+this._asSentence(m)+this._asSentence(k.institution)+this._asSentence(k.number)+this._asSentence(k.type)}else{if(i=="book"||i=="inbook"||i=="incollection"){g=this._asSentence(n)+" "+this._formatBookInfo(k)}else{g=this._asSentence(n)+" "+this._asSentence(m)+this._asSentence(k.howpublished)+this._asSentence(k.note)}}}}}var l="";if(k.DOI){l="http://dx.doi.org/"+k.DOI;g+='[<a href="'+l+'">doi:'+k.DOI+"</a>]"}var f=k.url||l;if(f){g+='[<a href="'+f+'">Link</a>]'}return g},_formatBookInfo:function(f){var g="";if(f.chapter){g+=f.chapter+" in "}if(f.title){g+="<em>"+f.title+"</em>"}if(f.editor){g+=", Edited by "+f.editor+", "}if(f.publisher){g+=", "+f.publisher}if(f.pages){g+=", pp. "+f.pages+""}if(f.series){g+=", <em>"+f.series+"</em>"}if(f.volume){g+=", Vol."+f.volume}if(f.issn){g+=", ISBN: "+f.issn}return g+"."},_asSentence:function(f){return f?f+". ":""}});var e=Backbone.View.extend({el:"#citations",initialize:function(){this.listenTo(this.collection,"add",this.renderCitation)},events:{"click .citations-to-bibtex":"showBibtex","click .citations-to-formatted":"showFormatted"},renderCitation:function(g){var f=new b({model:g});this.$(".citations-formatted").append(f.render().el);var h=this.$(".citations-bibtex-text");h.val(h.val()+"\n\r"+g.attributes.content)},render:function(){this.$el.html(this.citationsElement);this.collection.each(function(f){this.renderCitation(f)},this);this.showFormatted()},showBibtex:function(){this.$(".citations-to-formatted").show();this.$(".citations-to-bibtex").hide();this.$(".citations-bibtex").show();this.$(".citations-formatted").hide();this.$(".citations-bibtex-text").select()},showFormatted:function(){this.$(".citations-to-formatted").hide();this.$(".citations-to-bibtex").show();this.$(".citations-bibtex").hide();this.$(".citations-formatted").show()},citationsElement:['<div class="toolForm">','<div class="toolFormTitle">',c("Citations"),' <i class="fa fa-pencil-square-o citations-to-bibtex" title="Select all as BibTeX."></i>',' <i class="fa fa-times citations-to-formatted" title="Return to formatted citation list."></i>',"</div>",'<div class="toolFormBody" style="padding:5px 10px">','<div style="padding:5px 10px">',"<b>Warning: This is a experimental feature.</b> Most Galaxy tools will not annotate"," citations explicitly at this time. When writing up your analysis, please manually"," review your histories and find all references"," that should be cited in order to completely describe your work. Also, please remember to",' <a href="https://wiki.galaxyproject.org/CitingGalaxy">cite Galaxy</a>.',"</div>",'<span class="citations-formatted"></span>',"</div>",'<div class="citations-bibtex toolFormBody" style="padding:5px 10px">','<textarea style="width: 100%; height: 500px;" class="citations-bibtex-text"></textarea>',"</div>","</div>"].join("")});return{CitationView:b,CitationListView:e}});