(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-history-historyPanel"]=b(function(g,s,q,m,y){this.compilerInfo=[4,">= 1.0.0"];q=this.merge(q,g.helpers);y=y||{};var r="",i,f,e="function",d=this.escapeExpression,p=this,c=q.blockHelperMissing;function o(C,B){var z="",A;z+='\n            <div class="history-name">\n                ';if(A=q.name){A=A.call(C,{hash:{},data:B})}else{A=C.name;A=typeof A===e?A.apply(C):A}z+=d(A)+"\n            </div>\n            ";return z}function n(C,B){var z="",A;z+='\n            <div class="history-size">';if(A=q.nice_size){A=A.call(C,{hash:{},data:B})}else{A=C.nice_size;A=typeof A===e?A.apply(C):A}z+=d(A)+"</div>\n            ";return z}function l(D,C){var z="",B,A;z+='\n        <div class="warningmessagesmall"><strong>\n            ';A={hash:{},inverse:p.noop,fn:p.program(6,k,C),data:C};if(B=q.local){B=B.call(D,A)}else{B=D.local;B=typeof B===e?B.apply(D):B}if(!q.local){B=c.call(D,B,A)}if(B||B===0){z+=B}z+="\n        </strong></div>\n        ";return z}function k(A,z){return"You are currently viewing a deleted history!"}function h(C,B){var z="",A;z+='\n            \n            <div class="';if(A=q.status){A=A.call(C,{hash:{},data:B})}else{A=C.status;A=typeof A===e?A.apply(C):A}z+=d(A)+'message">';if(A=q.message){A=A.call(C,{hash:{},data:B})}else{A=C.message;A=typeof A===e?A.apply(C):A}z+=d(A)+"</div>\n            ";return z}function x(A,z){return"You are over your disk quota"}function w(A,z){return"Tool execution is on hold until your disk usage drops below your allocated quota"}function v(A,z){return"All"}function u(A,z){return"None"}function t(A,z){return"For all selected"}function j(A,z){return"Your history is empty. Click 'Get Data' on the left pane to start"}r+='<div class="history-controls">\n        <div class="history-search-controls">\n            <div class="history-search-input"></div>\n        </div>\n\n        <div class="history-title">\n            ';i=q["if"].call(s,s.name,{hash:{},inverse:p.noop,fn:p.program(1,o,y),data:y});if(i||i===0){r+=i}r+='\n        </div>\n\n        <div class="history-subtitle clear">\n            ';i=q["if"].call(s,s.nice_size,{hash:{},inverse:p.noop,fn:p.program(3,n,y),data:y});if(i||i===0){r+=i}r+='\n\n            <div class="history-secondary-actions btn-group"></div>\n        </div>\n\n        ';i=q["if"].call(s,s.deleted,{hash:{},inverse:p.noop,fn:p.program(5,l,y),data:y});if(i||i===0){r+=i}r+='\n\n        <div class="message-container">\n            ';i=q["if"].call(s,s.message,{hash:{},inverse:p.noop,fn:p.program(8,h,y),data:y});if(i||i===0){r+=i}r+='\n        </div>\n\n        <div class="quota-message errormessage">\n            ';f={hash:{},inverse:p.noop,fn:p.program(10,x,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+=".\n            ";f={hash:{},inverse:p.noop,fn:p.program(12,w,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+='.\n        </div>\n        \n        <div class="tags-display"></div>\n        <div class="annotation-display"></div>\n\n        <div class="history-dataset-actions">\n            <div class="btn-group">\n                <button class="history-select-all-datasets-btn btn btn-default"\n                        data-mode="select">';f={hash:{},inverse:p.noop,fn:p.program(14,v,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+='</button>\n                <button class="history-deselect-all-datasets-btn btn btn-default"\n                        data-mode="select">';f={hash:{},inverse:p.noop,fn:p.program(16,u,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+='</button>\n            </div>\n            <button class="history-dataset-action-popup-btn btn btn-default"\n                    >';f={hash:{},inverse:p.noop,fn:p.program(18,t,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+='...</button>\n        </div>\n\n    </div>\n\n    \n    <div class="datasets-list"></div>\n\n    <div class="empty-history-message infomessagesmall">\n        ';f={hash:{},inverse:p.noop,fn:p.program(20,j,y),data:y};if(i=q.local){i=i.call(s,f)}else{i=s.local;i=typeof i===e?i.apply(s):i}if(!q.local){i=c.call(s,i,f)}if(i||i===0){r+=i}r+="\n    </div>";return r})})();