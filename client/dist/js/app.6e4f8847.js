(function(t){function e(e){for(var i,s,a=e[0],c=e[1],r=e[2],u=0,l=[];u<a.length;u++)s=a[u],Object.prototype.hasOwnProperty.call(A,s)&&A[s]&&l.push(A[s][0]),A[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);d&&d(e);while(l.length)l.shift()();return o.push.apply(o,r||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,a=1;a<n.length;a++){var c=n[a];0!==A[c]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},A={app:0},o=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var r=0;r<a.length;r++)e(a[r]);var d=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"052d":function(t,e,n){"use strict";n("3b92")},"121a":function(t,e,n){"use strict";n("25d0")},"18f2":function(t,e,n){"use strict";n("b5cf")},"1acd":function(t,e,n){"use strict";n("37f2")},"1bf6":function(t,e,n){"use strict";n("cfe8")},"1ff6":function(t,e,n){n("a15b"),n("d81d"),n("fb6a"),t.exports={gimmeString:function(){return"hai!"},getToday:function(){var t=new Date;return t.setHours(0,0,0,0),t},dayOfWeekShortAbbr:function(t){var e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return e[t.getDay()]},formatDateOld:function(t,e,n){function i(e){var n=new Intl.DateTimeFormat("en",e);return n.format(t)}return e.map(i).join(n)},tomorrow:function(t){var e=new Date(t);return e.setDate(e.getDate()+1),e},yesterday:function(t){var e=new Date(t);return e.setDate(e.getDate()-1),e},getMonday:function(t){var e=new Date(t),n=e.getDay(),i=e.getDate()-n+(0==n?-6:1);return e.setDate(i),e},plusOneWeek:function(t){var e=new Date(t);return e.setDate(e.getDate()+7),e},apiDateStr:function(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2)},getDateFromIdStr:function(t){var e=parseInt(t.substring(0,4)),n=parseInt(t.substring(4,6))-1,i=parseInt(t.substring(6,8)),A=new Date(e,n,i,0,0,0,0);return A}}},"252d":function(t,e,n){"use strict";n("6a23")},"25d0":function(t,e,n){},2820:function(t,e,n){"use strict";n("6179")},"2c36":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAvjSURBVHic7d3Pq1XV/8fx5z1mkDgyG4hKVJSOmih9RkE5iyYN+gHZoKCJpH9Cs4YOgjCKoJFCkJMgHYV/QOgsQQWhTHOQOkkCteQ72PfWRa9Xb92zz7fr4zE6Z+21z3nN1pu1116rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+P5v7hfeuqF6qXq13VzmpLtbFavzrRAIBFblXXq1+qs9Wp6kT1fXV7pT+20gJge/VB9U61daV/BgCsuovV4erQ/OcH8qAFwBPVR9W71aMrTQYATN3N6svqw+rK/To/SAHwdvVJtenf5QIARnC12l99tVyn5QqA9dWn1furGAoAGMfn1YGGtQN3uVcBsKE6Wr0ypVAAwPQdr96ofr/zwlIFwPrqmwz+ALAWfFe92rBG4C/rluj4efXWGIkAgKl7umEx/7HFjXcWAHsbVvsDAGvH7upMdXqhYfEjgMfnL24eORQAMH3Xqh3NvyK4eAbg4+rFWSQCAKbusYYde4/X3zMA26rz2eQHANaym9Wz1YXJfMP+DP4AsNY9Wu2rYQZgUv3UMAsAAKxtl6onJ9X/MvgDwMNia7Vr0nCkLwDw8NgzaXg3EAB4eOyaVM/NOgUAMKodk2rLrFMAAKPaMlfdyCuAAPAwuTG5fx8AYK2ZVNdnHQIAGNVvk+ryrFMAAKO6PKnOzToFADCqs5Pq5KxTAACjOjmpTsw6BQAwqhMLhwH9WG2fbRYAYAQXqqcm1e3qyIzDAADjOFLdnpv/sq06nw2BAGAtu1E9U11a2AjoYvXl7PIAACP4orpUNbeocVN1tto8i0QAwFRdrXZWV2pYALjgWnVgFokAgKnb1/zgX7Xujos/NJwOuHvMRADAVB2qDi5umFui07rqaPXaGIkAgKk61jCm/7G4canTAP+s9lbHRwgFAEzPt9Wb3TH4192PABbcqr6unsjjAAD4LzpUvdfw6t9d7lUA1LBB0LHqTPVStWG1kwEAq+7XhoH/YMNYvqTlCoAFpxv2CNhYPV89shrpAIBVdaP6rHq9OnW/zkstAlzO1mp/wxoBZwcAwOz9XB1umPK/9KA3rbQAWDBpWBuwp9pV7WgoDjZmO2EAmIab1fWG3XvPVScbTvQ91TJT/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsb+4f3reueqF6udpV7ay2VBur9asTDQBY5FZ1vfqlOludqk5U31e3V/pjKy0AtlcfVO9UW1f6ZwDAqrtYHa4OzX9+IA9aADxRfVS9Wz260mQAwNTdrL6sPqyu3K/zgxQAb1efVJv+XS4AYARXq/3VV8t1Wq4AWF99Wr2/iqEAgHF8Xh1oWDtwl3sVABuqo9UrUwoFAEzf8eqN6vc7LyxVAKyvvsngDwBrwXfVqw1rBP6ybomOn1dvjZEIAJi6pxsW8x9b3HhnAbC3YbU/ALB27K7OVKcXGhY/Anh8/uLmkUMBANN3rdrR/CuCi2cAPq5enEUiAGDqHmvYsfd4/T0DsK06n01+AGAtu1k9W12YzDfsz+APAGvdo9W+GmYAJtVPDbMAAMDadql6clL9L4M/ADwstla7Jg1H+gIAD489k4Z3AwGAh8euSfXcrFMAAKPaMam2zDoFADCqLXPVjbwCCAAPkxuT+/cBANaaSXV91iEAgFH9NqkuzzoFADCqy5Pq3KxTAACjOjupTs46BQAwqpOT6sSsUwAAozqxcBjQj9X22WYBAEZwoXpqUt2ujsw4DAAwjiPV7bn5L9uq89kQCADWshvVM9WlhY2ALlZfzi4PADCCL6pLVXOLGjdVZ6vNs0gEAEzV1WpndaWGBYALrlUHZpEIAJi6fc0P/lXr7rj4Q8PpgLvHTAQATNWh6uDihrklOq2rjlavjZEIAJiqYw1j+h+LG5c6DfDPam91fIRQAMD0fFu92R2Df939CGDBrerr6ok8DgCA/6JD1XsNr/7d5V4FQA0bBB2rzlQvVRtWOxkAsOp+bRj4DzaM5UtargBYcLphj4CN1fPVI6uRDgBYVTeqz6rXq1P367zUIsDlbK32N6wRcHYAAMzez9Xhhin/Sw9600oLgAWThrUBe6pd1Y6G4mBjthMGgGm4WV1v2L33XHWy4UTfUy0z1Q8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA8ub+4X3rqheql6td1c5qS7WxWr860QCARW5V16tfqrPVqepE9X11e6U/ttICYHv1QfVOtXWlfwYArLqL1eHq0PznB/KgBcAT1UfVu9WjK00GAEzdzerL6sPqyv06P0gB8Hb1SbXp3+UCAEZwtdpffbVcp+UKgPXVp9X7qxgKABjH59WBhrUDd7lXAbChOlq9MqVQAMD0Ha/eqH6/88JSBcD66psM/gCwFnxXvdqwRuAv65bo+Hn11hiJAICpe7phMf+xxY13FgB7G1b7AwBrx+7qTHV6oWHxI4DH5y9uHjkUADB916odzb8iuHgG4OPqxVkkAgCm7rGGHXuP198zANuq89nkBwDWspvVs9WFyXzD/gz+ALDWPVrtq2EGYFL91DALAACsbZeqJyfV/zL4A8DDYmu1a9JwpC8A8PDYM2l4NxAAeHjsmlTPzToFADCqHZNqy6xTAACj2jJX3cgrgADwMLkxuX8fAGCtmVTXZx0CABjVb5Pq8qxTAACjujypzs06BQAwqrOT6uSsUwAAozo5qU7MOgUAMKoTC4cB/Vhtn20WAGAEF6qnJtXt6siMwwAA4zhS3Z6b/7KtOp8NgQBgLbtRPVNdWtgI6GL15ezyAAAj+KK6VDW3qHFTdbbaPItEAMBUXa12VldqWAC44Fp1YBaJAICp29f84F+17o6LPzScDrh7zEQAwFQdqg4ubphbotO66mj12hiJAICpOtYwpv+xuHGp0wD/rPZWx0cIBQBMz7fVm90x+NfdjwAW3Kq+rp7I4wAA+C86VL3X8OrfXe5VANSwQdCx6kz1UrVhtZMBAKvu14aB/2DDWL6k5QqABacb9gjYWD1fPbIa6QCAVXWj+qx6vTp1v85LLQJcztZqf8MaAWcHAMDs/Vwdbpjyv/SgN620AFgwaVgbsKfaVe1oKA42ZjthAJiGm9X1ht17z1UnG070PdUyU/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAf8v/Ad0pRFiK920EAAAAAElFTkSuQmCC"},"37f2":function(t,e,n){},"3b92":function(t,e,n){},"3de4":function(t,e,n){t.exports=n.p+"img/fire.d0e39b25.png"},"433b":function(t,e,n){},"4db5":function(t,e,n){"use strict";n("be94")},"4fa9":function(t,e,n){"use strict";n("433b")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),A={id:"app"};function o(t,e,n,o,s,a){var c=Object(i["q"])("btd-main-component"),r=Object(i["q"])("btd-login");return Object(i["l"])(),Object(i["f"])("div",A,[s.authInfo.loggedIn?(Object(i["l"])(),Object(i["f"])(c,{key:0})):Object(i["g"])("",!0),s.authInfo.loggedIn?Object(i["g"])("",!0):(Object(i["l"])(),Object(i["f"])(r,{key:1,onSetAuthToken:a.setAuthToken},null,8,["onSetAuthToken"]))])}n("99af"),n("ac1f"),n("1276"),n("2ca0"),n("498a"),n("7db0");var s=Object(i["x"])("data-v-87f2f1ca");Object(i["n"])("data-v-87f2f1ca");var a={class:"btd-main-component"};Object(i["m"])();var c=s((function(t,e,n,A,o,s){var c=Object(i["q"])("btd-header"),r=Object(i["q"])("btd-loading-body"),d=Object(i["q"])("btd-no-lists-filler"),u=Object(i["q"])("btd-list"),l=Object(i["q"])("btd-edit-default-modal");return Object(i["l"])(),Object(i["f"])("div",a,[Object(i["i"])(c,{date:o.selectedDate,onDayChosen:e[1]||(e[1]=function(t){return s.dayChosen(t)})},null,8,["date"]),null===o.lists?(Object(i["l"])(),Object(i["f"])(r,{key:0})):Object(i["g"])("",!0),null!==o.lists&&0==o.lists.length?(Object(i["l"])(),Object(i["f"])(d,{key:1})):Object(i["g"])("",!0),(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(o.lists,(function(t,e){return Object(i["l"])(),Object(i["f"])(u,{key:t.id,list:t,onListUpdate:function(t){return s.listUpdate(e,t)}},null,8,["list","onListUpdate"])})),128)),Object(i["i"])(l,{ref:"editDefaultModal",onEditMade:s.refreshList},null,8,["onEditMade"])])})),r=(n("159b"),n("d81d"),n("c740"),n("a434"),n("1ff6")),d=n.n(r),u=n("2c36"),l=n.n(u),f=Object(i["x"])("data-v-7102f35e");Object(i["n"])("data-v-7102f35e");var p={class:"btd-header"};Object(i["m"])();var m=f((function(t,e,n,A,o,s){var a=Object(i["q"])("btd-day-display"),c=Object(i["q"])("btd-streak-info");return Object(i["l"])(),Object(i["f"])("div",p,[Object(i["i"])("img",{class:"options-button",onClick:e[1]||(e[1]=function(){return t.optionsClicked&&t.optionsClicked.apply(t,arguments)}),src:l.a}),Object(i["i"])(a,{date:n.date,onDayChosen:e[2]||(e[2]=function(t){return s.dayChosen(t)})},null,8,["date"]),Object(i["i"])(c)])})),b=n("a9e3"),h=n.n(b),v=Object(i["x"])("data-v-e1b9c5f8");Object(i["n"])("data-v-e1b9c5f8");var g={class:"btd-day-display"},O={class:"date-text"};Object(i["m"])();var j=v((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",g,[Object(i["i"])("img",{src:h.a,onClick:e[1]||(e[1]=function(){return s.yesterdayClicked&&s.yesterdayClicked.apply(s,arguments)}),alt:"Yesterday",class:"left-arrow arrow"}),Object(i["i"])("span",O,Object(i["t"])(s.dateText),1),Object(i["i"])("img",{src:h.a,onClick:e[2]||(e[2]=function(){return s.tomorrowClicked&&s.tomorrowClicked.apply(s,arguments)}),alt:"Tomorrow",class:"right-arrow arrow"})])})),k={name:"btdDayDisplay",data:function(){return{}},props:{date:Date},emits:["dayChosen"],computed:{dateText:function(){var t=[{year:"numeric"},{month:"numeric"},{day:"numeric"}];return d.a.formatDateOld(this.date,t,"/")}},methods:{yesterdayClicked:function(){var t=d.a.yesterday(this.date);this.$emit("dayChosen",t)},tomorrowClicked:function(){this.$emit("dayChosen",d.a.tomorrow(this.date))}}};n("121a");k.render=j,k.__scopeId="data-v-e1b9c5f8";var D=k,y=n("3de4"),w=n.n(y),C=Object(i["x"])("data-v-5e67f302");Object(i["n"])("data-v-5e67f302");var I={class:"btd-streak-info"};Object(i["m"])();var L=C((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",I,[Object(i["i"])("img",{class:["fire-img",{greyed:0===o.streakLength}],src:w.a,alt:"streak"},null,2),Object(i["h"])(" "+Object(i["t"])(o.streakLength),1)])})),T=(n("a9e3d"),{name:"btdStreakInfo",data:function(){return{streakLength:0}},props:{updateFlag:Number},emits:["updateDone"],watch:{updateFlag:function(t){t>0&&console.log("time to update the streak!")}}});n("252d");T.render=L,T.__scopeId="data-v-5e67f302";var x=T,M={name:"btdHeader",data:function(){return{}},components:{BtdDayDisplay:D,BtdStreakInfo:x},props:{scrollInfo:null,date:Date},emits:["dayChosen"],methods:{dayChosen:function(t){this.$emit("dayChosen",t)},todayClicked:function(){this.dayChosen(d.a.getToday())}}};n("2820");M.render=m,M.__scopeId="data-v-7102f35e";var B=M,E=Object(i["x"])("data-v-23228dfb");Object(i["n"])("data-v-23228dfb");var q={class:"btd-loading-body"};Object(i["m"])();var S=E((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",q,"Loading...")})),U={name:"btdLoadingBody",data:function(){return{}}};U.render=S,U.__scopeId="data-v-23228dfb";var V=U,P=Object(i["x"])("data-v-2978ee9c");Object(i["n"])("data-v-2978ee9c");var F={class:"btd-list"},H={class:"list-body"},W={class:"list-footer"},z=Object(i["h"])("+ Add Item"),X={key:0,class:"completed-container"};Object(i["m"])();var _=P((function(t,e,n,A,o,s){var a=Object(i["q"])("btd-list-header"),c=Object(i["q"])("btd-list-item");return Object(i["l"])(),Object(i["f"])("div",F,[Object(i["i"])(a,{title:s.title,numItems:n.list.items.length,numComplete:s.numComplete,isSkipped:n.list.isSkipped,onUpdateSkipped:s.updateSkipped,onSetAllDone:s.setAllDone,onLoadDefaultList:s.loadDefaultList,onEditDefaultList:s.editDefaultList},null,8,["title","numItems","numComplete","isSkipped","onUpdateSkipped","onSetAllDone","onLoadDefaultList","onEditDefaultList"]),Object(i["i"])("div",H,[Object(i["i"])(i["c"],{name:"list"},{default:P((function(){return[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(s.itemsNotDone,(function(t){return Object(i["l"])(),Object(i["f"])(c,{class:["list-item",t.isDone?"done-item":"pending-item"],key:n.list.id+"_"+t.id+"_nd",text:t.text,isDone:t.isDone,onItemDoneUpdate:function(e){return s.itemDoneUpdate(t.id,e)},onItemDeleted:function(e){return s.itemDeleted(t.id)},onItemMoved:function(e){return s.itemMoved(t.id,e)},onItemEdited:function(e){return s.itemEdited(t.id,e)}},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited","class"])})),128))]})),_:1}),Object(i["i"])("div",W,[(Object(i["l"])(),Object(i["f"])(Object(i["s"])(o.isAddingItem?"btd-item-title-edit":"button"),Object(i["j"])({class:["add-item-button",o.isAddingItem?"growedit":""]},Object(i["u"])(o.isAddingItem?{}:{click:s.addItemClicked}),{onDoneEditing:s.doneEditing,onCanceledEditing:s.canceledEditing,key:"list.id + '_-1'"}),{default:P((function(){return[z]})),_:1},16,["class","onDoneEditing","onCanceledEditing"])),Object(i["i"])("button",{onClick:e[1]||(e[1]=function(t){return o.showCompleted=!o.showCompleted}),class:"show-completed-button"},Object(i["t"])(o.showCompleted?"Hide Completed":"Show Completed (".concat(s.itemsDone.length,")")),1)]),o.showCompleted?(Object(i["l"])(),Object(i["f"])("div",X,[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(s.itemsDone,(function(t){return Object(i["l"])(),Object(i["f"])(c,{key:n.list.id+"_"+t.id+"_nd",text:t.text,isDone:t.isDone,onItemDoneUpdate:function(e){return s.itemDoneUpdate(t.id,e)},onItemDeleted:function(e){return s.itemDeleted(t.id)},onItemMoved:function(e){return s.itemMoved(t.id,e)},onItemEdited:function(e){return s.itemEdited(t.id,e)},class:"done-item"},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited"])})),128))])):Object(i["g"])("",!0)])])})),N=n("2909"),R=(n("4de4"),n("d3b7"),n("ddb0"),n("f0c8")),Y=n.n(R),Q=n("a82b"),G=n.n(Q),K=Object(i["x"])("data-v-53b7ff83");Object(i["n"])("data-v-53b7ff83");var $={class:"header-title"},J={class:"header-info-container"},Z={class:"completion-container"},tt={key:0,class:"header-info"},et={key:1,src:Y.a,class:"checkimg"},nt={key:0,class:"skipped-icon",alt:"Skipped",src:G.a},it=Object(i["i"])("div",{class:"header-info-spacer-vert"},null,-1),At=Object(i["i"])("div",{class:"header-spacer"},null,-1),ot={class:"options-button-container"};Object(i["m"])();var st=K((function(t,e,n,A,o,s){var a=Object(i["q"])("btd-options-button");return Object(i["l"])(),Object(i["f"])("div",{onMouseenter:e[5]||(e[5]=function(t){return o.mouseIn=!0}),onMouseleave:e[6]||(e[6]=function(t){return o.mouseIn=!1}),class:"btd-list-header"},[Object(i["i"])("h1",$,Object(i["t"])(n.title),1),Object(i["i"])("div",J,[Object(i["i"])("div",Z,[Object(i["i"])(i["b"],{name:"completion-status",mode:"out-in"},{default:K((function(){return[s.isComplete?(Object(i["l"])(),Object(i["f"])("img",et)):(Object(i["l"])(),Object(i["f"])("span",tt,Object(i["t"])(n.numComplete)+"/"+Object(i["t"])(n.numItems),1))]})),_:1})]),n.isSkipped?(Object(i["l"])(),Object(i["f"])("img",nt)):Object(i["g"])("",!0),it]),At,Object(i["i"])(a,{class:"list-options",ref:"optionsButton",mouseHovering:o.mouseIn},{default:K((function(){return[Object(i["i"])("div",ot,[Object(i["i"])("button",{class:"options-button",onClick:e[1]||(e[1]=function(){return s.skipButtonClicked&&s.skipButtonClicked.apply(s,arguments)})},"Skip"),Object(i["i"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return s.markAllClicked&&s.markAllClicked.apply(s,arguments)})},Object(i["t"])(s.markAllText),1),Object(i["i"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return s.loadDefaultClicked&&s.loadDefaultClicked.apply(s,arguments)})}," Load Default List "),Object(i["i"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return s.editDefaultClicked&&s.editDefaultClicked.apply(s,arguments)})}," Edit Default List ")])]})),_:1},8,["mouseHovering"])],32)})),at=n("b758"),ct=n.n(at),rt=Object(i["x"])("data-v-e9c247ba");Object(i["n"])("data-v-e9c247ba");var dt={class:"options-button-container"};Object(i["m"])();var ut=rt((function(t,e,n,A,o,s){var a=Object(i["r"])("click-away");return Object(i["l"])(),Object(i["f"])("div",dt,[Object(i["w"])(Object(i["i"])("img",{src:ct.a,class:["main-button",s.displayOptionsButton?"visible-button":"hidden-button"],onClick:e[1]||(e[1]=function(){return s.optionsClicked&&s.optionsClicked.apply(s,arguments)})},null,2),[[a,s.clickNotOnOptionsButton]]),Object(i["i"])("div",{class:["non-menu-mask",{"visible-mask":o.displayDropdownOptions}]},null,2),Object(i["i"])("div",{class:["dropdown-content",{"visible-dropdown":o.displayDropdownOptions}]},[Object(i["p"])(t.$slots,"default",{},void 0,!0)],2)])})),lt=(n("caad"),n("2532"),{name:"btdListItem",data:function(){return{displayDropdownOptions:!1}},props:{mouseHovering:Boolean,showOnlyOnHover:{type:Boolean,default:!0},iconPath:{type:String,default:"../assets/ellipsis.png"}},computed:{displayOptionsButton:function(){return!this.showOnlyOnHover||this.mouseHovering||this.displayDropdownOptions}},methods:{clickNotOnOptionsButton:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("dropdown-content")}))||(this.displayDropdownOptions=!1)},optionsClicked:function(){this.displayDropdownOptions=!this.displayDropdownOptions},hideMenu:function(){this.displayDropdownOptions=!1}}});n("4db5");lt.render=ut,lt.__scopeId="data-v-e9c247ba";var ft=lt,pt={name:"btdListHeader",components:{btdOptionsButton:ft},data:function(){return{mouseIn:!1}},props:{numItems:Number,numComplete:Number,isSkipped:Boolean,title:String},emits:["updateSkipped","setAllDone","loadDefaultList","editDefaultList"],computed:{isComplete:function(){return this.numItems===this.numComplete},markAllText:function(){return this.isComplete?"Mark all incomplete":"Mark all complete"}},methods:{skipButtonClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("updateSkipped",!this.isSkipped)},markAllClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("setAllDone",!this.isComplete)},loadDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("loadDefaultList")},editDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("editDefaultList")}}};n("6fae");pt.render=st,pt.__scopeId="data-v-53b7ff83";var mt=pt,bt=Object(i["x"])("data-v-667a0446");Object(i["n"])("data-v-667a0446");var ht={class:"options-button-container"};Object(i["m"])();var vt=bt((function(t,e,n,A,o,s){var a=Object(i["q"])("btd-options-button");return Object(i["l"])(),Object(i["f"])("div",{class:"btd-list-item",onMouseenter:e[5]||(e[5]=function(t){return o.mouseIn=!0}),onMouseleave:e[6]||(e[6]=function(t){return o.mouseIn=!1})},[(Object(i["l"])(),Object(i["f"])(Object(i["s"])(s.itemTitleComponentType),{class:"todo-item-title",ref:"itemText",onClick:s.textClicked,text:n.text,isDone:n.isDone,onDoneEditing:s.doneEditing,onCanceledEditing:s.canceledEditing},null,8,["onClick","text","isDone","onDoneEditing","onCanceledEditing"])),Object(i["i"])(a,{ref:"itemOptionsMenu",mouseHovering:o.mouseIn},{default:bt((function(){return[Object(i["i"])("div",ht,[Object(i["i"])("button",{class:"options-button",onClick:e[1]||(e[1]=function(){return s.editButtonClicked&&s.editButtonClicked.apply(s,arguments)})},"edit"),Object(i["i"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return s.deleteButtonClicked&&s.deleteButtonClicked.apply(s,arguments)})}," delete "),Object(i["i"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return s.moveToYesterdayClicked&&s.moveToYesterdayClicked.apply(s,arguments)})}," move to yesterday "),Object(i["i"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return s.moveToTomorrowClicked&&s.moveToTomorrowClicked.apply(s,arguments)})}," move to tomorrow ")])]})),_:1},8,["mouseHovering"])],32)})),gt=Object(i["x"])("data-v-204c4056");Object(i["n"])("data-v-204c4056");var Ot={class:"item-title-display"};Object(i["m"])();var jt=gt((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",Ot,[Object(i["i"])("span",{class:["title-display-text",{strike:n.isDone}],onMousedown:e[1]||(e[1]=function(){return s.mousedown&&s.mousedown.apply(s,arguments)})},"   "+Object(i["t"])(n.text)+"  ",35)])})),kt={name:"btdItemTitleDisplay",data:function(){return{}},props:{text:String,isDone:Boolean},computed:{itemTitleComponentType:function(){return this.isDone?"s":"b"}},methods:{mousedown:function(t){t.preventDefault()}}};n("18f2");kt.render=jt,kt.__scopeId="data-v-204c4056";var Dt=kt,yt=Object(i["x"])("data-v-0cca25c8");Object(i["n"])("data-v-0cca25c8");var wt={class:"btd-item-title-edit"};Object(i["m"])();var Ct=yt((function(t,e,n,A,o,s){var a=Object(i["r"])("click-away");return Object(i["l"])(),Object(i["f"])("div",wt,[Object(i["w"])(Object(i["i"])("input",{ref:"inputField",class:"item-title-edit-input","onUpdate:modelValue":e[1]||(e[1]=function(t){return o.currentText=t}),onKeydown:e[2]||(e[2]=function(){return s.keylistener&&s.keylistener.apply(s,arguments)})},null,544),[[a,s.clickAway],[i["v"],o.currentText]]),Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.doneEditing&&s.doneEditing.apply(s,arguments)})},"Save"),Object(i["i"])("button",{onClick:e[4]||(e[4]=function(){return s.cancelEditing&&s.cancelEditing.apply(s,arguments)})},"Cancel")])})),It={name:"btdItemTitleEdit",data:function(){return{currentText:this.text}},props:{text:String},emits:["doneEditing","canceledEditing"],methods:{focusInput:function(){this.$refs.inputField.focus(),this.$refs.inputField.select()},doneEditing:function(){this.$emit("doneEditing",this.currentText)},cancelEditing:function(){this.$emit("canceledEditing",this.currentText)},clickAway:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("btd-item-title-edit")}))||this.doneEditing()},keylistener:function(t){"Escape"===t.key?this.escapePressed():"Enter"===t.key&&this.enterPressed()},enterPressed:function(){this.doneEditing()},escapePressed:function(){this.cancelEditing()}},mounted:function(){this.focusInput()}};n("f416");It.render=Ct,It.__scopeId="data-v-0cca25c8";var Lt=It,Tt=n("5c40"),xt={components:{btdOptionsButton:ft,btdItemTitleDisplay:Dt,btdItemTitleEdit:Lt},name:"btdListItem",data:function(){return{mouseIn:!1,isEditing:!1}},props:{text:String,isDone:Boolean},emits:["itemDoneUpdate","itemDeleted","itemMoved","itemEdited"],computed:{itemTitleComponentType:function(){return this.isEditing?"btd-item-title-edit":"btd-item-title-display"}},methods:{handleCheckbox:function(t){this.$emit("itemDoneUpdate",t.target.checked)},textClicked:function(){this.isEditing||this.$emit("itemDoneUpdate",!this.isDone)},titleClickAway:function(){this.isEditing=!1},deleteButtonClicked:function(){var t=this;this.$refs.itemOptionsMenu.hideMenu(),Object(Tt["q"])((function(){t.$emit("itemDeleted")}))},moveToYesterdayClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",-1)},moveToTomorrowClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",1)},editButtonClicked:function(){this.isEditing=!this.isEditing,this.isEditing?(console.log("hi"),console.log(this.$refs.itemText),this.$refs.itemOptionsMenu.hideMenu()):console.log("this shouldn't happen")},doneEditing:function(t){this.isEditing=!1,this.$emit("itemEdited",t)},canceledEditing:function(){this.isEditing=!1}}};n("4fa9");xt.render=vt,xt.__scopeId="data-v-667a0446";var Mt=xt,Bt={name:"btdList",components:{BtdListHeader:mt,BtdListItem:Mt,btdItemTitleEdit:Lt},data:function(){return{isAddingItem:!1,testitems:[1,2,3,4,5],showCompleted:!1}},props:{list:Object},emits:["listUpdate"],computed:{itemsDone:function(){return this.list.items.filter((function(t){return t.isDone}))},itemsNotDone:function(){return this.list.items.filter((function(t){return!t.isDone}))},title:function(){var t=this.list.id;if("day_"===t.substring(0,4)){var e={weekday:"short",month:"short",day:"numeric"};return new Intl.DateTimeFormat("en-US",e).format(new Date(this.list.start))}if("week_"===t.substring(0,5)){var n={month:"numeric",day:"numeric"},i=new Intl.DateTimeFormat("en-US",n);return i.format(new Date(this.list.start))+" - "+i.format(new Date(this.list.end)-1)}return t},numComplete:function(){return this.list.items.reduceRight((function(t,e){return e.isDone?t+1:t+0}),0)}},methods:{itemDoneUpdate:function(t,e){var n={type:"itemDoneUpdate",itemUpdates:[{id:t,val:e}]};this.$emit("listUpdate",n)},itemDeleted:function(t){this.$emit("listUpdate",{type:"itemDeleted",itemIds:[t]})},itemMoved:function(t,e){this.$emit("listUpdate",{type:"itemMovedToList",itemId:t,moveAmt:e})},itemEdited:function(t,e){var n={type:"itemEdited",itemUpdates:[{id:t,val:e}]};this.$emit("listUpdate",n)},addItemClicked:function(){this.isAddingItem||(this.isAddingItem=!0)},doneEditing:function(t){var e=this,n={type:"itemAdded",itemUpdates:[{val:t}]};this.$emit("listUpdate",n),Object(i["k"])((function(){return e.isAddingItem=!1}))},canceledEditing:function(){var t=this;this.isAddingItem=!1,Object(i["k"])((function(){return t.isAddingItem=!1}))},updateSkipped:function(t){this.$emit("listUpdate",{type:"listSkippedUpdate",isSkipped:t})},setAllDone:function(t){var e=this,n={type:"itemDoneUpdate",itemUpdates:Object(N["a"])(Array(this.list.items.length).keys()).map((function(n){return{id:e.list.items[n].id,val:t}}))};this.$emit("listUpdate",n)},loadDefaultList:function(){this.$emit("listUpdate",{type:"loadDefaultList"})},editDefaultList:function(){this.$emit("listUpdate",{type:"editDefaultList"})}}};n("052d");Bt.render=_,Bt.__scopeId="data-v-2978ee9c";var Et=Bt,qt=n("745a"),St=n.n(qt),Ut=Object(i["x"])("data-v-2c214604");Object(i["n"])("data-v-2c214604");var Vt={class:"btd-no-lists-filler"};Object(i["m"])();var Pt=Ut((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",Vt,"No lists")})),Ft={name:"btdNoListsFiller",data:function(){return{}}};Ft.render=Pt,Ft.__scopeId="data-v-2c214604";var Ht=Ft,Wt=Object(i["x"])("data-v-680df77a");Object(i["n"])("data-v-680df77a");var zt=Object(i["i"])("div",{class:"non-menu-mask"},null,-1),Xt={class:"modal-content"},_t={class:"modal-header"},Nt={class:"item-list"},Rt={class:"modal-footer"};Object(i["m"])();var Yt=Wt((function(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",{class:["modal-container",{"visible-container":o.displayModal}]},[zt,Object(i["i"])("div",Xt,[Object(i["i"])("div",_t,[Object(i["i"])("h1",null,"Default "+Object(i["t"])("day"===o.listType?"Daily":"Weekly")+" List",1)]),Object(i["i"])("div",Nt,[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(o.list.items,(function(t,e){return Object(i["w"])((Object(i["l"])(),Object(i["f"])("input",{class:"item-input","onUpdate:modelValue":function(e){return t.text=e},key:e,ref:s.setItemRef,onBlur:function(t){return s.checkIfShouldDelete(e)}},null,40,["onUpdate:modelValue","onBlur"])),[[i["v"],t.text]])})),128)),Object(i["i"])("input",{ref:"lastInput",onInput:e[1]||(e[1]=function(){return s.lastInputChange&&s.lastInputChange.apply(s,arguments)})},null,544)]),Object(i["i"])("div",Rt,[Object(i["i"])("button",{onClick:e[2]||(e[2]=function(){return s.save&&s.save.apply(s,arguments)})},"Save"),Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.cancel&&s.cancel.apply(s,arguments)})},"Cancel")])])],2)})),Qt={name:"btdEditDefaultModal",components:{},data:function(){return{displayModal:!1,listType:"",list:{},itemRefs:[]}},inject:["authToken"],emits:["editMade"],methods:{setItemRef:function(t){t&&this.itemRefs.push(t)},checkIfShouldDelete:function(t){console.log("check if deleting ",t,"list items = ",this.list.items,"value",this.itemRefs[t].value,"len",this.itemRefs[t].value.length),0===this.itemRefs[t].value.length&&(this.itemRefs=[],this.list.items.splice(t,1))},show:function(t){console.log("showing modal with type",t),this.listType=t,this.displayModal=!0},save:function(){this.displayModal=!1,this.list.id=this.listType+"_default",this.list.items.forEach((function(t,e){t.isDone=!1,t.id=e})),console.log(this.list),St.a.pushListToServer(this.authToken.value,this.list),this.listType="",this.$emit("editMade")},cancel:function(){console.log("hiding modal"),this.displayModal=!1,this.listType=""},getListFromServer:function(t){var e=this;console.log("default editor getting list from server:",t),St.a.getDefaultList(this.authToken.value,t+"_edit",(function(t){console.log("got from server:",t),e.list=t.data}))},lastInputChange:function(t){var e=this,n=t.target.value;console.log("change: ",n),n.length>0&&(this.list.items.push({text:n,isDone:!1}),this.$refs.lastInput.value="",this.itemRefs=[],Object(i["k"])((function(){e.itemRefs[e.itemRefs.length-1].focus()})))}},watch:{listType:function(t){""!==t&&this.getListFromServer(t)}}};n("ac8a");Qt.render=Yt,Qt.__scopeId="data-v-680df77a";var Gt=Qt,Kt={name:"btdMainComponent",components:{btdHeader:B,btdLoadingBody:V,btdNoListsFiller:Ht,btdList:Et,btdEditDefaultModal:Gt},data:function(){return{selectedDate:d.a.getToday(),lists:null}},inject:["authToken"],methods:{refreshList:function(){this.getListsFromServer(this.selectedDate)},dayChosen:function(t){this.selectedDate=t},getListsFromServer:function(t){var e=this;St.a.getListsForDate(this.authToken.value,t,(function(n){e.selectedDate===t&&(e.lists=n.data)}))},displayEditDefaultList:function(t){this.$refs.editDefaultModal.show(t)},checkIfListDone:function(t){this.lists[t].isDone=this.lists[t].items.every((function(t){return t.isDone}))},pushListToServer:function(t){St.a.pushListToServer(this.authToken.value,t)},listUpdate:function(t,e){var n=this,i=e.type,A=this.lists[t].id;if("itemDoneUpdate"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.find((function(t){return e.id===t.id})).isDone=e.val})),this.checkIfListDone(t);else if("itemDeleted"===i){var o=e.itemIds.map((function(e){return n.lists[t].items.findIndex((function(t){return t.id===e}))}));o.sort((function(t,e){return e-t})),o.forEach((function(e){return n.lists[t].items.splice(e,1)})),this.checkIfListDone(t)}else if("itemEdited"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.find((function(t){return e.id===t.id})).text=e.val}));else if("itemAdded"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.push({text:e.val,isDone:!1,id:n.lists[t].items.reduceRight((function(t,e){return Math.max(t,e.id)}),0)+1})})),this.checkIfListDone(t);else if("listSkippedUpdate"===i)this.lists[t].isSkipped=e.isSkipped;else{if("loadDefaultList"===i)return St.a.getDefaultList(this.authToken.value,A,(function(e){console.log(e),n.lists[t]=e.data})),void St.a.deleteListFromServer(this.authToken.value,A);if("itemMovedToList"!==i)return"editDefaultList"===i?void this.displayEditDefaultList(this.lists[t].id.split("_")[0]):void console.log("unknown list update,",i);var s=this.lists[t].items.findIndex((function(t){return t.id===e.itemId}));St.a.addItemToList(this.authToken.value,this.lists[t].items[s],St.a.siblingListId(this.authToken.value,this.lists[t].id,e.moveAmt)),this.lists[t].items.splice(s,1),this.checkIfListDone(t)}this.pushListToServer(this.lists[t])}},watch:{selectedDate:function(t){this.getListsFromServer(t)}},mounted:function(){this.getListsFromServer(this.selectedDate)}};n("1acd");Kt.render=c,Kt.__scopeId="data-v-87f2f1ca";var $t=Kt,Jt=n("bc3a"),Zt=n.n(Jt),te=n("cf05"),ee=n.n(te),ne={id:"btd-login"},ie=Object(i["i"])("img",{src:ee.a},null,-1),Ae={id:"login-form"},oe=Object(i["h"])(" Email:"),se=Object(i["i"])("br",null,null,-1),ae=Object(i["h"])(" Password:"),ce=Object(i["i"])("br",null,null,-1);function re(t,e,n,A,o,s){return Object(i["l"])(),Object(i["f"])("div",ne,[ie,Object(i["i"])("div",Ae,[oe,Object(i["w"])(Object(i["i"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return o.email=t})},null,512),[[i["v"],o.email]]),se,ae,Object(i["w"])(Object(i["i"])("input",{type:"password","onUpdate:modelValue":e[2]||(e[2]=function(t){return o.pwd=t})},null,512),[[i["v"],o.pwd]]),ce,Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.createAccount&&s.createAccount.apply(s,arguments)})},"Create Account"),Object(i["i"])("button",{onClick:e[4]||(e[4]=function(){return s.login&&s.login.apply(s,arguments)})},"Login")])])}var de=n("1da1"),ue=(n("96cf"),{name:"btdLogin",components:{},emits:["setAuthToken"],data:function(){return{email:"",pwd:""}},methods:{createAccount:function(){var t=this;return Object(de["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,St.a.getHash(t.pwd);case 2:n=e.sent,St.a.createAccount(t.email,n,t.createAccountCallback);case 4:case"end":return e.stop()}}),e)})))()},createAccountCallback:function(t){t.data.success&&this.login()},login:function(){var t=this;return Object(de["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,St.a.getHash(t.pwd);case 2:n=e.sent,St.a.login(t.email,n,t.loginCallback);case 4:case"end":return e.stop()}}),e)})))()},loginCallback:function(t){t.data.success&&this.$emit("setAuthToken",{loggedIn:!0,auth_token:t.data.auth_token})}}});ue.render=re;var le=ue,fe={name:"App",components:{btdMainComponent:$t,BtdLogin:le},data:function(){return{msg:"Loading",authInfo:{loggedIn:!1,atkn:""}}},provide:function(){var t=this;return{authToken:Object(i["d"])((function(){return t.authInfo.atkn}))}},methods:{setAuthToken:function(t){t.loggedIn?(this.authInfo.atkn=t.auth_token,console.log("setting authtoken",this.authInfo.atkn),document.cookie="atkn=".concat(this.authInfo.atkn," ; expires=").concat(t.expireDate),console.log("cookie: ",document.cookie)):(this.authInfo.atkn="",document.cookie='atkn="" ; expires=""',console.log("cookie: ",document.cookie)),this.authInfo.loggedIn=t.loggedIn}},created:function(){var t=this;document.cookie.split(";").some((function(t){return t.trim().startsWith("atkn=")}))&&(this.authInfo.atkn=document.cookie.split(";").find((function(t){return t.trim().startsWith("atkn=")})).split("=")[1],this.authInfo.atkn.length>0?St.a.checkAuthToken(this.authInfo.atkn,(function(e){e.data.success&&e.data.authenticated?t.authInfo.loggedIn=!0:t.authInfo.loggedIn=!1})):this.authInfo.loggedIn=!1)},mounted:function(){var t=this;Zt.a.get("/api/v1/test").then((function(e){t.msg=e.data.body}))}};n("1bf6");fe.render=o;var pe=fe,me=n("3ebd"),be=Object(i["e"])(pe);be.use(me["a"]),be.mount("#app")},6179:function(t,e,n){},"6a23":function(t,e,n){},"6fae":function(t,e,n){"use strict";n("d634")},"745a":function(t,e,n){var i=n("c973").default;n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("ac1f"),n("1276");var A=n("bc3a"),o="/api/v1/",s=n("1ff6");t.exports={getListsForDate:function(t,e,n){var i={auth_token:t},a=new URLSearchParams(i),c=o+"list/"+s.apiDateStr(e)+"?".concat(a);A.get(c).then((function(t){n(t)}))},pushListToServer:function(t,e){var n={auth_token:t},i=new URLSearchParams(n),s=o+"list/"+e.id+"?".concat(i);A.put(s,e)},getDefaultList:function(t,e,n){var i={auth_token:t},s=new URLSearchParams(i),a=o+"list/default/"+e+"?".concat(s);A.get(a).then((function(t){n(t)}))},deleteListFromServer:function(t,e){var n={auth_token:t},i=new URLSearchParams(n),s=o+"list/"+e+"?".concat(i);A.delete(s)},siblingListId:function(t,e){var n=t.split("_")[0],i="week"===n?7:1,A=s.getDateFromIdStr(t.split("_")[1]),o=new Date(A);return o.setDate(o.getDate()+e*i),n+"_"+s.apiDateStr(o)},addItemToList:function(t,e,n){var i={auth_token:t},s=new URLSearchParams(i),a=o+"list/append_item/"+n+"?".concat(s);A.put(a,e)},createAccount:function(t,e,n){var i={email:t,hpw:e},s=new URLSearchParams(i),a=o+"createUser"+"?".concat(s);A.get(a).then(n)},login:function(t,e,n){var i={email:t,hpw:e},s=new URLSearchParams(i),a=o+"login"+"?".concat(s);A.get(a).then(n)},getHash:function(t){return i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})))()},checkAuthToken:function(t,e){return i(regeneratorRuntime.mark((function n(){var i,s,a,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i={tkn:t},s=new URLSearchParams(i),a=o+"checktkn"+"?".concat(s),void 0===e){n.next=7;break}A.get(a).then(e),n.next=11;break;case 7:return n.next=9,A.get(a);case 9:return c=n.sent,n.abrupt("return",c);case 11:case"end":return n.stop()}}),n)})))()}}},"8ee0":function(t,e,n){},a82b:function(t,e,n){t.exports=n.p+"img/curved-arrow.46a16da5.png"},a9e3:function(t,e,n){t.exports=n.p+"img/down-arrow-red.af94d081.png"},ac8a:function(t,e,n){"use strict";n("d884")},b5cf:function(t,e,n){},b758:function(t,e,n){t.exports=n.p+"img/ellipsis.870e98e0.png"},be94:function(t,e,n){},cf05:function(t,e,n){t.exports=n.p+"img/logo.0925a94a.png"},cfe8:function(t,e,n){},d634:function(t,e,n){},d884:function(t,e,n){},f0c8:function(t,e,n){t.exports=n.p+"img/check.84313a08.png"},f416:function(t,e,n){"use strict";n("8ee0")}});
//# sourceMappingURL=app.6e4f8847.js.map