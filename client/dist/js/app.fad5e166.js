(function(t){function e(e){for(var i,c,a=e[0],d=e[1],r=e[2],l=0,p=[];l<a.length;l++)c=a[l],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&p.push(o[c][0]),o[c]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(t[i]=d[i]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,r||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,a=1;a<n.length;a++){var d=n[a];0!==o[d]&&(i=!1)}i&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var i={},o={app:0},s=[];function c(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=i,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)c.d(n,i,function(e){return t[e]}.bind(null,i));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],d=a.push.bind(a);a.push=e,a=a.slice();for(var r=0;r<a.length;r++)e(a[r]);var u=d;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"121a":function(t,e,n){"use strict";n("25d0")},1253:function(t,e,n){"use strict";n("b079")},"1ff6":function(t,e,n){n("a15b"),n("d81d"),n("fb6a"),t.exports={gimmeString:function(){return"hai!"},getToday:function(){var t=new Date;return t.setHours(0,0,0,0),t},dayOfWeekShortAbbr:function(t){var e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return e[t.getDay()]},formatDateOld:function(t,e,n){function i(e){console.log(e);var n=new Intl.DateTimeFormat("en",e);return n.format(t)}return e.map(i).join(n)},tomorrow:function(t){var e=new Date(t);return e.setDate(e.getDate()+1),e},yesterday:function(t){var e=new Date(t);return e.setDate(e.getDate()-1),e},getMonday:function(t){var e=new Date(t),n=e.getDay(),i=e.getDate()-n+(0==n?-6:1);return e.setDate(i),e},plusOneWeek:function(t){var e=new Date(t);return e.setDate(e.getDate()+7),e},apiDateStr:function(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2)},getDateFromIdStr:function(t){var e=parseInt(t.substring(0,4)),n=parseInt(t.substring(4,6))-1,i=parseInt(t.substring(6,8)),o=new Date(e,n,i,0,0,0,0);return console.log("converted",t,"into",o),o}}},"224f":function(t,e,n){},"252d":function(t,e,n){"use strict";n("6a23")},"25d0":function(t,e,n){},"3de4":function(t,e,n){t.exports=n.p+"img/fire.d0e39b25.png"},"463f":function(t,e,n){},"47c9":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),o={id:"app"};function s(t,e,n,s,c,a){var d=Object(i["n"])("btd-master-component");return Object(i["i"])(),Object(i["c"])("div",o,[Object(i["f"])(d)])}var c=Object(i["v"])("data-v-9b9ccbbe");Object(i["k"])("data-v-9b9ccbbe");var a={class:"btd-main-component"};Object(i["j"])();var d=c((function(t,e,n,o,s,c){var d=Object(i["n"])("btd-header"),r=Object(i["n"])("btd-loading-body"),u=Object(i["n"])("btd-no-lists-filler"),l=Object(i["n"])("btd-list");return Object(i["i"])(),Object(i["c"])("div",a,[Object(i["f"])(d,{date:s.selectedDate,onDayChosen:e[1]||(e[1]=function(t){return c.dayChosen(t)})},null,8,["date"]),null===s.lists?(Object(i["i"])(),Object(i["c"])(r,{key:0})):Object(i["d"])("",!0),null!==s.lists&&0==s.lists.length?(Object(i["i"])(),Object(i["c"])(u,{key:1})):Object(i["d"])("",!0),(Object(i["i"])(!0),Object(i["c"])(i["a"],null,Object(i["l"])(s.lists,(function(t,e){return Object(i["i"])(),Object(i["c"])(l,{key:t.id,list:t,onListUpdate:function(t){return c.listUpdate(e,t)}},null,8,["list","onListUpdate"])})),128))])})),r=(n("159b"),n("a434"),n("1ff6")),u=n.n(r),l=Object(i["v"])("data-v-35a5655e");Object(i["k"])("data-v-35a5655e");var p={class:"btd-header"};Object(i["j"])();var f=l((function(t,e,n,o,s,c){var a=Object(i["n"])("btd-day-display"),d=Object(i["n"])("btd-streak-info");return Object(i["i"])(),Object(i["c"])("div",p,[Object(i["f"])(a,{date:n.date,onDayChosen:e[1]||(e[1]=function(t){return c.dayChosen(t)})},null,8,["date"]),Object(i["f"])("button",{class:"today-button",onClick:e[2]||(e[2]=function(){return c.todayClicked&&c.todayClicked.apply(c,arguments)})},"Today"),Object(i["f"])(d)])})),b=n("a9e3"),m=n.n(b),v=Object(i["v"])("data-v-e1b9c5f8");Object(i["k"])("data-v-e1b9c5f8");var h={class:"btd-day-display"},O={class:"date-text"};Object(i["j"])();var j=v((function(t,e,n,o,s,c){return Object(i["i"])(),Object(i["c"])("div",h,[Object(i["f"])("img",{src:m.a,onClick:e[1]||(e[1]=function(){return c.yesterdayClicked&&c.yesterdayClicked.apply(c,arguments)}),alt:"Yesterday",class:"left-arrow arrow"}),Object(i["f"])("span",O,Object(i["q"])(c.dateText),1),Object(i["f"])("img",{src:m.a,onClick:e[2]||(e[2]=function(){return c.tomorrowClicked&&c.tomorrowClicked.apply(c,arguments)}),alt:"Tomorrow",class:"right-arrow arrow"})])})),k={name:"btdDayDisplay",data:function(){return{}},props:{date:Date},emits:["dayChosen"],computed:{dateText:function(){var t=[{year:"numeric"},{month:"numeric"},{day:"numeric"}];return u.a.formatDateOld(this.date,t,"/")}},methods:{yesterdayClicked:function(){var t=u.a.yesterday(this.date);this.$emit("dayChosen",t)},tomorrowClicked:function(){this.$emit("dayChosen",u.a.tomorrow(this.date))}}};n("121a");k.render=j,k.__scopeId="data-v-e1b9c5f8";var g=k,y=n("3de4"),D=n.n(y),C=Object(i["v"])("data-v-5e67f302");Object(i["k"])("data-v-5e67f302");var I={class:"btd-streak-info"};Object(i["j"])();var w=C((function(t,e,n,o,s,c){return Object(i["i"])(),Object(i["c"])("div",I,[Object(i["f"])("img",{class:["fire-img",{greyed:0===s.streakLength}],src:D.a,alt:"streak"},null,2),Object(i["e"])(" "+Object(i["q"])(s.streakLength),1)])})),E=(n("a9e3d"),{name:"btdStreakInfo",data:function(){return{streakLength:0}},props:{updateFlag:Number},emits:["updateDone"],watch:{updateFlag:function(t){t>0&&console.log("time to update the streak!")}}});n("252d");E.render=w,E.__scopeId="data-v-5e67f302";var L=E,x={name:"btdHeader",data:function(){return{}},components:{BtdDayDisplay:g,BtdStreakInfo:L},props:{scrollInfo:null,date:Date},emits:["dayChosen"],methods:{dayChosen:function(t){this.$emit("dayChosen",t)},todayClicked:function(){this.dayChosen(u.a.getToday())}}};n("1253");x.render=f,x.__scopeId="data-v-35a5655e";var T=x,S=Object(i["v"])("data-v-23228dfb");Object(i["k"])("data-v-23228dfb");var U={class:"btd-loading-body"};Object(i["j"])();var _=S((function(t,e,n,o,s,c){return Object(i["i"])(),Object(i["c"])("div",U,"Loading...")})),M={name:"btdLoadingBody",data:function(){return{}}};M.render=_,M.__scopeId="data-v-23228dfb";var $=M,A=Object(i["v"])("data-v-699802d4");Object(i["k"])("data-v-699802d4");var B={class:"btd-list"},F={class:"list-body"},N=Object(i["e"])("+ Add Item");Object(i["j"])();var H=A((function(t,e,n,o,s,c){var a=Object(i["n"])("btd-list-header"),d=Object(i["n"])("btd-list-item");return Object(i["i"])(),Object(i["c"])("div",B,[Object(i["f"])(a,{title:c.title,numItems:n.list.items.length,numComplete:c.numComplete,isSkipped:n.list.isSkipped,onUpdateSkipped:c.updateSkipped,onSetAllDone:c.setAllDone,onLoadDefaultList:c.loadDefaultList,onEditDefaultList:c.editDefaultList},null,8,["title","numItems","numComplete","isSkipped","onUpdateSkipped","onSetAllDone","onLoadDefaultList","onEditDefaultList"]),Object(i["f"])("div",F,[(Object(i["i"])(!0),Object(i["c"])(i["a"],null,Object(i["l"])(n.list.items,(function(t,e){return Object(i["i"])(),Object(i["c"])(d,{key:e,text:t.text,isDone:t.isDone,onItemDoneUpdate:function(t){return c.itemDoneUpdate(e,t)},onItemDeleted:function(t){return c.itemDeleted(e)},onItemMoved:function(t){return c.itemMoved(e,t)},onItemEdited:function(t){return c.itemEdited(e,t)},class:t.isDone?"done-item":"pending-item"},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited","class"])})),128)),(Object(i["i"])(),Object(i["c"])(Object(i["p"])(s.isAddingItem?"btd-item-title-edit":"button"),Object(i["g"])({class:"add-item-button"},Object(i["r"])(s.isAddingItem?{}:{click:c.addItemClicked}),{onDoneEditing:c.doneEditing,onCanceledEditing:c.canceledEditing}),{default:A((function(){return[N]})),_:1},16,["onDoneEditing","onCanceledEditing"]))])])})),P=n("2909"),q=(n("d81d"),n("d3b7"),n("ddb0"),n("a82b")),Y=n.n(q),W=Object(i["v"])("data-v-4c34bc60");Object(i["k"])("data-v-4c34bc60");var J={class:"header-title"},V={class:"header-info-container"},K={class:"header-info"},R={key:0,class:"skipped-icon",alt:"Skipped",src:Y.a},z=Object(i["f"])("div",{class:"header-info-spacer-vert"},null,-1),G=Object(i["f"])("div",{class:"header-spacer"},null,-1);Object(i["j"])();var Q=W((function(t,e,n,o,s,c){var a=Object(i["n"])("btd-options-button");return Object(i["i"])(),Object(i["c"])("div",{onMouseenter:e[6]||(e[6]=function(t){return s.mouseIn=!0}),onMouseleave:e[7]||(e[7]=function(t){return s.mouseIn=!1}),class:"btd-list-header"},[Object(i["f"])("h1",J,Object(i["q"])(n.title),1),Object(i["f"])("div",V,[Object(i["f"])("span",K,[Object(i["e"])(Object(i["q"])(n.numComplete)+"/"+Object(i["q"])(n.numItems)+" ",1),n.isSkipped?(Object(i["i"])(),Object(i["c"])("img",R)):Object(i["d"])("",!0)]),z]),G,Object(i["f"])(a,{class:"list-options",mouseHovering:s.mouseIn},{default:W((function(){return[Object(i["f"])("div",null,[Object(i["u"])(Object(i["f"])("input",{type:"checkbox","onUpdate:modelValue":e[1]||(e[1]=function(t){return s.skipChecked=t})},null,512),[[i["s"],s.skipChecked]]),Object(i["f"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return c.skipButtonClicked&&c.skipButtonClicked.apply(c,arguments)})},"Skip")]),Object(i["f"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return c.markAllClicked&&c.markAllClicked.apply(c,arguments)})},Object(i["q"])(c.markAllText),1),Object(i["f"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return c.loadDefaultClicked&&c.loadDefaultClicked.apply(c,arguments)})}," Load Default List "),Object(i["f"])("button",{class:"options-button",onClick:e[5]||(e[5]=function(){return c.editDefaultClicked&&c.editDefaultClicked.apply(c,arguments)})}," Edit Default List ")]})),_:1},8,["mouseHovering"])],32)})),X=n("b758"),Z=n.n(X),tt=Object(i["v"])("data-v-2d6efb01");Object(i["k"])("data-v-2d6efb01");var et={class:"options-button-container"};Object(i["j"])();var nt=tt((function(t,e,n,o,s,c){var a=Object(i["o"])("click-away");return Object(i["i"])(),Object(i["c"])("div",et,[Object(i["u"])(Object(i["f"])("img",{src:Z.a,class:["main-button",c.displayOptionsButton?"visible-button":"hidden-button"],onClick:e[1]||(e[1]=function(){return c.optionsClicked&&c.optionsClicked.apply(c,arguments)})},null,2),[[a,c.clickNotOnOptionsButton]]),Object(i["f"])("div",{class:["non-menu-mask",{"visible-mask":s.displayDropdownOptions}]},null,2),Object(i["f"])("div",{class:["dropdown-content",{"visible-dropdown":s.displayDropdownOptions}]},[Object(i["m"])(t.$slots,"default",{},void 0,!0)],2)])})),it=(n("caad"),n("2532"),{name:"btdListItem",data:function(){return{displayDropdownOptions:!1}},props:{mouseHovering:Boolean},computed:{displayOptionsButton:function(){return this.mouseHovering||this.displayDropdownOptions}},methods:{clickNotOnOptionsButton:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("dropdown-content")}))||(this.displayDropdownOptions=!1)},optionsClicked:function(){this.displayDropdownOptions=!this.displayDropdownOptions},hideMenu:function(){this.displayDropdownOptions=!1}}});n("a319");it.render=nt,it.__scopeId="data-v-2d6efb01";var ot=it,st={name:"btdListHeader",components:{btdOptionsButton:ot},data:function(){return{mouseIn:!1,skipChecked:this.isSkipped}},props:{numItems:Number,numComplete:Number,isSkipped:Boolean,title:String},emits:["updateSkipped","setAllDone","loadDefaultList","editDefaultList"],computed:{isComplete:function(){return this.numItems===this.numComplete},markAllText:function(){return this.isComplete?"Mark all incomplete":"Mark all complete"}},methods:{skipButtonClicked:function(){this.skipChecked=!this.skipChecked},markAllClicked:function(){this.$emit("setAllDone",!this.isComplete)},loadDefaultClicked:function(){this.$emit("loadDefaultList")},editDefaultClicked:function(){this.$emit("editDefaultList")}},watch:{skipChecked:function(t){this.$emit("updateSkipped",t)}}};n("d571");st.render=Q,st.__scopeId="data-v-4c34bc60";var ct=st,at=Object(i["v"])("data-v-4c8a79d5"),dt=at((function(t,e,n,o,s,c){var a=Object(i["n"])("btd-options-button");return Object(i["i"])(),Object(i["c"])("div",{class:"btd-list-item",onMouseenter:e[6]||(e[6]=function(t){return s.mouseIn=!0}),onMouseleave:e[7]||(e[7]=function(t){return s.mouseIn=!1})},[Object(i["f"])("input",{type:"checkbox",onChange:e[1]||(e[1]=function(t){return c.handleCheckbox(t)}),checked:n.isDone},null,40,["checked"]),(Object(i["i"])(),Object(i["c"])(Object(i["p"])(c.itemTitleComponentType),{class:"todo-item-title",ref:"itemText",onClick:c.textClicked,text:n.text,isDone:n.isDone,onDoneEditing:c.doneEditing,onCanceledEditing:c.canceledEditing},null,8,["onClick","text","isDone","onDoneEditing","onCanceledEditing"])),Object(i["f"])(a,{ref:"itemOptionsMenu",mouseHovering:s.mouseIn},{default:at((function(){return[Object(i["f"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return c.editButtonClicked&&c.editButtonClicked.apply(c,arguments)})},"edit"),Object(i["f"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return c.deleteButtonClicked&&c.deleteButtonClicked.apply(c,arguments)})}," delete "),Object(i["f"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return c.moveToYesterdayClicked&&c.moveToYesterdayClicked.apply(c,arguments)})}," move to yesterday "),Object(i["f"])("button",{class:"options-button",onClick:e[5]||(e[5]=function(){return c.moveToTomorrowClicked&&c.moveToTomorrowClicked.apply(c,arguments)})}," move to tomorrow ")]})),_:1},8,["mouseHovering"])],32)})),rt=Object(i["v"])("data-v-84df1884");Object(i["k"])("data-v-84df1884");var ut={class:"item-title-display"};Object(i["j"])();var lt=rt((function(t,e,n,o,s,c){return Object(i["i"])(),Object(i["c"])("div",ut,[(Object(i["i"])(),Object(i["c"])(Object(i["p"])(c.itemTitleComponentType),{class:"title-display-text"},{default:rt((function(){return[Object(i["e"])(Object(i["q"])(n.text),1)]})),_:1}))])})),pt={name:"btdItemTitleDisplay",data:function(){return{}},props:{text:String,isDone:Boolean},computed:{itemTitleComponentType:function(){return this.isDone?"s":"b"}}};pt.render=lt,pt.__scopeId="data-v-84df1884";var ft=pt,bt=Object(i["v"])("data-v-9ed64cd2");Object(i["k"])("data-v-9ed64cd2");var mt={class:"btd-item-title-edit"};Object(i["j"])();var vt=bt((function(t,e,n,o,s,c){var a=Object(i["o"])("click-away");return Object(i["i"])(),Object(i["c"])("div",mt,[Object(i["u"])(Object(i["f"])("input",{ref:"inputField",class:"item-title-edit-input","onUpdate:modelValue":e[1]||(e[1]=function(t){return s.currentText=t}),onKeydown:e[2]||(e[2]=function(){return c.keylistener&&c.keylistener.apply(c,arguments)})},null,544),[[a,c.clickAway],[i["t"],s.currentText]]),Object(i["f"])("button",{onClick:e[3]||(e[3]=function(){return c.doneEditing&&c.doneEditing.apply(c,arguments)})},"Save"),Object(i["f"])("button",{onClick:e[4]||(e[4]=function(){return c.cancelEditing&&c.cancelEditing.apply(c,arguments)})},"Cancel")])})),ht={name:"btdItemTitleEdit",data:function(){return{currentText:this.text}},props:{text:String},emits:["doneEditing","canceledEditing"],methods:{focusInput:function(){this.$refs.inputField.focus(),this.$refs.inputField.select()},doneEditing:function(){this.$emit("doneEditing",this.currentText)},cancelEditing:function(){this.$emit("canceledEditing",this.currentText)},clickAway:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("btd-item-title-edit")}))||this.doneEditing()},keylistener:function(t){"Escape"===t.key?this.escapePressed():"Enter"===t.key&&this.enterPressed()},enterPressed:function(){this.doneEditing()},escapePressed:function(){this.cancelEditing()}},mounted:function(){this.focusInput()}};ht.render=vt,ht.__scopeId="data-v-9ed64cd2";var Ot=ht,jt={components:{btdOptionsButton:ot,btdItemTitleDisplay:ft,btdItemTitleEdit:Ot},name:"btdListItem",data:function(){return{mouseIn:!1,isEditing:!1}},props:{text:String,isDone:Boolean},emits:["itemDoneUpdate","itemDeleted","itemMoved","itemEdited"],computed:{itemTitleComponentType:function(){return this.isEditing?"btd-item-title-edit":"btd-item-title-display"}},methods:{handleCheckbox:function(t){this.$emit("itemDoneUpdate",t.target.checked)},textClicked:function(){this.isEditing||this.$emit("itemDoneUpdate",!this.isDone)},titleClickAway:function(){this.isEditing=!1},deleteButtonClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemDeleted")},moveToYesterdayClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",-1)},moveToTomorrowClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",1)},editButtonClicked:function(){this.isEditing=!this.isEditing,this.isEditing?(console.log("hi"),console.log(this.$refs.itemText),this.$refs.itemOptionsMenu.hideMenu()):console.log("this shouldn't happen")},doneEditing:function(t){this.isEditing=!1,this.$emit("itemEdited",t)},canceledEditing:function(){this.isEditing=!1}}};n("c9e2");jt.render=dt,jt.__scopeId="data-v-4c8a79d5";var kt=jt,gt={name:"btdList",components:{BtdListHeader:ct,BtdListItem:kt,btdItemTitleEdit:Ot},data:function(){return{isAddingItem:!1}},props:{list:Object},emits:["listUpdate"],computed:{title:function(){var t=this.list.id;if("day_"===t.substring(0,4)){var e={weekday:"short",month:"short",day:"numeric"};return new Intl.DateTimeFormat("en-US",e).format(new Date(this.list.start))}if("week_"===t.substring(0,5)){console.log(this.list.start);var n={month:"numeric",day:"numeric"},i=new Intl.DateTimeFormat("en-US",n);return i.format(new Date(this.list.start))+" - "+i.format(new Date(this.list.end))}return t},numComplete:function(){return this.list.items.reduceRight((function(t,e){return e.isDone?t+1:t+0}),0)}},methods:{itemDoneUpdate:function(t,e){var n={type:"itemDoneUpdate",itemUpdates:[{idx:t,val:e}]};this.$emit("listUpdate",n)},itemDeleted:function(t){this.$emit("listUpdate",{type:"itemDeleted",itemIdxs:[t]})},itemMoved:function(t,e){this.$emit("listUpdate",{type:"itemMovedToList",itemidx:t,moveAmt:e})},itemEdited:function(t,e){var n={type:"itemEdited",itemUpdates:[{idx:t,val:e}]};this.$emit("listUpdate",n)},addItemClicked:function(){this.isAddingItem||(this.isAddingItem=!0)},doneEditing:function(t){var e=this,n={type:"itemAdded",itemUpdates:[{val:t}]};this.$emit("listUpdate",n),Object(i["h"])((function(){return e.isAddingItem=!1}))},canceledEditing:function(){var t=this;this.isAddingItem=!1,Object(i["h"])((function(){return t.isAddingItem=!1}))},updateSkipped:function(t){this.$emit("listUpdate",{type:"listSkippedUpdate",isSkipped:t})},setAllDone:function(t){var e={type:"itemDoneUpdate",itemUpdates:Object(P["a"])(Array(this.list.items.length).keys()).map((function(e){return{idx:e,val:t}}))};console.log(e),this.$emit("listUpdate",e)},loadDefaultList:function(){this.$emit("listUpdate",{type:"loadDefaultList"})},editDefaultList:function(){this.$emit("listUpdate",{type:"loadDefaultList"})}}};n("6f67");gt.render=H,gt.__scopeId="data-v-699802d4";var yt=gt,Dt=n("745a"),Ct=n.n(Dt),It=Object(i["v"])("data-v-2c214604");Object(i["k"])("data-v-2c214604");var wt={class:"btd-no-lists-filler"};Object(i["j"])();var Et=It((function(t,e,n,o,s,c){return Object(i["i"])(),Object(i["c"])("div",wt,"No lists")})),Lt={name:"btdNoListsFiller",data:function(){return{}}};Lt.render=Et,Lt.__scopeId="data-v-2c214604";var xt=Lt,Tt={name:"btdMainComponent",components:{btdHeader:T,btdLoadingBody:$,btdNoListsFiller:xt,btdList:yt},data:function(){return{selectedDate:u.a.getToday(),lists:null}},props:{},methods:{dayChosen:function(t){this.selectedDate=t},getListsFromServer:function(t){var e=this;Ct.a.getListsForDate(t,(function(n){console.log(n),e.selectedDate===t&&(e.lists=n.data)}))},checkIfListDone:function(t){this.lists[t].isDone=this.lists[t].items.every((function(t){return t.isDone}))},pushListToServer:function(t){Ct.a.pushListToServer(t)},listUpdate:function(t,e){var n=this;console.log("got update for list",t,"body:",e);var i=e.type;switch(i){case"itemDoneUpdate":e.itemUpdates.forEach((function(e){return n.lists[t].items[e.idx].isDone=e.val})),this.checkIfListDone(t);break;case"itemDeleted":e.itemIdxs.sort((function(t,e){return e-t})),e.itemIdxs.forEach((function(e){return n.lists[t].items.splice(e,1)})),this.checkIfListDone(t);break;case"itemEdited":e.itemUpdates.forEach((function(e){return n.lists[t].items[e.idx].text=e.val}));break;case"itemAdded":e.itemUpdates.forEach((function(e){return n.lists[t].items.push({text:e.val,isDone:!1})})),this.checkIfListDone(t);break;case"listSkippedUpdate":this.lists[t].isSkipped=e.isSkipped;break;case"loadDefaultList":case"editDefaultList":case"itemMovedToList":return void console.log("unimplemented");default:return void console.log("unknown list update,",i)}this.pushListToServer(this.lists[t])}},watch:{selectedDate:function(t){this.getListsFromServer(t)}},mounted:function(){this.getListsFromServer(this.selectedDate)}};n("ac70");Tt.render=d,Tt.__scopeId="data-v-9b9ccbbe";var St=Tt,Ut=n("bc3a"),_t=n.n(Ut),Mt={name:"App",components:{btdMasterComponent:St},data:function(){return{msg:"Loading"}},mounted:function(){var t=this;_t.a.get("/api/v1/test").then((function(e){t.msg=e.data.body}))}};n("960d");Mt.render=s;var $t=Mt,At=n("3ebd"),Bt=Object(i["b"])($t);Bt.use(At["a"]),Bt.mount("#app")},"6a23":function(t,e,n){},"6f67":function(t,e,n){"use strict";n("e76f")},"700e":function(t,e,n){},"745a":function(t,e,n){var i=n("bc3a"),o="/api/v1/",s=n("1ff6");t.exports={getListsForDate:function(t,e){var n=o+"/list/"+s.apiDateStr(t);i.get(n).then((function(t){e(t)}))},pushListToServer:function(t){var e=o+"/list/"+t.id;i.put(e,t)}}},"960d":function(t,e,n){"use strict";n("700e")},a319:function(t,e,n){"use strict";n("47c9")},a82b:function(t,e,n){t.exports=n.p+"img/curved-arrow.46a16da5.png"},a9e3:function(t,e,n){t.exports=n.p+"img/down-arrow-red.af94d081.png"},ac70:function(t,e,n){"use strict";n("463f")},b079:function(t,e,n){},b758:function(t,e,n){t.exports=n.p+"img/ellipsis.870e98e0.png"},c9e2:function(t,e,n){"use strict";n("224f")},d571:function(t,e,n){"use strict";n("ee4f")},e76f:function(t,e,n){},ee4f:function(t,e,n){}});
//# sourceMappingURL=app.fad5e166.js.map