(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-visualization-statsDisplay"]=b(function(f,l,e,k,j){this.compilerInfo=[4,">= 1.0.0"];e=this.merge(e,f.helpers);j=j||{};var h="",c,g="function",i=this.escapeExpression,m=this;function d(q,p){var n="",o;n+="\n        <tr><td>";if(o=e.name){o=o.call(q,{hash:{},data:p})}else{o=q.name;o=typeof o===g?o.apply(q):o}n+=i(o)+"</td><td>";if(o=e.xval){o=o.call(q,{hash:{},data:p})}else{o=q.xval;o=typeof o===g?o.apply(q):o}n+=i(o)+"</td><td>";if(o=e.yval){o=o.call(q,{hash:{},data:p})}else{o=q.yval;o=typeof o===g?o.apply(q):o}n+=i(o)+"</td></tr>\n        </tr>\n        ";return n}h+='<p class="help-text">By column:</p>\n    <table id="chart-stats-table">\n        <thead><th></th><th>X</th><th>Y</th></thead>\n        ';c=e.each.call(l,l.stats,{hash:{},inverse:m.noop,fn:m.program(1,d,j),data:j});if(c||c===0){h+=c}h+="\n    </table>";return h})})();