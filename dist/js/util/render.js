define(["jquery","handlebars"],function(s,l){return function(e,r,n){var t=s(e).html(),i=l.compile(t);l.registerHelper("addInd",function(e){return e+=1}),l.registerHelper("status",function(e){return e?"完结":"连载中"}),l.registerHelper("equal",function(e,r,n){return e==r?n.fn(this):n.inverse(this)}),l.registerHelper("limit",function(e,r,n){return e<5?n.fn(this):n.inverse(this)});var u=i(r);s(n).html(u)}});