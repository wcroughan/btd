(function(t){function e(e){for(var i,s,c=e[0],r=e[1],d=e[2],l=0,f=[];l<c.length;l++)s=c[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,c=1;c<n.length;c++){var r=n[c];0!==o[r]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},o={app:0},a=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var u=r;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"052d":function(t,e,n){"use strict";n("3b92")},"121a":function(t,e,n){"use strict";n("25d0")},"18f2":function(t,e,n){"use strict";n("b5cf")},"1a16":function(t,e,n){},"1acd":function(t,e,n){"use strict";n("37f2")},"1bf6":function(t,e,n){"use strict";n("cfe8")},"1ff6":function(t,e,n){n("a15b"),n("d81d"),n("fb6a"),t.exports={gimmeString:function(){return"hai!"},getToday:function(){var t=new Date;return t.setHours(0,0,0,0),t},dayOfWeekShortAbbr:function(t){var e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return e[t.getDay()]},formatDateOld:function(t,e,n){function i(e){var n=new Intl.DateTimeFormat("en",e);return n.format(t)}return e.map(i).join(n)},tomorrow:function(t){var e=new Date(t);return e.setDate(e.getDate()+1),e},yesterday:function(t){var e=new Date(t);return e.setDate(e.getDate()-1),e},getMonday:function(t){var e=new Date(t),n=e.getDay(),i=e.getDate()-n+(0==n?-6:1);return e.setDate(i),e},plusOneWeek:function(t){var e=new Date(t);return e.setDate(e.getDate()+7),e},apiDateStr:function(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2)},getDateFromIdStr:function(t){var e=parseInt(t.substring(0,4)),n=parseInt(t.substring(4,6))-1,i=parseInt(t.substring(6,8)),o=new Date(e,n,i,0,0,0,0);return o}}},"252d":function(t,e,n){"use strict";n("6a23")},"25d0":function(t,e,n){},"25ec":function(t,e,n){},"37f2":function(t,e,n){},"3b92":function(t,e,n){},"3de4":function(t,e,n){t.exports=n.p+"img/fire.d0e39b25.png"},"433b":function(t,e,n){},"4fa9":function(t,e,n){"use strict";n("433b")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),o={id:"app"};function a(t,e,n,a,s,c){var r=Object(i["q"])("btd-main-component"),d=Object(i["q"])("btd-login");return Object(i["l"])(),Object(i["f"])("div",o,[s.authInfo.loggedIn?(Object(i["l"])(),Object(i["f"])(r,{key:0})):Object(i["g"])("",!0),s.authInfo.loggedIn?Object(i["g"])("",!0):(Object(i["l"])(),Object(i["f"])(d,{key:1,onSetAuthToken:c.setAuthToken},null,8,["onSetAuthToken"]))])}n("99af"),n("ac1f"),n("1276"),n("2ca0"),n("498a"),n("7db0");var s=Object(i["x"])("data-v-87f2f1ca");Object(i["n"])("data-v-87f2f1ca");var c={class:"btd-main-component"};Object(i["m"])();var r=s((function(t,e,n,o,a,s){var r=Object(i["q"])("btd-header"),d=Object(i["q"])("btd-loading-body"),u=Object(i["q"])("btd-no-lists-filler"),l=Object(i["q"])("btd-list"),f=Object(i["q"])("btd-edit-default-modal");return Object(i["l"])(),Object(i["f"])("div",c,[Object(i["i"])(r,{date:a.selectedDate,onDayChosen:e[1]||(e[1]=function(t){return s.dayChosen(t)})},null,8,["date"]),null===a.lists?(Object(i["l"])(),Object(i["f"])(d,{key:0})):Object(i["g"])("",!0),null!==a.lists&&0==a.lists.length?(Object(i["l"])(),Object(i["f"])(u,{key:1})):Object(i["g"])("",!0),(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(a.lists,(function(t,e){return Object(i["l"])(),Object(i["f"])(l,{key:t.id,list:t,onListUpdate:function(t){return s.listUpdate(e,t)}},null,8,["list","onListUpdate"])})),128)),Object(i["i"])(f,{ref:"editDefaultModal",onEditMade:s.refreshList},null,8,["onEditMade"])])})),d=(n("159b"),n("d81d"),n("c740"),n("a434"),n("1ff6")),u=n.n(d),l=Object(i["x"])("data-v-6d12e0ca");Object(i["n"])("data-v-6d12e0ca");var f={class:"btd-header"};Object(i["m"])();var p=l((function(t,e,n,o,a,s){var c=Object(i["q"])("btd-day-display"),r=Object(i["q"])("btd-streak-info");return Object(i["l"])(),Object(i["f"])("div",f,[Object(i["i"])(c,{date:n.date,onDayChosen:e[1]||(e[1]=function(t){return s.dayChosen(t)})},null,8,["date"]),Object(i["i"])("button",{class:"today-button",onClick:e[2]||(e[2]=function(){return s.todayClicked&&s.todayClicked.apply(s,arguments)})},"Today"),Object(i["i"])(r)])})),m=n("a9e3"),b=n.n(m),h=Object(i["x"])("data-v-e1b9c5f8");Object(i["n"])("data-v-e1b9c5f8");var v={class:"btd-day-display"},O={class:"date-text"};Object(i["m"])();var g=h((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",v,[Object(i["i"])("img",{src:b.a,onClick:e[1]||(e[1]=function(){return s.yesterdayClicked&&s.yesterdayClicked.apply(s,arguments)}),alt:"Yesterday",class:"left-arrow arrow"}),Object(i["i"])("span",O,Object(i["t"])(s.dateText),1),Object(i["i"])("img",{src:b.a,onClick:e[2]||(e[2]=function(){return s.tomorrowClicked&&s.tomorrowClicked.apply(s,arguments)}),alt:"Tomorrow",class:"right-arrow arrow"})])})),j={name:"btdDayDisplay",data:function(){return{}},props:{date:Date},emits:["dayChosen"],computed:{dateText:function(){var t=[{year:"numeric"},{month:"numeric"},{day:"numeric"}];return u.a.formatDateOld(this.date,t,"/")}},methods:{yesterdayClicked:function(){var t=u.a.yesterday(this.date);this.$emit("dayChosen",t)},tomorrowClicked:function(){this.$emit("dayChosen",u.a.tomorrow(this.date))}}};n("121a");j.render=g,j.__scopeId="data-v-e1b9c5f8";var k=j,y=n("3de4"),D=n.n(y),I=Object(i["x"])("data-v-5e67f302");Object(i["n"])("data-v-5e67f302");var w={class:"btd-streak-info"};Object(i["m"])();var C=I((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",w,[Object(i["i"])("img",{class:["fire-img",{greyed:0===a.streakLength}],src:D.a,alt:"streak"},null,2),Object(i["h"])(" "+Object(i["t"])(a.streakLength),1)])})),L=(n("a9e3d"),{name:"btdStreakInfo",data:function(){return{streakLength:0}},props:{updateFlag:Number},emits:["updateDone"],watch:{updateFlag:function(t){t>0&&console.log("time to update the streak!")}}});n("252d");L.render=C,L.__scopeId="data-v-5e67f302";var T=L,x={name:"btdHeader",data:function(){return{}},components:{BtdDayDisplay:k,BtdStreakInfo:T},props:{scrollInfo:null,date:Date},emits:["dayChosen"],methods:{dayChosen:function(t){this.$emit("dayChosen",t)},todayClicked:function(){this.dayChosen(u.a.getToday())}}};n("68a9");x.render=p,x.__scopeId="data-v-6d12e0ca";var S=x,E=Object(i["x"])("data-v-23228dfb");Object(i["n"])("data-v-23228dfb");var _={class:"btd-loading-body"};Object(i["m"])();var M=E((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",_,"Loading...")})),U={name:"btdLoadingBody",data:function(){return{}}};U.render=M,U.__scopeId="data-v-23228dfb";var A=U,$=Object(i["x"])("data-v-2978ee9c");Object(i["n"])("data-v-2978ee9c");var B={class:"btd-list"},R={class:"list-body"},F={class:"list-footer"},P=Object(i["h"])("+ Add Item"),H={key:0,class:"completed-container"};Object(i["m"])();var q=$((function(t,e,n,o,a,s){var c=Object(i["q"])("btd-list-header"),r=Object(i["q"])("btd-list-item");return Object(i["l"])(),Object(i["f"])("div",B,[Object(i["i"])(c,{title:s.title,numItems:n.list.items.length,numComplete:s.numComplete,isSkipped:n.list.isSkipped,onUpdateSkipped:s.updateSkipped,onSetAllDone:s.setAllDone,onLoadDefaultList:s.loadDefaultList,onEditDefaultList:s.editDefaultList},null,8,["title","numItems","numComplete","isSkipped","onUpdateSkipped","onSetAllDone","onLoadDefaultList","onEditDefaultList"]),Object(i["i"])("div",R,[Object(i["i"])(i["c"],{name:"list"},{default:$((function(){return[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(s.itemsNotDone,(function(t){return Object(i["l"])(),Object(i["f"])(r,{class:["list-item",t.isDone?"done-item":"pending-item"],key:n.list.id+"_"+t.id+"_nd",text:t.text,isDone:t.isDone,onItemDoneUpdate:function(e){return s.itemDoneUpdate(t.id,e)},onItemDeleted:function(e){return s.itemDeleted(t.id)},onItemMoved:function(e){return s.itemMoved(t.id,e)},onItemEdited:function(e){return s.itemEdited(t.id,e)}},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited","class"])})),128))]})),_:1}),Object(i["i"])("div",F,[(Object(i["l"])(),Object(i["f"])(Object(i["s"])(a.isAddingItem?"btd-item-title-edit":"button"),Object(i["j"])({class:["add-item-button",a.isAddingItem?"growedit":""]},Object(i["u"])(a.isAddingItem?{}:{click:s.addItemClicked}),{onDoneEditing:s.doneEditing,onCanceledEditing:s.canceledEditing,key:"list.id + '_-1'"}),{default:$((function(){return[P]})),_:1},16,["class","onDoneEditing","onCanceledEditing"])),Object(i["i"])("button",{onClick:e[1]||(e[1]=function(t){return a.showCompleted=!a.showCompleted}),class:"show-completed-button"},Object(i["t"])(a.showCompleted?"Hide Completed":"Show Completed (".concat(s.itemsDone.length,")")),1)]),a.showCompleted?(Object(i["l"])(),Object(i["f"])("div",H,[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(s.itemsDone,(function(t){return Object(i["l"])(),Object(i["f"])(r,{key:n.list.id+"_"+t.id+"_nd",text:t.text,isDone:t.isDone,onItemDoneUpdate:function(e){return s.itemDoneUpdate(t.id,e)},onItemDeleted:function(e){return s.itemDeleted(t.id)},onItemMoved:function(e){return s.itemMoved(t.id,e)},onItemEdited:function(e){return s.itemEdited(t.id,e)},class:"done-item"},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited"])})),128))])):Object(i["g"])("",!0)])])})),N=n("2909"),W=(n("4de4"),n("d3b7"),n("ddb0"),n("f0c8")),V=n.n(W),Y=n("a82b"),J=n.n(Y),K=Object(i["x"])("data-v-53b7ff83");Object(i["n"])("data-v-53b7ff83");var z={class:"header-title"},G={class:"header-info-container"},Q={class:"completion-container"},X={key:0,class:"header-info"},Z={key:1,src:V.a,class:"checkimg"},tt={key:0,class:"skipped-icon",alt:"Skipped",src:J.a},et=Object(i["i"])("div",{class:"header-info-spacer-vert"},null,-1),nt=Object(i["i"])("div",{class:"header-spacer"},null,-1),it={class:"options-button-container"};Object(i["m"])();var ot=K((function(t,e,n,o,a,s){var c=Object(i["q"])("btd-options-button");return Object(i["l"])(),Object(i["f"])("div",{onMouseenter:e[5]||(e[5]=function(t){return a.mouseIn=!0}),onMouseleave:e[6]||(e[6]=function(t){return a.mouseIn=!1}),class:"btd-list-header"},[Object(i["i"])("h1",z,Object(i["t"])(n.title),1),Object(i["i"])("div",G,[Object(i["i"])("div",Q,[Object(i["i"])(i["b"],{name:"completion-status",mode:"out-in"},{default:K((function(){return[s.isComplete?(Object(i["l"])(),Object(i["f"])("img",Z)):(Object(i["l"])(),Object(i["f"])("span",X,Object(i["t"])(n.numComplete)+"/"+Object(i["t"])(n.numItems),1))]})),_:1})]),n.isSkipped?(Object(i["l"])(),Object(i["f"])("img",tt)):Object(i["g"])("",!0),et]),nt,Object(i["i"])(c,{class:"list-options",ref:"optionsButton",mouseHovering:a.mouseIn},{default:K((function(){return[Object(i["i"])("div",it,[Object(i["i"])("button",{class:"options-button",onClick:e[1]||(e[1]=function(){return s.skipButtonClicked&&s.skipButtonClicked.apply(s,arguments)})},"Skip"),Object(i["i"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return s.markAllClicked&&s.markAllClicked.apply(s,arguments)})},Object(i["t"])(s.markAllText),1),Object(i["i"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return s.loadDefaultClicked&&s.loadDefaultClicked.apply(s,arguments)})}," Load Default List "),Object(i["i"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return s.editDefaultClicked&&s.editDefaultClicked.apply(s,arguments)})}," Edit Default List ")])]})),_:1},8,["mouseHovering"])],32)})),at=n("b758"),st=n.n(at),ct=Object(i["x"])("data-v-f0454d76");Object(i["n"])("data-v-f0454d76");var rt={class:"options-button-container"};Object(i["m"])();var dt=ct((function(t,e,n,o,a,s){var c=Object(i["r"])("click-away");return Object(i["l"])(),Object(i["f"])("div",rt,[Object(i["w"])(Object(i["i"])("img",{src:st.a,class:["main-button",s.displayOptionsButton?"visible-button":"hidden-button"],onClick:e[1]||(e[1]=function(){return s.optionsClicked&&s.optionsClicked.apply(s,arguments)})},null,2),[[c,s.clickNotOnOptionsButton]]),Object(i["i"])("div",{class:["non-menu-mask",{"visible-mask":a.displayDropdownOptions}]},null,2),Object(i["i"])("div",{class:["dropdown-content",{"visible-dropdown":a.displayDropdownOptions}]},[Object(i["p"])(t.$slots,"default",{},void 0,!0)],2)])})),ut=(n("caad"),n("2532"),{name:"btdListItem",data:function(){return{displayDropdownOptions:!1}},props:{mouseHovering:Boolean},computed:{displayOptionsButton:function(){return this.mouseHovering||this.displayDropdownOptions}},methods:{clickNotOnOptionsButton:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("dropdown-content")}))||(this.displayDropdownOptions=!1)},optionsClicked:function(){this.displayDropdownOptions=!this.displayDropdownOptions},hideMenu:function(){this.displayDropdownOptions=!1}}});n("c299");ut.render=dt,ut.__scopeId="data-v-f0454d76";var lt=ut,ft={name:"btdListHeader",components:{btdOptionsButton:lt},data:function(){return{mouseIn:!1}},props:{numItems:Number,numComplete:Number,isSkipped:Boolean,title:String},emits:["updateSkipped","setAllDone","loadDefaultList","editDefaultList"],computed:{isComplete:function(){return this.numItems===this.numComplete},markAllText:function(){return this.isComplete?"Mark all incomplete":"Mark all complete"}},methods:{skipButtonClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("updateSkipped",!this.isSkipped)},markAllClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("setAllDone",!this.isComplete)},loadDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("loadDefaultList")},editDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("editDefaultList")}}};n("6fae");ft.render=ot,ft.__scopeId="data-v-53b7ff83";var pt=ft,mt=Object(i["x"])("data-v-667a0446");Object(i["n"])("data-v-667a0446");var bt={class:"options-button-container"};Object(i["m"])();var ht=mt((function(t,e,n,o,a,s){var c=Object(i["q"])("btd-options-button");return Object(i["l"])(),Object(i["f"])("div",{class:"btd-list-item",onMouseenter:e[5]||(e[5]=function(t){return a.mouseIn=!0}),onMouseleave:e[6]||(e[6]=function(t){return a.mouseIn=!1})},[(Object(i["l"])(),Object(i["f"])(Object(i["s"])(s.itemTitleComponentType),{class:"todo-item-title",ref:"itemText",onClick:s.textClicked,text:n.text,isDone:n.isDone,onDoneEditing:s.doneEditing,onCanceledEditing:s.canceledEditing},null,8,["onClick","text","isDone","onDoneEditing","onCanceledEditing"])),Object(i["i"])(c,{ref:"itemOptionsMenu",mouseHovering:a.mouseIn},{default:mt((function(){return[Object(i["i"])("div",bt,[Object(i["i"])("button",{class:"options-button",onClick:e[1]||(e[1]=function(){return s.editButtonClicked&&s.editButtonClicked.apply(s,arguments)})},"edit"),Object(i["i"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return s.deleteButtonClicked&&s.deleteButtonClicked.apply(s,arguments)})}," delete "),Object(i["i"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return s.moveToYesterdayClicked&&s.moveToYesterdayClicked.apply(s,arguments)})}," move to yesterday "),Object(i["i"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return s.moveToTomorrowClicked&&s.moveToTomorrowClicked.apply(s,arguments)})}," move to tomorrow ")])]})),_:1},8,["mouseHovering"])],32)})),vt=Object(i["x"])("data-v-204c4056");Object(i["n"])("data-v-204c4056");var Ot={class:"item-title-display"};Object(i["m"])();var gt=vt((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",Ot,[Object(i["i"])("span",{class:["title-display-text",{strike:n.isDone}],onMousedown:e[1]||(e[1]=function(){return s.mousedown&&s.mousedown.apply(s,arguments)})},"   "+Object(i["t"])(n.text)+"  ",35)])})),jt={name:"btdItemTitleDisplay",data:function(){return{}},props:{text:String,isDone:Boolean},computed:{itemTitleComponentType:function(){return this.isDone?"s":"b"}},methods:{mousedown:function(t){t.preventDefault()}}};n("18f2");jt.render=gt,jt.__scopeId="data-v-204c4056";var kt=jt,yt=Object(i["x"])("data-v-0cca25c8");Object(i["n"])("data-v-0cca25c8");var Dt={class:"btd-item-title-edit"};Object(i["m"])();var It=yt((function(t,e,n,o,a,s){var c=Object(i["r"])("click-away");return Object(i["l"])(),Object(i["f"])("div",Dt,[Object(i["w"])(Object(i["i"])("input",{ref:"inputField",class:"item-title-edit-input","onUpdate:modelValue":e[1]||(e[1]=function(t){return a.currentText=t}),onKeydown:e[2]||(e[2]=function(){return s.keylistener&&s.keylistener.apply(s,arguments)})},null,544),[[c,s.clickAway],[i["v"],a.currentText]]),Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.doneEditing&&s.doneEditing.apply(s,arguments)})},"Save"),Object(i["i"])("button",{onClick:e[4]||(e[4]=function(){return s.cancelEditing&&s.cancelEditing.apply(s,arguments)})},"Cancel")])})),wt={name:"btdItemTitleEdit",data:function(){return{currentText:this.text}},props:{text:String},emits:["doneEditing","canceledEditing"],methods:{focusInput:function(){this.$refs.inputField.focus(),this.$refs.inputField.select()},doneEditing:function(){this.$emit("doneEditing",this.currentText)},cancelEditing:function(){this.$emit("canceledEditing",this.currentText)},clickAway:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("btd-item-title-edit")}))||this.doneEditing()},keylistener:function(t){"Escape"===t.key?this.escapePressed():"Enter"===t.key&&this.enterPressed()},enterPressed:function(){this.doneEditing()},escapePressed:function(){this.cancelEditing()}},mounted:function(){this.focusInput()}};n("f416");wt.render=It,wt.__scopeId="data-v-0cca25c8";var Ct=wt,Lt=n("5c40"),Tt={components:{btdOptionsButton:lt,btdItemTitleDisplay:kt,btdItemTitleEdit:Ct},name:"btdListItem",data:function(){return{mouseIn:!1,isEditing:!1}},props:{text:String,isDone:Boolean},emits:["itemDoneUpdate","itemDeleted","itemMoved","itemEdited"],computed:{itemTitleComponentType:function(){return this.isEditing?"btd-item-title-edit":"btd-item-title-display"}},methods:{handleCheckbox:function(t){this.$emit("itemDoneUpdate",t.target.checked)},textClicked:function(){this.isEditing||this.$emit("itemDoneUpdate",!this.isDone)},titleClickAway:function(){this.isEditing=!1},deleteButtonClicked:function(){var t=this;this.$refs.itemOptionsMenu.hideMenu(),Object(Lt["q"])((function(){t.$emit("itemDeleted")}))},moveToYesterdayClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",-1)},moveToTomorrowClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",1)},editButtonClicked:function(){this.isEditing=!this.isEditing,this.isEditing?(console.log("hi"),console.log(this.$refs.itemText),this.$refs.itemOptionsMenu.hideMenu()):console.log("this shouldn't happen")},doneEditing:function(t){this.isEditing=!1,this.$emit("itemEdited",t)},canceledEditing:function(){this.isEditing=!1}}};n("4fa9");Tt.render=ht,Tt.__scopeId="data-v-667a0446";var xt=Tt,St={name:"btdList",components:{BtdListHeader:pt,BtdListItem:xt,btdItemTitleEdit:Ct},data:function(){return{isAddingItem:!1,testitems:[1,2,3,4,5],showCompleted:!1}},props:{list:Object},emits:["listUpdate"],computed:{itemsDone:function(){return this.list.items.filter((function(t){return t.isDone}))},itemsNotDone:function(){return this.list.items.filter((function(t){return!t.isDone}))},title:function(){var t=this.list.id;if("day_"===t.substring(0,4)){var e={weekday:"short",month:"short",day:"numeric"};return new Intl.DateTimeFormat("en-US",e).format(new Date(this.list.start))}if("week_"===t.substring(0,5)){var n={month:"numeric",day:"numeric"},i=new Intl.DateTimeFormat("en-US",n);return i.format(new Date(this.list.start))+" - "+i.format(new Date(this.list.end)-1)}return t},numComplete:function(){return this.list.items.reduceRight((function(t,e){return e.isDone?t+1:t+0}),0)}},methods:{itemDoneUpdate:function(t,e){var n={type:"itemDoneUpdate",itemUpdates:[{id:t,val:e}]};this.$emit("listUpdate",n)},itemDeleted:function(t){this.$emit("listUpdate",{type:"itemDeleted",itemIds:[t]})},itemMoved:function(t,e){this.$emit("listUpdate",{type:"itemMovedToList",itemId:t,moveAmt:e})},itemEdited:function(t,e){var n={type:"itemEdited",itemUpdates:[{id:t,val:e}]};this.$emit("listUpdate",n)},addItemClicked:function(){this.isAddingItem||(this.isAddingItem=!0)},doneEditing:function(t){var e=this,n={type:"itemAdded",itemUpdates:[{val:t}]};this.$emit("listUpdate",n),Object(i["k"])((function(){return e.isAddingItem=!1}))},canceledEditing:function(){var t=this;this.isAddingItem=!1,Object(i["k"])((function(){return t.isAddingItem=!1}))},updateSkipped:function(t){this.$emit("listUpdate",{type:"listSkippedUpdate",isSkipped:t})},setAllDone:function(t){var e=this,n={type:"itemDoneUpdate",itemUpdates:Object(N["a"])(Array(this.list.items.length).keys()).map((function(n){return{id:e.list.items[n].id,val:t}}))};this.$emit("listUpdate",n)},loadDefaultList:function(){this.$emit("listUpdate",{type:"loadDefaultList"})},editDefaultList:function(){this.$emit("listUpdate",{type:"editDefaultList"})}}};n("052d");St.render=q,St.__scopeId="data-v-2978ee9c";var Et=St,_t=n("745a"),Mt=n.n(_t),Ut=Object(i["x"])("data-v-2c214604");Object(i["n"])("data-v-2c214604");var At={class:"btd-no-lists-filler"};Object(i["m"])();var $t=Ut((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",At,"No lists")})),Bt={name:"btdNoListsFiller",data:function(){return{}}};Bt.render=$t,Bt.__scopeId="data-v-2c214604";var Rt=Bt,Ft=Object(i["x"])("data-v-680df77a");Object(i["n"])("data-v-680df77a");var Pt=Object(i["i"])("div",{class:"non-menu-mask"},null,-1),Ht={class:"modal-content"},qt={class:"modal-header"},Nt={class:"item-list"},Wt={class:"modal-footer"};Object(i["m"])();var Vt=Ft((function(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",{class:["modal-container",{"visible-container":a.displayModal}]},[Pt,Object(i["i"])("div",Ht,[Object(i["i"])("div",qt,[Object(i["i"])("h1",null,"Default "+Object(i["t"])("day"===a.listType?"Daily":"Weekly")+" List",1)]),Object(i["i"])("div",Nt,[(Object(i["l"])(!0),Object(i["f"])(i["a"],null,Object(i["o"])(a.list.items,(function(t,e){return Object(i["w"])((Object(i["l"])(),Object(i["f"])("input",{class:"item-input","onUpdate:modelValue":function(e){return t.text=e},key:e,ref:s.setItemRef,onBlur:function(t){return s.checkIfShouldDelete(e)}},null,40,["onUpdate:modelValue","onBlur"])),[[i["v"],t.text]])})),128)),Object(i["i"])("input",{ref:"lastInput",onInput:e[1]||(e[1]=function(){return s.lastInputChange&&s.lastInputChange.apply(s,arguments)})},null,544)]),Object(i["i"])("div",Wt,[Object(i["i"])("button",{onClick:e[2]||(e[2]=function(){return s.save&&s.save.apply(s,arguments)})},"Save"),Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.cancel&&s.cancel.apply(s,arguments)})},"Cancel")])])],2)})),Yt={name:"btdEditDefaultModal",components:{},data:function(){return{displayModal:!1,listType:"",list:{},itemRefs:[]}},inject:["authToken"],emits:["editMade"],methods:{setItemRef:function(t){t&&this.itemRefs.push(t)},checkIfShouldDelete:function(t){console.log("check if deleting ",t,"list items = ",this.list.items,"value",this.itemRefs[t].value,"len",this.itemRefs[t].value.length),0===this.itemRefs[t].value.length&&(this.itemRefs=[],this.list.items.splice(t,1))},show:function(t){console.log("showing modal with type",t),this.listType=t,this.displayModal=!0},save:function(){this.displayModal=!1,this.list.id=this.listType+"_default",this.list.items.forEach((function(t,e){t.isDone=!1,t.id=e})),console.log(this.list),Mt.a.pushListToServer(this.authToken.value,this.list),this.listType="",this.$emit("editMade")},cancel:function(){console.log("hiding modal"),this.displayModal=!1,this.listType=""},getListFromServer:function(t){var e=this;console.log("default editor getting list from server:",t),Mt.a.getDefaultList(this.authToken.value,t+"_edit",(function(t){console.log("got from server:",t),e.list=t.data}))},lastInputChange:function(t){var e=this,n=t.target.value;console.log("change: ",n),n.length>0&&(this.list.items.push({text:n,isDone:!1}),this.$refs.lastInput.value="",this.itemRefs=[],Object(i["k"])((function(){e.itemRefs[e.itemRefs.length-1].focus()})))}},watch:{listType:function(t){""!==t&&this.getListFromServer(t)}}};n("ac8a");Yt.render=Vt,Yt.__scopeId="data-v-680df77a";var Jt=Yt,Kt={name:"btdMainComponent",components:{btdHeader:S,btdLoadingBody:A,btdNoListsFiller:Rt,btdList:Et,btdEditDefaultModal:Jt},data:function(){return{selectedDate:u.a.getToday(),lists:null}},inject:["authToken"],methods:{refreshList:function(){this.getListsFromServer(this.selectedDate)},dayChosen:function(t){this.selectedDate=t},getListsFromServer:function(t){var e=this;Mt.a.getListsForDate(this.authToken.value,t,(function(n){e.selectedDate===t&&(e.lists=n.data)}))},displayEditDefaultList:function(t){this.$refs.editDefaultModal.show(t)},checkIfListDone:function(t){this.lists[t].isDone=this.lists[t].items.every((function(t){return t.isDone}))},pushListToServer:function(t){Mt.a.pushListToServer(this.authToken.value,t)},listUpdate:function(t,e){var n=this,i=e.type,o=this.lists[t].id;if("itemDoneUpdate"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.find((function(t){return e.id===t.id})).isDone=e.val})),this.checkIfListDone(t);else if("itemDeleted"===i){var a=e.itemIds.map((function(e){return n.lists[t].items.findIndex((function(t){return t.id===e}))}));a.sort((function(t,e){return e-t})),a.forEach((function(e){return n.lists[t].items.splice(e,1)})),this.checkIfListDone(t)}else if("itemEdited"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.find((function(t){return e.id===t.id})).text=e.val}));else if("itemAdded"===i)e.itemUpdates.forEach((function(e){return n.lists[t].items.push({text:e.val,isDone:!1,id:n.lists[t].items.reduceRight((function(t,e){return Math.max(t,e.id)}),0)+1})})),this.checkIfListDone(t);else if("listSkippedUpdate"===i)this.lists[t].isSkipped=e.isSkipped;else{if("loadDefaultList"===i)return Mt.a.getDefaultList(this.authToken.value,o,(function(e){console.log(e),n.lists[t]=e.data})),void Mt.a.deleteListFromServer(this.authToken.value,o);if("itemMovedToList"!==i)return"editDefaultList"===i?void this.displayEditDefaultList(this.lists[t].id.split("_")[0]):void console.log("unknown list update,",i);var s=this.lists[t].items.findIndex((function(t){return t.id===e.itemId}));Mt.a.addItemToList(this.authToken.value,this.lists[t].items[s],Mt.a.siblingListId(this.authToken.value,this.lists[t].id,e.moveAmt)),this.lists[t].items.splice(s,1),this.checkIfListDone(t)}this.pushListToServer(this.lists[t])}},watch:{selectedDate:function(t){this.getListsFromServer(t)}},mounted:function(){this.getListsFromServer(this.selectedDate)}};n("1acd");Kt.render=r,Kt.__scopeId="data-v-87f2f1ca";var zt=Kt,Gt=n("bc3a"),Qt=n.n(Gt),Xt=n("cf05"),Zt=n.n(Xt),te={id:"btd-login"},ee=Object(i["i"])("img",{src:Zt.a},null,-1),ne={id:"login-form"},ie=Object(i["h"])(" Email:"),oe=Object(i["i"])("br",null,null,-1),ae=Object(i["h"])(" Password:"),se=Object(i["i"])("br",null,null,-1);function ce(t,e,n,o,a,s){return Object(i["l"])(),Object(i["f"])("div",te,[ee,Object(i["i"])("div",ne,[ie,Object(i["w"])(Object(i["i"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return a.email=t})},null,512),[[i["v"],a.email]]),oe,ae,Object(i["w"])(Object(i["i"])("input",{type:"password","onUpdate:modelValue":e[2]||(e[2]=function(t){return a.pwd=t})},null,512),[[i["v"],a.pwd]]),se,Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return s.createAccount&&s.createAccount.apply(s,arguments)})},"Create Account"),Object(i["i"])("button",{onClick:e[4]||(e[4]=function(){return s.login&&s.login.apply(s,arguments)})},"Login")])])}var re=n("1da1"),de=(n("96cf"),{name:"btdLogin",components:{},emits:["setAuthToken"],data:function(){return{email:"",pwd:""}},methods:{createAccount:function(){var t=this;return Object(re["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Mt.a.getHash(t.pwd);case 2:n=e.sent,Mt.a.createAccount(t.email,n,t.createAccountCallback);case 4:case"end":return e.stop()}}),e)})))()},createAccountCallback:function(t){t.data.success&&this.login()},login:function(){var t=this;return Object(re["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Mt.a.getHash(t.pwd);case 2:n=e.sent,Mt.a.login(t.email,n,t.loginCallback);case 4:case"end":return e.stop()}}),e)})))()},loginCallback:function(t){t.data.success&&this.$emit("setAuthToken",{loggedIn:!0,auth_token:t.data.auth_token})}}});de.render=ce;var ue=de,le={name:"App",components:{btdMainComponent:zt,BtdLogin:ue},data:function(){return{msg:"Loading",authInfo:{loggedIn:!1,atkn:""}}},provide:function(){var t=this;return{authToken:Object(i["d"])((function(){return t.authInfo.atkn}))}},methods:{setAuthToken:function(t){t.loggedIn?(this.authInfo.atkn=t.auth_token,console.log("setting authtoken",this.authInfo.atkn),document.cookie="atkn=".concat(this.authInfo.atkn," ; expires=").concat(t.expireDate),console.log("cookie: ",document.cookie)):(this.authInfo.atkn="",document.cookie='atkn="" ; expires=""',console.log("cookie: ",document.cookie)),this.authInfo.loggedIn=t.loggedIn}},created:function(){var t=this;document.cookie.split(";").some((function(t){return t.trim().startsWith("atkn=")}))&&(this.authInfo.atkn=document.cookie.split(";").find((function(t){return t.trim().startsWith("atkn=")})).split("=")[1],this.authInfo.atkn.length>0?Mt.a.checkAuthToken(this.authInfo.atkn,(function(e){e.data.success&&e.data.authenticated?t.authInfo.loggedIn=!0:t.authInfo.loggedIn=!1})):this.authInfo.loggedIn=!1)},mounted:function(){var t=this;Qt.a.get("/api/v1/test").then((function(e){t.msg=e.data.body}))}};n("1bf6");le.render=a;var fe=le,pe=n("3ebd"),me=Object(i["e"])(fe);me.use(pe["a"]),me.mount("#app")},"68a9":function(t,e,n){"use strict";n("1a16")},"6a23":function(t,e,n){},"6fae":function(t,e,n){"use strict";n("d634")},"745a":function(t,e,n){var i=n("c973").default;n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("ac1f"),n("1276");var o=n("bc3a"),a="/api/v1/",s=n("1ff6");t.exports={getListsForDate:function(t,e,n){var i={auth_token:t},c=new URLSearchParams(i),r=a+"list/"+s.apiDateStr(e)+"?".concat(c);o.get(r).then((function(t){n(t)}))},pushListToServer:function(t,e){var n={auth_token:t},i=new URLSearchParams(n),s=a+"list/"+e.id+"?".concat(i);o.put(s,e)},getDefaultList:function(t,e,n){var i={auth_token:t},s=new URLSearchParams(i),c=a+"list/default/"+e+"?".concat(s);o.get(c).then((function(t){n(t)}))},deleteListFromServer:function(t,e){var n={auth_token:t},i=new URLSearchParams(n),s=a+"list/"+e+"?".concat(i);o.delete(s)},siblingListId:function(t,e){var n=t.split("_")[0],i="week"===n?7:1,o=s.getDateFromIdStr(t.split("_")[1]),a=new Date(o);return a.setDate(a.getDate()+e*i),n+"_"+s.apiDateStr(a)},addItemToList:function(t,e,n){var i={auth_token:t},s=new URLSearchParams(i),c=a+"list/append_item/"+n+"?".concat(s);o.put(c,e)},createAccount:function(t,e,n){var i={email:t,hpw:e},s=new URLSearchParams(i),c=a+"createUser"+"?".concat(s);o.get(c).then(n)},login:function(t,e,n){var i={email:t,hpw:e},s=new URLSearchParams(i),c=a+"login"+"?".concat(s);o.get(c).then(n)},getHash:function(t){return i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})))()},checkAuthToken:function(t,e){return i(regeneratorRuntime.mark((function n(){var i,s,c,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i={tkn:t},s=new URLSearchParams(i),c=a+"checktkn"+"?".concat(s),void 0===e){n.next=7;break}o.get(c).then(e),n.next=11;break;case 7:return n.next=9,o.get(c);case 9:return r=n.sent,n.abrupt("return",r);case 11:case"end":return n.stop()}}),n)})))()}}},"8ee0":function(t,e,n){},a82b:function(t,e,n){t.exports=n.p+"img/curved-arrow.46a16da5.png"},a9e3:function(t,e,n){t.exports=n.p+"img/down-arrow-red.af94d081.png"},ac8a:function(t,e,n){"use strict";n("d884")},b5cf:function(t,e,n){},b758:function(t,e,n){t.exports=n.p+"img/ellipsis.870e98e0.png"},c299:function(t,e,n){"use strict";n("25ec")},cf05:function(t,e,n){t.exports=n.p+"img/logo.0925a94a.png"},cfe8:function(t,e,n){},d634:function(t,e,n){},d884:function(t,e,n){},f0c8:function(t,e,n){t.exports=n.p+"img/check.84313a08.png"},f416:function(t,e,n){"use strict";n("8ee0")}});
//# sourceMappingURL=app.3b70969c.js.map