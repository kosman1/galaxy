(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-hda-body"]=b(function(h,u,s,n,B){this.compilerInfo=[4,">= 1.0.0"];s=this.merge(s,h.helpers);B=B||{};var t="",j,e="function",d=this.escapeExpression,r=this,c=s.blockHelperMissing;function q(F,E){var C="",D;C+='\n    <div class="dataset-summary">\n        ';if(D=s.body){D=D.call(F,{hash:{},data:E})}else{D=F.body;D=typeof D===e?D.apply(F):D}if(D||D===0){C+=D}C+='\n    </div>\n    <div class="dataset-actions clear">\n        <div class="left"></div>\n        <div class="right"></div>\n    </div>\n\n    ';return C}function p(F,E){var C="",D;C+='\n    <div class="dataset-summary">\n        ';D=s["if"].call(F,F.misc_blurb,{hash:{},inverse:r.noop,fn:r.program(4,o,E),data:E});if(D||D===0){C+=D}C+="\n\n        ";D=s["if"].call(F,F.data_type,{hash:{},inverse:r.noop,fn:r.program(6,m,E),data:E});if(D||D===0){C+=D}C+="\n\n        ";D=s["if"].call(F,F.metadata_dbkey,{hash:{},inverse:r.noop,fn:r.program(9,g,E),data:E});if(D||D===0){C+=D}C+="\n\n        ";D=s["if"].call(F,F.misc_info,{hash:{},inverse:r.noop,fn:r.program(12,z,E),data:E});if(D||D===0){C+=D}C+='\n    </div>\n\n    <div class="dataset-actions clear">\n        <div class="left"></div>\n        <div class="right"></div>\n    </div>\n\n    ';D=s.unless.call(F,F.deleted,{hash:{},inverse:r.noop,fn:r.program(14,y,E),data:E});if(D||D===0){C+=D}C+="\n\n    ";return C}function o(F,E){var C="",D;C+='\n        <div class="dataset-blurb">\n            <span class="value">';if(D=s.misc_blurb){D=D.call(F,{hash:{},data:E})}else{D=F.misc_blurb;D=typeof D===e?D.apply(F):D}C+=d(D)+"</span>\n        </div>\n        ";return C}function m(G,F){var C="",E,D;C+='\n        <div class="dataset-datatype">\n            <label class="prompt">';D={hash:{},inverse:r.noop,fn:r.program(7,l,F),data:F};if(E=s.local){E=E.call(G,D)}else{E=G.local;E=typeof E===e?E.apply(G):E}if(!s.local){E=c.call(G,E,D)}if(E||E===0){C+=E}C+='</label>\n            <span class="value">';if(E=s.data_type){E=E.call(G,{hash:{},data:F})}else{E=G.data_type;E=typeof E===e?E.apply(G):E}C+=d(E)+"</span>\n        </div>\n        ";return C}function l(D,C){return"format"}function g(G,F){var C="",E,D;C+='\n        <div class="dataset-dbkey">\n            <label class="prompt">';D={hash:{},inverse:r.noop,fn:r.program(10,A,F),data:F};if(E=s.local){E=E.call(G,D)}else{E=G.local;E=typeof E===e?E.apply(G):E}if(!s.local){E=c.call(G,E,D)}if(E||E===0){C+=E}C+='</label>\n            <span class="value">\n                ';if(E=s.metadata_dbkey){E=E.call(G,{hash:{},data:F})}else{E=G.metadata_dbkey;E=typeof E===e?E.apply(G):E}C+=d(E)+"\n            </span>\n        </div>\n        ";return C}function A(D,C){return"database"}function z(F,E){var C="",D;C+='\n        <div class="dataset-info">\n            <span class="value">';if(D=s.misc_info){D=D.call(F,{hash:{},data:E})}else{D=F.misc_info;D=typeof D===e?D.apply(F):D}C+=d(D)+"</span>\n        </div>\n        ";return C}function y(G,F){var C="",E,D;C+='\n    \n    <div class="tags-display"></div>\n\n    \n    <div class="annotation-display">\n        <label class="prompt">';D={hash:{},inverse:r.noop,fn:r.program(15,x,F),data:F};if(E=s.local){E=E.call(G,D)}else{E=G.local;E=typeof E===e?E.apply(G):E}if(!s.local){E=c.call(G,E,D)}if(E||E===0){C+=E}C+='</label>\n        <div id="dataset-';if(E=s.id){E=E.call(G,{hash:{},data:F})}else{E=G.id;E=typeof E===e?E.apply(G):E}C+=d(E)+'-annotation" class="annotation editable-text"\n             title="';D={hash:{},inverse:r.noop,fn:r.program(17,w,F),data:F};if(E=s.local){E=E.call(G,D)}else{E=G.local;E=typeof E===e?E.apply(G):E}if(!s.local){E=c.call(G,E,D)}if(E||E===0){C+=E}C+='"></div>\n    </div>\n\n    <div class="dataset-display-applications">\n        ';E=s.each.call(G,G.display_apps,{hash:{},inverse:r.noop,fn:r.program(19,v,F),data:F});if(E||E===0){C+=E}C+="\n\n        ";E=s.each.call(G,G.display_types,{hash:{},inverse:r.noop,fn:r.program(19,v,F),data:F});if(E||E===0){C+=E}C+='\n    </div>\n\n    <div class="dataset-peek">\n    ';E=s["if"].call(G,G.peek,{hash:{},inverse:r.noop,fn:r.program(23,f,F),data:F});if(E||E===0){C+=E}C+="\n    </div>\n\n    ";return C}function x(D,C){return"Annotation"}function w(D,C){return"Edit dataset annotation"}function v(F,E){var C="",D;C+='\n        <div class="display-application">\n            <span class="display-application-location">';if(D=s.label){D=D.call(F,{hash:{},data:E})}else{D=F.label;D=typeof D===e?D.apply(F):D}C+=d(D)+'</span>\n            <span class="display-application-links">\n                ';D=s.each.call(F,F.links,{hash:{},inverse:r.noop,fn:r.program(20,k,E),data:E});if(D||D===0){C+=D}C+="\n            </span>\n        </div>\n        ";return C}function k(G,F){var C="",E,D;C+='\n                <a target="';if(E=s.target){E=E.call(G,{hash:{},data:F})}else{E=G.target;E=typeof E===e?E.apply(G):E}C+=d(E)+'" href="';if(E=s.href){E=E.call(G,{hash:{},data:F})}else{E=G.href;E=typeof E===e?E.apply(G):E}C+=d(E)+'">';D={hash:{},inverse:r.noop,fn:r.program(21,i,F),data:F};if(E=s.local){E=E.call(G,D)}else{E=G.local;E=typeof E===e?E.apply(G):E}if(!s.local){E=c.call(G,E,D)}if(E||E===0){C+=E}C+="</a>\n                ";return C}function i(E,D){var C;if(C=s.text){C=C.call(E,{hash:{},data:D})}else{C=E.text;C=typeof C===e?C.apply(E):C}return d(C)}function f(F,E){var C="",D;C+='\n        <pre class="peek">';if(D=s.peek){D=D.call(F,{hash:{},data:E})}else{D=F.peek;D=typeof D===e?D.apply(F):D}if(D||D===0){C+=D}C+="</pre>\n    ";return C}t+='<div class="dataset-body">\n    ';j=s["if"].call(u,u.body,{hash:{},inverse:r.program(3,p,B),fn:r.program(1,q,B),data:B});if(j||j===0){t+=j}t+="\n</div>";return t})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-hda-body"]=b(function(j,v,t,o,C){this.compilerInfo=[4,">= 1.0.0"];t=this.merge(t,j.helpers);C=C||{};var u="",l,e="function",d=this.escapeExpression,s=this,c=t.blockHelperMissing;function r(G,F){var D="",E;D+='\n    <div class="dataset-summary">\n        ';if(E=t.body){E=E.call(G,{hash:{},data:F})}else{E=G.body;E=typeof E===e?E.apply(G):E}if(E||E===0){D+=E}D+='\n    </div>\n    <div class="dataset-actions clear">\n        <div class="left"></div>\n        <div class="right"></div>\n    </div>\n\n    ';return D}function q(G,F){var D="",E;D+='\n    <div class="dataset-summary">\n        ';E=t["if"].call(G,G.misc_blurb,{hash:{},inverse:s.noop,fn:s.program(4,p,F),data:F});if(E||E===0){D+=E}D+="\n\n        ";E=t["if"].call(G,G.data_type,{hash:{},inverse:s.noop,fn:s.program(6,n,F),data:F});if(E||E===0){D+=E}D+="\n\n        ";E=t["if"].call(G,G.metadata_dbkey,{hash:{},inverse:s.noop,fn:s.program(9,i,F),data:F});if(E||E===0){D+=E}D+="\n\n        ";E=t["if"].call(G,G.misc_info,{hash:{},inverse:s.noop,fn:s.program(12,A,F),data:F});if(E||E===0){D+=E}D+='\n    </div>\n\n    <div class="dataset-actions clear">\n        <div class="left"></div>\n        <div class="right"></div>\n    </div>\n\n    ';E=t.unless.call(G,G.deleted,{hash:{},inverse:s.noop,fn:s.program(14,z,F),data:F});if(E||E===0){D+=E}D+="\n\n    ";return D}function p(G,F){var D="",E;D+='\n        <div class="dataset-blurb">\n            <span class="value">';if(E=t.misc_blurb){E=E.call(G,{hash:{},data:F})}else{E=G.misc_blurb;E=typeof E===e?E.apply(G):E}D+=d(E)+"</span>\n        </div>\n        ";return D}function n(H,G){var D="",F,E;D+='\n        <div class="dataset-datatype">\n            <label class="prompt">';E={hash:{},inverse:s.noop,fn:s.program(7,m,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='</label>\n            <span class="value">';if(F=t.data_type){F=F.call(H,{hash:{},data:G})}else{F=H.data_type;F=typeof F===e?F.apply(H):F}D+=d(F)+"</span>\n        </div>\n        ";return D}function m(E,D){return"format"}function i(H,G){var D="",F,E;D+='\n        <div class="dataset-dbkey">\n            <label class="prompt">';E={hash:{},inverse:s.noop,fn:s.program(10,B,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='</label>\n            <span class="value">\n                ';if(F=t.metadata_dbkey){F=F.call(H,{hash:{},data:G})}else{F=H.metadata_dbkey;F=typeof F===e?F.apply(H):F}D+=d(F)+"\n            </span>\n        </div>\n        ";return D}function B(E,D){return"database"}function A(G,F){var D="",E;D+='\n        <div class="dataset-info">\n            <span class="value">';if(E=t.misc_info){E=E.call(G,{hash:{},data:F})}else{E=G.misc_info;E=typeof E===e?E.apply(G):E}D+=d(E)+"</span>\n        </div>\n        ";return D}function z(H,G){var D="",F,E;D+='\n    \n    <div class="tags-display">\n        <label class="prompt">';E={hash:{},inverse:s.noop,fn:s.program(15,y,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='</label>\n        <div class="tags"></div>\n    </div>\n\n    \n    <div class="annotation-display">\n        <label class="prompt">';E={hash:{},inverse:s.noop,fn:s.program(17,x,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='</label>\n        <div id="dataset-';if(F=t.id){F=F.call(H,{hash:{},data:G})}else{F=H.id;F=typeof F===e?F.apply(H):F}D+=d(F)+'-annotation" class="annotation editable-text"\n             title="';E={hash:{},inverse:s.noop,fn:s.program(19,w,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='"></div>\n    </div>\n\n    <div class="dataset-display-applications">\n        ';F=t.each.call(H,H.display_apps,{hash:{},inverse:s.noop,fn:s.program(21,k,G),data:G});if(F||F===0){D+=F}D+="\n\n        ";F=t.each.call(H,H.display_types,{hash:{},inverse:s.noop,fn:s.program(21,k,G),data:G});if(F||F===0){D+=F}D+='\n    </div>\n\n    <div class="dataset-peek">\n    ';F=t["if"].call(H,H.peek,{hash:{},inverse:s.noop,fn:s.program(25,f,G),data:G});if(F||F===0){D+=F}D+="\n    </div>\n\n    ";return D}function y(E,D){return"Tags"}function x(E,D){return"Annotation"}function w(E,D){return"Edit dataset annotation"}function k(G,F){var D="",E;D+='\n        <div class="display-application">\n            <span class="display-application-location">';if(E=t.label){E=E.call(G,{hash:{},data:F})}else{E=G.label;E=typeof E===e?E.apply(G):E}D+=d(E)+'</span>\n            <span class="display-application-links">\n                ';E=t.each.call(G,G.links,{hash:{},inverse:s.noop,fn:s.program(22,h,F),data:F});if(E||E===0){D+=E}D+="\n            </span>\n        </div>\n        ";return D}function h(H,G){var D="",F,E;D+='\n                <a target="';if(F=t.target){F=F.call(H,{hash:{},data:G})}else{F=H.target;F=typeof F===e?F.apply(H):F}D+=d(F)+'" href="';if(F=t.href){F=F.call(H,{hash:{},data:G})}else{F=H.href;F=typeof F===e?F.apply(H):F}D+=d(F)+'">';E={hash:{},inverse:s.noop,fn:s.program(23,g,G),data:G};if(F=t.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!t.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+="</a>\n                ";return D}function g(F,E){var D;if(D=t.text){D=D.call(F,{hash:{},data:E})}else{D=F.text;D=typeof D===e?D.apply(F):D}return d(D)}function f(G,F){var D="",E;D+='\n        <pre class="peek">';if(E=t.peek){E=E.call(G,{hash:{},data:F})}else{E=G.peek;E=typeof E===e?E.apply(G):E}if(E||E===0){D+=E}D+="</pre>\n    ";return D}u+='<div class="dataset-body">\n    ';l=t["if"].call(v,v.body,{hash:{},inverse:s.program(3,q,C),fn:s.program(1,r,C),data:C});if(l||l===0){u+=l}u+="\n</div>";return u})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-hda-skeleton"]=b(function(f,r,p,k,w){this.compilerInfo=[4,">= 1.0.0"];p=this.merge(p,f.helpers);w=w||{};var q="",h,e="function",d=this.escapeExpression,o=this,c=p.blockHelperMissing;function n(B,A){var x="",z,y;x+='\n        <div class="errormessagesmall">\n            ';y={hash:{},inverse:o.noop,fn:o.program(2,m,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+=":\n            ";y={hash:{},inverse:o.noop,fn:o.program(4,l,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+="\n        </div>\n        ";return x}function m(y,x){return"There was an error getting the data for this dataset"}function l(z,y){var x;if(x=p.error){x=x.call(z,{hash:{},data:y})}else{x=z.error;x=typeof x===e?x.apply(z):x}return d(x)}function j(A,z){var x="",y;x+="\n            ";y=p["if"].call(A,A.purged,{hash:{},inverse:o.program(10,v,z),fn:o.program(7,i,z),data:z});if(y||y===0){x+=y}x+="\n        ";return x}function i(B,A){var x="",z,y;x+='\n            <div class="warningmessagesmall"><strong>\n                ';y={hash:{},inverse:o.noop,fn:o.program(8,g,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+="\n            </strong></div>\n\n            ";return x}function g(y,x){return"This dataset has been deleted and removed from disk."}function v(B,A){var x="",z,y;x+='\n            <div class="warningmessagesmall"><strong>\n                ';y={hash:{},inverse:o.noop,fn:o.program(11,u,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+='\n                \n                \n                Click <a href="javascript:void(0);" class="dataset-undelete">here</a> to undelete it\n                or <a href="javascript:void(0);" class="dataset-purge">here</a> to immediately remove it from disk\n            </strong></div>\n            ';return x}function u(y,x){return"This dataset has been deleted."}function t(B,A){var x="",z,y;x+='\n        <div class="warningmessagesmall"><strong>\n            ';y={hash:{},inverse:o.noop,fn:o.program(14,s,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+='\n            \n            Click <a href="javascript:void(0);" class="dataset-unhide">here</a> to unhide it\n        </strong></div>\n        ';return x}function s(y,x){return"This dataset has been hidden."}q+='<div class="dataset hda">\n    <div class="dataset-warnings">\n        ';h=p["if"].call(r,r.error,{hash:{},inverse:o.noop,fn:o.program(1,n,w),data:w});if(h||h===0){q+=h}q+="\n\n        ";h=p["if"].call(r,r.deleted,{hash:{},inverse:o.noop,fn:o.program(6,j,w),data:w});if(h||h===0){q+=h}q+="\n\n        ";h=p.unless.call(r,r.visible,{hash:{},inverse:o.noop,fn:o.program(13,t,w),data:w});if(h||h===0){q+=h}q+='\n    </div>\n\n    <div class="dataset-primary-actions"></div>\n    <div class="dataset-title-bar clear">\n        <span class="dataset-state-icon state-icon"></span>\n        <div class="dataset-title">\n            <span class="hda-hid">';if(h=p.hid){h=h.call(r,{hash:{},data:w})}else{h=r.hid;h=typeof h===e?h.apply(r):h}q+=d(h)+'</span>\n            <span class="dataset-name">';if(h=p.name){h=h.call(r,{hash:{},data:w})}else{h=r.name;h=typeof h===e?h.apply(r):h}q+=d(h)+'</span>\n        </div>\n    </div>\n\n    <div class="dataset-body"></div>\n</div>';return q})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-hda-skeleton"]=b(function(f,r,p,k,w){this.compilerInfo=[4,">= 1.0.0"];p=this.merge(p,f.helpers);w=w||{};var q="",h,e="function",d=this.escapeExpression,o=this,c=p.blockHelperMissing;function n(B,A){var x="",z,y;x+='\n        <div class="errormessagesmall">\n            ';y={hash:{},inverse:o.noop,fn:o.program(2,m,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+=":\n            ";y={hash:{},inverse:o.noop,fn:o.program(4,l,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+="\n        </div>\n        ";return x}function m(y,x){return"There was an error getting the data for this dataset"}function l(z,y){var x;if(x=p.error){x=x.call(z,{hash:{},data:y})}else{x=z.error;x=typeof x===e?x.apply(z):x}return d(x)}function j(A,z){var x="",y;x+="\n            ";y=p["if"].call(A,A.purged,{hash:{},inverse:o.program(10,v,z),fn:o.program(7,i,z),data:z});if(y||y===0){x+=y}x+="\n        ";return x}function i(B,A){var x="",z,y;x+='\n            <div class="warningmessagesmall"><strong>\n                ';y={hash:{},inverse:o.noop,fn:o.program(8,g,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+="\n            </strong></div>\n\n            ";return x}function g(y,x){return"This dataset has been deleted and removed from disk."}function v(B,A){var x="",z,y;x+='\n            <div class="warningmessagesmall"><strong>\n                ';y={hash:{},inverse:o.noop,fn:o.program(11,u,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+='\n                \n                \n                Click <a href="javascript:void(0);" class="dataset-undelete">here</a> to undelete it\n                or <a href="javascript:void(0);" class="dataset-purge">here</a> to immediately remove it from disk\n            </strong></div>\n            ';return x}function u(y,x){return"This dataset has been deleted."}function t(B,A){var x="",z,y;x+='\n        <div class="warningmessagesmall"><strong>\n            ';y={hash:{},inverse:o.noop,fn:o.program(14,s,A),data:A};if(z=p.local){z=z.call(B,y)}else{z=B.local;z=typeof z===e?z.apply(B):z}if(!p.local){z=c.call(B,z,y)}if(z||z===0){x+=z}x+='\n            \n            Click <a href="javascript:void(0);" class="dataset-unhide">here</a> to unhide it\n        </strong></div>\n        ';return x}function s(y,x){return"This dataset has been hidden."}q+='<div class="dataset hda">\n    <div class="dataset-warnings">\n        ';h=p["if"].call(r,r.error,{hash:{},inverse:o.noop,fn:o.program(1,n,w),data:w});if(h||h===0){q+=h}q+="\n\n        ";h=p["if"].call(r,r.deleted,{hash:{},inverse:o.noop,fn:o.program(6,j,w),data:w});if(h||h===0){q+=h}q+="\n\n        ";h=p.unless.call(r,r.visible,{hash:{},inverse:o.noop,fn:o.program(13,t,w),data:w});if(h||h===0){q+=h}q+='\n    </div>\n\n    <div class="dataset-primary-actions"></div>\n    <div class="dataset-title-bar clear">\n        <span class="dataset-state-icon state-icon"></span>\n        <div class="dataset-title">\n            <span class="hda-hid">';if(h=p.hid){h=h.call(r,{hash:{},data:w})}else{h=r.hid;h=typeof h===e?h.apply(r):h}q+=d(h)+'</span>\n            <span class="dataset-name">';if(h=p.name){h=h.call(r,{hash:{},data:w})}else{h=r.name;h=typeof h===e?h.apply(r):h}q+=d(h)+'</span>\n        </div>\n    </div>\n\n    <div class="dataset-body"></div>\n</div>';return q})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-history-historyPanel-anon"]=b(function(g,r,p,k,u){this.compilerInfo=[4,">= 1.0.0"];p=this.merge(p,g.helpers);u=u||{};var q="",i,f,o=this,e="function",c=p.blockHelperMissing,d=this.escapeExpression;function n(z,y){var v="",x,w;v+='\n                <div class="history-name" title="';w={hash:{},inverse:o.noop,fn:o.program(2,m,y),data:y};if(x=p.local){x=x.call(z,w)}else{x=z.local;x=typeof x===e?x.apply(z):x}if(!p.local){x=c.call(z,x,w)}if(x||x===0){v+=x}v+='">\n                    ';if(x=p.name){x=x.call(z,{hash:{},data:y})}else{x=z.name;x=typeof x===e?x.apply(z):x}v+=d(x)+"\n                </div>\n            ";return v}function m(w,v){return"You must be logged in to edit your history name"}function l(y,x){var v="",w;v+='\n            <div class="history-size">';if(w=p.nice_size){w=w.call(y,{hash:{},data:x})}else{w=y.nice_size;w=typeof w===e?w.apply(y):w}v+=d(w)+"</div>\n            ";return v}function j(y,x){var v="",w;v+='\n            \n            <div class="';if(w=p.status){w=w.call(y,{hash:{},data:x})}else{w=y.status;w=typeof w===e?w.apply(y):w}v+=d(w)+'message">';if(w=p.message){w=w.call(y,{hash:{},data:x})}else{w=y.message;w=typeof w===e?w.apply(y):w}v+=d(w)+"</div>\n            ";return v}function h(w,v){return"You are over your disk quota"}function t(w,v){return"Tool execution is on hold until your disk usage drops below your allocated quota"}function s(w,v){return"Your history is empty. Click 'Get Data' on the left pane to start"}q+='<div class="history-controls">\n\n        <div class="history-title">\n            \n            ';i=p["if"].call(r,r.name,{hash:{},inverse:o.noop,fn:o.program(1,n,u),data:u});if(i||i===0){q+=i}q+='\n        </div>\n\n        <div class="history-subtitle clear">\n            ';i=p["if"].call(r,r.nice_size,{hash:{},inverse:o.noop,fn:o.program(4,l,u),data:u});if(i||i===0){q+=i}q+='\n        </div>\n\n        <div class="message-container">\n            ';i=p["if"].call(r,r.message,{hash:{},inverse:o.noop,fn:o.program(6,j,u),data:u});if(i||i===0){q+=i}q+='\n        </div>\n\n        <div class="quota-message errormessage">\n            ';f={hash:{},inverse:o.noop,fn:o.program(8,h,u),data:u};if(i=p.local){i=i.call(r,f)}else{i=r.local;i=typeof i===e?i.apply(r):i}if(!p.local){i=c.call(r,i,f)}if(i||i===0){q+=i}q+=".\n            ";f={hash:{},inverse:o.noop,fn:o.program(10,t,u),data:u};if(i=p.local){i=i.call(r,f)}else{i=r.local;i=typeof i===e?i.apply(r):i}if(!p.local){i=c.call(r,i,f)}if(i||i===0){q+=i}q+='.\n        </div>\n\n    </div>\n\n    \n    <div class="datasets-list"></div>\n\n    <div class="empty-history-message infomessagesmall">\n        ';f={hash:{},inverse:o.noop,fn:o.program(12,s,u),data:u};if(i=p.local){i=i.call(r,f)}else{i=r.local;i=typeof i===e?i.apply(r):i}if(!p.local){i=c.call(r,i,f)}if(i||i===0){q+=i}q+="\n    </div>";return q})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-history-historyPanel"]=b(function(h,t,r,m,z){this.compilerInfo=[4,">= 1.0.0"];r=this.merge(r,h.helpers);z=z||{};var s="",j,f,q=this,e="function",c=r.blockHelperMissing,d=this.escapeExpression;function p(E,D){var A="",C,B;A+='\n            <div class="history-name" title="';B={hash:{},inverse:q.noop,fn:q.program(2,o,D),data:D};if(C=r.local){C=C.call(E,B)}else{C=E.local;C=typeof C===e?C.apply(E):C}if(!r.local){C=c.call(E,C,B)}if(C||C===0){A+=C}A+='">\n                ';if(C=r.name){C=C.call(E,{hash:{},data:D})}else{C=E.name;C=typeof C===e?C.apply(E):C}A+=d(C)+"\n            </div>\n            ";return A}function o(B,A){return"Click to rename history"}function n(D,C){var A="",B;A+='\n            <div class="history-size">';if(B=r.nice_size){B=B.call(D,{hash:{},data:C})}else{B=D.nice_size;B=typeof B===e?B.apply(D):B}A+=d(B)+"</div>\n            ";return A}function l(E,D){var A="",C,B;A+='\n        <div class="warningmessagesmall"><strong>\n            ';B={hash:{},inverse:q.noop,fn:q.program(7,k,D),data:D};if(C=r.local){C=C.call(E,B)}else{C=E.local;C=typeof C===e?C.apply(E):C}if(!r.local){C=c.call(E,C,B)}if(C||C===0){A+=C}A+="\n        </strong></div>\n        ";return A}function k(B,A){return"You are currently viewing a deleted history!"}function g(D,C){var A="",B;A+='\n            \n            <div class="';if(B=r.status){B=B.call(D,{hash:{},data:C})}else{B=D.status;B=typeof B===e?B.apply(D):B}A+=d(B)+'message">';if(B=r.message){B=B.call(D,{hash:{},data:C})}else{B=D.message;B=typeof B===e?B.apply(D):B}A+=d(B)+"</div>\n            ";return A}function y(B,A){return"You are over your disk quota"}function x(B,A){return"Tool execution is on hold until your disk usage drops below your allocated quota"}function w(B,A){return"Annotation"}function v(B,A){return"Click to edit annotation"}function u(C,B){var A;if(A=r.annotation){A=A.call(C,{hash:{},data:B})}else{A=C.annotation;A=typeof A===e?A.apply(C):A}return d(A)}function i(B,A){return"Your history is empty. Click 'Get Data' on the left pane to start"}s+='<div class="history-controls">\n\n        <div class="history-title">\n            ';j=r["if"].call(t,t.name,{hash:{},inverse:q.noop,fn:q.program(1,p,z),data:z});if(j||j===0){s+=j}s+='\n        </div>\n\n        <div class="history-subtitle clear">\n            ';j=r["if"].call(t,t.nice_size,{hash:{},inverse:q.noop,fn:q.program(4,n,z),data:z});if(j||j===0){s+=j}s+='\n\n            <div class="history-secondary-actions">\n            </div>\n        </div>\n\n        ';j=r["if"].call(t,t.deleted,{hash:{},inverse:q.noop,fn:q.program(6,l,z),data:z});if(j||j===0){s+=j}s+='\n\n        <div class="message-container">\n            ';j=r["if"].call(t,t.message,{hash:{},inverse:q.noop,fn:q.program(9,g,z),data:z});if(j||j===0){s+=j}s+='\n        </div>\n\n        <div class="quota-message errormessage">\n            ';f={hash:{},inverse:q.noop,fn:q.program(11,y,z),data:z};if(j=r.local){j=j.call(t,f)}else{j=t.local;j=typeof j===e?j.apply(t):j}if(!r.local){j=c.call(t,j,f)}if(j||j===0){s+=j}s+=".\n            ";f={hash:{},inverse:q.noop,fn:q.program(13,x,z),data:z};if(j=r.local){j=j.call(t,f)}else{j=t.local;j=typeof j===e?j.apply(t):j}if(!r.local){j=c.call(t,j,f)}if(j||j===0){s+=j}s+='.\n        </div>\n        \n        \n        \n        <div class="tags-display"></div>\n\n        \n        <div class="annotation-display">\n            <label class="prompt">';f={hash:{},inverse:q.noop,fn:q.program(15,w,z),data:z};if(j=r.local){j=j.call(t,f)}else{j=t.local;j=typeof j===e?j.apply(t):j}if(!r.local){j=c.call(t,j,f)}if(j||j===0){s+=j}s+='</label>\n            <div class="annotation" title="';f={hash:{},inverse:q.noop,fn:q.program(17,v,z),data:z};if(j=r.local){j=j.call(t,f)}else{j=t.local;j=typeof j===e?j.apply(t):j}if(!r.local){j=c.call(t,j,f)}if(j||j===0){s+=j}s+='"\n                \n                >';j=r["if"].call(t,t.annotation,{hash:{},inverse:q.noop,fn:q.program(19,u,z),data:z});if(j||j===0){s+=j}s+='</div>\n        </div>\n\n    </div>\n\n    \n    <div class="datasets-list"></div>\n\n    <div class="empty-history-message infomessagesmall">\n        ';f={hash:{},inverse:q.noop,fn:q.program(21,i,z),data:z};if(j=r.local){j=j.call(t,f)}else{j=t.local;j=typeof j===e?j.apply(t):j}if(!r.local){j=c.call(t,j,f)}if(j||j===0){s+=j}s+="\n    </div>";return s})})();(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-history-historyPanel"]=b(function(k,w,u,p,C){this.compilerInfo=[4,">= 1.0.0"];u=this.merge(u,k.helpers);C=C||{};var v="",m,g,t=this,e="function",c=u.blockHelperMissing,d=this.escapeExpression;function s(H,G){var D="",F,E;D+='\n            <div class="history-name" title="';E={hash:{},inverse:t.noop,fn:t.program(2,r,G),data:G};if(F=u.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!u.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+='">\n                ';if(F=u.name){F=F.call(H,{hash:{},data:G})}else{F=H.name;F=typeof F===e?F.apply(H):F}D+=d(F)+"\n            </div>\n            ";return D}function r(E,D){return"Click to rename history"}function q(G,F){var D="",E;D+='\n            <div class="history-size">';if(E=u.nice_size){E=E.call(G,{hash:{},data:F})}else{E=G.nice_size;E=typeof E===e?E.apply(G):E}D+=d(E)+"</div>\n            ";return D}function o(H,G){var D="",F,E;D+='\n        <div class="warningmessagesmall"><strong>\n            ';E={hash:{},inverse:t.noop,fn:t.program(7,n,G),data:G};if(F=u.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!u.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+="\n        </strong></div>\n        ";return D}function n(E,D){return"You are currently viewing a deleted history!"}function j(G,F){var D="",E;D+='\n            \n            <div class="';if(E=u.status){E=E.call(G,{hash:{},data:F})}else{E=G.status;E=typeof E===e?E.apply(G):E}D+=d(E)+'message">';if(E=u.message){E=E.call(G,{hash:{},data:F})}else{E=G.message;E=typeof E===e?E.apply(G):E}D+=d(E)+"</div>\n            ";return D}function B(E,D){return"You are over your disk quota"}function A(E,D){return"Tool execution is on hold until your disk usage drops below your allocated quota"}function z(E,D){return"Tags"}function y(E,D){return"Annotation"}function x(E,D){return"Click to edit annotation"}function l(G,F){var D="",E;D+="\n                ";if(E=u.annotation){E=E.call(G,{hash:{},data:F})}else{E=G.annotation;E=typeof E===e?E.apply(G):E}D+=d(E)+"\n                ";return D}function i(H,G){var D="",F,E;D+="\n                <em>";E={hash:{},inverse:t.noop,fn:t.program(24,h,G),data:G};if(F=u.local){F=F.call(H,E)}else{F=H.local;F=typeof F===e?F.apply(H):F}if(!u.local){F=c.call(H,F,E)}if(F||F===0){D+=F}D+="</em>\n                ";return D}function h(E,D){return"Describe or add notes to history"}function f(E,D){return"Your history is empty. Click 'Get Data' on the left pane to start"}v+='<div class="history-controls">\n\n        <div class="history-title">\n            ';m=u["if"].call(w,w.name,{hash:{},inverse:t.noop,fn:t.program(1,s,C),data:C});if(m||m===0){v+=m}v+='\n        </div>\n\n        <div class="history-subtitle clear">\n            ';m=u["if"].call(w,w.nice_size,{hash:{},inverse:t.noop,fn:t.program(4,q,C),data:C});if(m||m===0){v+=m}v+='\n\n            <div class="history-secondary-actions">\n            </div>\n        </div>\n\n        ';m=u["if"].call(w,w.deleted,{hash:{},inverse:t.noop,fn:t.program(6,o,C),data:C});if(m||m===0){v+=m}v+='\n\n        <div class="message-container">\n            ';m=u["if"].call(w,w.message,{hash:{},inverse:t.noop,fn:t.program(9,j,C),data:C});if(m||m===0){v+=m}v+='\n        </div>\n\n        <div class="quota-message errormessage">\n            ';g={hash:{},inverse:t.noop,fn:t.program(11,B,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+=".\n            ";g={hash:{},inverse:t.noop,fn:t.program(13,A,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+='.\n        </div>\n        \n        \n        \n        <div class="tags-display">\n            <label class="prompt">';g={hash:{},inverse:t.noop,fn:t.program(15,z,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+='</label>\n            <div class="tags"></div>\n        </div>\n\n        \n        <div class="annotation-display">\n            <label class="prompt">';g={hash:{},inverse:t.noop,fn:t.program(17,y,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+='</label>\n            <div class="annotation" title="';g={hash:{},inverse:t.noop,fn:t.program(19,x,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+='">\n                ';m=u["if"].call(w,w.annotation,{hash:{},inverse:t.program(23,i,C),fn:t.program(21,l,C),data:C});if(m||m===0){v+=m}v+='\n            </div>\n        </div>\n\n    </div>\n\n    \n    <div class="datasets-list"></div>\n\n    <div class="empty-history-message infomessagesmall">\n        ';g={hash:{},inverse:t.noop,fn:t.program(26,f,C),data:C};if(m=u.local){m=m.call(w,g)}else{m=w.local;m=typeof m===e?m.apply(w):m}if(!u.local){m=c.call(w,m,g)}if(m||m===0){v+=m}v+="\n    </div>";return v})})();