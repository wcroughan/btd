(function(t){function e(e){for(var i,a,c=e[0],d=e[1],r=e[2],l=0,f=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(t[i]=d[i]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,r||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,c=1;c<n.length;c++){var d=n[c];0!==o[d]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={app:0},s=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var r=0;r<c.length;r++)e(c[r]);var u=d;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"121a":function(t,e,n){"use strict";n("25d0")},1253:function(t,e,n){"use strict";n("b079")},"15c5":function(t,e,n){"use strict";n("7ae1")},"18f2":function(t,e,n){"use strict";n("b5cf")},"1ff6":function(t,e,n){n("a15b"),n("d81d"),n("fb6a"),t.exports={gimmeString:function(){return"hai!"},getToday:function(){var t=new Date;return t.setHours(0,0,0,0),t},dayOfWeekShortAbbr:function(t){var e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return e[t.getDay()]},formatDateOld:function(t,e,n){function i(e){var n=new Intl.DateTimeFormat("en",e);return n.format(t)}return e.map(i).join(n)},tomorrow:function(t){var e=new Date(t);return e.setDate(e.getDate()+1),e},yesterday:function(t){var e=new Date(t);return e.setDate(e.getDate()-1),e},getMonday:function(t){var e=new Date(t),n=e.getDay(),i=e.getDate()-n+(0==n?-6:1);return e.setDate(i),e},plusOneWeek:function(t){var e=new Date(t);return e.setDate(e.getDate()+7),e},apiDateStr:function(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2)},getDateFromIdStr:function(t){var e=parseInt(t.substring(0,4)),n=parseInt(t.substring(4,6))-1,i=parseInt(t.substring(6,8)),o=new Date(e,n,i,0,0,0,0);return o}}},"215e":function(t,e,n){"use strict";n("c15f")},"252d":function(t,e,n){"use strict";n("6a23")},"25d0":function(t,e,n){},2602:function(t,e,n){},"2dfa":function(t,e,n){},3121:function(t,e,n){},"3de4":function(t,e,n){t.exports=n.p+"img/fire.d0e39b25.png"},"4fa0":function(t,e,n){"use strict";n("3121")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),o={id:"app"};function s(t,e,n,s,a,c){var d=Object(i["n"])("btd-master-component");return Object(i["i"])(),Object(i["c"])("div",o,[Object(i["f"])(d)])}var a=Object(i["u"])("data-v-56ac99b8");Object(i["k"])("data-v-56ac99b8");var c={class:"btd-main-component"};Object(i["j"])();var d=a((function(t,e,n,o,s,a){var d=Object(i["n"])("btd-header"),r=Object(i["n"])("btd-loading-body"),u=Object(i["n"])("btd-no-lists-filler"),l=Object(i["n"])("btd-list"),f=Object(i["n"])("btd-edit-default-modal");return Object(i["i"])(),Object(i["c"])("div",c,[Object(i["f"])(d,{date:s.selectedDate,onDayChosen:e[1]||(e[1]=function(t){return a.dayChosen(t)})},null,8,["date"]),null===s.lists?(Object(i["i"])(),Object(i["c"])(r,{key:0})):Object(i["d"])("",!0),null!==s.lists&&0==s.lists.length?(Object(i["i"])(),Object(i["c"])(u,{key:1})):Object(i["d"])("",!0),(Object(i["i"])(!0),Object(i["c"])(i["a"],null,Object(i["l"])(s.lists,(function(t,e){return Object(i["i"])(),Object(i["c"])(l,{key:t.id,list:t,onListUpdate:function(t){return a.listUpdate(e,t)}},null,8,["list","onListUpdate"])})),128)),Object(i["f"])(f,{ref:"editDefaultModal"},null,512)])})),r=(n("159b"),n("a434"),n("ac1f"),n("1276"),n("1ff6")),u=n.n(r),l=Object(i["u"])("data-v-35a5655e");Object(i["k"])("data-v-35a5655e");var f={class:"btd-header"};Object(i["j"])();var p=l((function(t,e,n,o,s,a){var c=Object(i["n"])("btd-day-display"),d=Object(i["n"])("btd-streak-info");return Object(i["i"])(),Object(i["c"])("div",f,[Object(i["f"])(c,{date:n.date,onDayChosen:e[1]||(e[1]=function(t){return a.dayChosen(t)})},null,8,["date"]),Object(i["f"])("button",{class:"today-button",onClick:e[2]||(e[2]=function(){return a.todayClicked&&a.todayClicked.apply(a,arguments)})},"Today"),Object(i["f"])(d)])})),m=n("a9e3"),b=n.n(m),h=Object(i["u"])("data-v-e1b9c5f8");Object(i["k"])("data-v-e1b9c5f8");var v={class:"btd-day-display"},O={class:"date-text"};Object(i["j"])();var j=h((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",v,[Object(i["f"])("img",{src:b.a,onClick:e[1]||(e[1]=function(){return a.yesterdayClicked&&a.yesterdayClicked.apply(a,arguments)}),alt:"Yesterday",class:"left-arrow arrow"}),Object(i["f"])("span",O,Object(i["q"])(a.dateText),1),Object(i["f"])("img",{src:b.a,onClick:e[2]||(e[2]=function(){return a.tomorrowClicked&&a.tomorrowClicked.apply(a,arguments)}),alt:"Tomorrow",class:"right-arrow arrow"})])})),y={name:"btdDayDisplay",data:function(){return{}},props:{date:Date},emits:["dayChosen"],computed:{dateText:function(){var t=[{year:"numeric"},{month:"numeric"},{day:"numeric"}];return u.a.formatDateOld(this.date,t,"/")}},methods:{yesterdayClicked:function(){var t=u.a.yesterday(this.date);this.$emit("dayChosen",t)},tomorrowClicked:function(){this.$emit("dayChosen",u.a.tomorrow(this.date))}}};n("121a");y.render=j,y.__scopeId="data-v-e1b9c5f8";var g=y,k=n("3de4"),D=n.n(k),C=Object(i["u"])("data-v-5e67f302");Object(i["k"])("data-v-5e67f302");var I={class:"btd-streak-info"};Object(i["j"])();var w=C((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",I,[Object(i["f"])("img",{class:["fire-img",{greyed:0===s.streakLength}],src:D.a,alt:"streak"},null,2),Object(i["e"])(" "+Object(i["q"])(s.streakLength),1)])})),L=(n("a9e3d"),{name:"btdStreakInfo",data:function(){return{streakLength:0}},props:{updateFlag:Number},emits:["updateDone"],watch:{updateFlag:function(t){t>0&&console.log("time to update the streak!")}}});n("252d");L.render=w,L.__scopeId="data-v-5e67f302";var E=L,T={name:"btdHeader",data:function(){return{}},components:{BtdDayDisplay:g,BtdStreakInfo:E},props:{scrollInfo:null,date:Date},emits:["dayChosen"],methods:{dayChosen:function(t){this.$emit("dayChosen",t)},todayClicked:function(){this.dayChosen(u.a.getToday())}}};n("1253");T.render=p,T.__scopeId="data-v-35a5655e";var S=T,x=Object(i["u"])("data-v-23228dfb");Object(i["k"])("data-v-23228dfb");var M={class:"btd-loading-body"};Object(i["j"])();var _=x((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",M,"Loading...")})),U={name:"btdLoadingBody",data:function(){return{}}};U.render=_,U.__scopeId="data-v-23228dfb";var $=U,A=Object(i["u"])("data-v-ffef5c52");Object(i["k"])("data-v-ffef5c52");var B={class:"btd-list"},F={class:"list-body"},N=Object(i["e"])("+ Add Item");Object(i["j"])();var H=A((function(t,e,n,o,s,a){var c=Object(i["n"])("btd-list-header"),d=Object(i["n"])("btd-list-item");return Object(i["i"])(),Object(i["c"])("div",B,[Object(i["f"])(c,{title:a.title,numItems:n.list.items.length,numComplete:a.numComplete,isSkipped:n.list.isSkipped,onUpdateSkipped:a.updateSkipped,onSetAllDone:a.setAllDone,onLoadDefaultList:a.loadDefaultList,onEditDefaultList:a.editDefaultList},null,8,["title","numItems","numComplete","isSkipped","onUpdateSkipped","onSetAllDone","onLoadDefaultList","onEditDefaultList"]),Object(i["f"])("div",F,[(Object(i["i"])(!0),Object(i["c"])(i["a"],null,Object(i["l"])(n.list.items,(function(t,e){return Object(i["i"])(),Object(i["c"])(d,{key:e,text:t.text,isDone:t.isDone,onItemDoneUpdate:function(t){return a.itemDoneUpdate(e,t)},onItemDeleted:function(t){return a.itemDeleted(e)},onItemMoved:function(t){return a.itemMoved(e,t)},onItemEdited:function(t){return a.itemEdited(e,t)},class:t.isDone?"done-item":"pending-item"},null,8,["text","isDone","onItemDoneUpdate","onItemDeleted","onItemMoved","onItemEdited","class"])})),128)),(Object(i["i"])(),Object(i["c"])(Object(i["p"])(s.isAddingItem?"btd-item-title-edit":"button"),Object(i["g"])({class:"add-item-button"},Object(i["r"])(s.isAddingItem?{}:{click:a.addItemClicked}),{onDoneEditing:a.doneEditing,onCanceledEditing:a.canceledEditing}),{default:A((function(){return[N]})),_:1},16,["onDoneEditing","onCanceledEditing"]))])])})),P=n("2909"),q=(n("d81d"),n("d3b7"),n("ddb0"),n("a82b")),Y=n.n(q),W=Object(i["u"])("data-v-b16b5ff2");Object(i["k"])("data-v-b16b5ff2");var V={class:"header-title"},J={class:"header-info-container"},K={class:"header-info"},R={key:0,class:"skipped-icon",alt:"Skipped",src:Y.a},z=Object(i["f"])("div",{class:"header-info-spacer-vert"},null,-1),G=Object(i["f"])("div",{class:"header-spacer"},null,-1),Q={class:"options-button-container"};Object(i["j"])();var X=W((function(t,e,n,o,s,a){var c=Object(i["n"])("btd-options-button");return Object(i["i"])(),Object(i["c"])("div",{onMouseenter:e[5]||(e[5]=function(t){return s.mouseIn=!0}),onMouseleave:e[6]||(e[6]=function(t){return s.mouseIn=!1}),class:"btd-list-header"},[Object(i["f"])("h1",V,Object(i["q"])(n.title),1),Object(i["f"])("div",J,[Object(i["f"])("span",K,[Object(i["e"])(Object(i["q"])(n.numComplete)+"/"+Object(i["q"])(n.numItems)+" ",1),n.isSkipped?(Object(i["i"])(),Object(i["c"])("img",R)):Object(i["d"])("",!0)]),z]),G,Object(i["f"])(c,{class:"list-options",ref:"optionsButton",mouseHovering:s.mouseIn},{default:W((function(){return[Object(i["f"])("div",Q,[Object(i["f"])("button",{class:"options-button",onClick:e[1]||(e[1]=function(){return a.skipButtonClicked&&a.skipButtonClicked.apply(a,arguments)})},"Skip"),Object(i["f"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return a.markAllClicked&&a.markAllClicked.apply(a,arguments)})},Object(i["q"])(a.markAllText),1),Object(i["f"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return a.loadDefaultClicked&&a.loadDefaultClicked.apply(a,arguments)})}," Load Default List "),Object(i["f"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return a.editDefaultClicked&&a.editDefaultClicked.apply(a,arguments)})}," Edit Default List ")])]})),_:1},8,["mouseHovering"])],32)})),Z=n("b758"),tt=n.n(Z),et=Object(i["u"])("data-v-0101f77f");Object(i["k"])("data-v-0101f77f");var nt={class:"options-button-container"};Object(i["j"])();var it=et((function(t,e,n,o,s,a){var c=Object(i["o"])("click-away");return Object(i["i"])(),Object(i["c"])("div",nt,[Object(i["t"])(Object(i["f"])("img",{src:tt.a,class:["main-button",a.displayOptionsButton?"visible-button":"hidden-button"],onClick:e[1]||(e[1]=function(){return a.optionsClicked&&a.optionsClicked.apply(a,arguments)})},null,2),[[c,a.clickNotOnOptionsButton]]),Object(i["f"])("div",{class:["non-menu-mask",{"visible-mask":s.displayDropdownOptions}]},null,2),Object(i["f"])("div",{class:["dropdown-content",{"visible-dropdown":s.displayDropdownOptions}]},[Object(i["m"])(t.$slots,"default",{},void 0,!0)],2)])})),ot=(n("caad"),n("2532"),{name:"btdListItem",data:function(){return{displayDropdownOptions:!1}},props:{mouseHovering:Boolean},computed:{displayOptionsButton:function(){return this.mouseHovering||this.displayDropdownOptions}},methods:{clickNotOnOptionsButton:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("dropdown-content")}))||(this.displayDropdownOptions=!1)},optionsClicked:function(){this.displayDropdownOptions=!this.displayDropdownOptions},hideMenu:function(){this.displayDropdownOptions=!1}}});n("4fa0");ot.render=it,ot.__scopeId="data-v-0101f77f";var st=ot,at={name:"btdListHeader",components:{btdOptionsButton:st},data:function(){return{mouseIn:!1}},props:{numItems:Number,numComplete:Number,isSkipped:Boolean,title:String},emits:["updateSkipped","setAllDone","loadDefaultList","editDefaultList"],computed:{isComplete:function(){return this.numItems===this.numComplete},markAllText:function(){return this.isComplete?"Mark all incomplete":"Mark all complete"}},methods:{skipButtonClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("updateSkipped",!this.isSkipped)},markAllClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("setAllDone",!this.isComplete)},loadDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("loadDefaultList")},editDefaultClicked:function(){this.$refs.optionsButton.hideMenu(),this.$emit("editDefaultList")}}};n("215e");at.render=X,at.__scopeId="data-v-b16b5ff2";var ct=at,dt=Object(i["u"])("data-v-8df84806");Object(i["k"])("data-v-8df84806");var rt={class:"options-button-container"};Object(i["j"])();var ut=dt((function(t,e,n,o,s,a){var c=Object(i["n"])("btd-options-button");return Object(i["i"])(),Object(i["c"])("div",{class:"btd-list-item",onMouseenter:e[6]||(e[6]=function(t){return s.mouseIn=!0}),onMouseleave:e[7]||(e[7]=function(t){return s.mouseIn=!1})},[Object(i["f"])("input",{type:"checkbox",onChange:e[1]||(e[1]=function(t){return a.handleCheckbox(t)}),checked:n.isDone},null,40,["checked"]),(Object(i["i"])(),Object(i["c"])(Object(i["p"])(a.itemTitleComponentType),{class:"todo-item-title",ref:"itemText",onClick:a.textClicked,text:n.text,isDone:n.isDone,onDoneEditing:a.doneEditing,onCanceledEditing:a.canceledEditing},null,8,["onClick","text","isDone","onDoneEditing","onCanceledEditing"])),Object(i["f"])(c,{ref:"itemOptionsMenu",mouseHovering:s.mouseIn},{default:dt((function(){return[Object(i["f"])("div",rt,[Object(i["f"])("button",{class:"options-button",onClick:e[2]||(e[2]=function(){return a.editButtonClicked&&a.editButtonClicked.apply(a,arguments)})},"edit"),Object(i["f"])("button",{class:"options-button",onClick:e[3]||(e[3]=function(){return a.deleteButtonClicked&&a.deleteButtonClicked.apply(a,arguments)})}," delete "),Object(i["f"])("button",{class:"options-button",onClick:e[4]||(e[4]=function(){return a.moveToYesterdayClicked&&a.moveToYesterdayClicked.apply(a,arguments)})}," move to yesterday "),Object(i["f"])("button",{class:"options-button",onClick:e[5]||(e[5]=function(){return a.moveToTomorrowClicked&&a.moveToTomorrowClicked.apply(a,arguments)})}," move to tomorrow ")])]})),_:1},8,["mouseHovering"])],32)})),lt=Object(i["u"])("data-v-204c4056");Object(i["k"])("data-v-204c4056");var ft={class:"item-title-display"};Object(i["j"])();var pt=lt((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",ft,[Object(i["f"])("span",{class:["title-display-text",{strike:n.isDone}],onMousedown:e[1]||(e[1]=function(){return a.mousedown&&a.mousedown.apply(a,arguments)})},"   "+Object(i["q"])(n.text)+"  ",35)])})),mt={name:"btdItemTitleDisplay",data:function(){return{}},props:{text:String,isDone:Boolean},computed:{itemTitleComponentType:function(){return this.isDone?"s":"b"}},methods:{mousedown:function(t){t.preventDefault()}}};n("18f2");mt.render=pt,mt.__scopeId="data-v-204c4056";var bt=mt,ht=Object(i["u"])("data-v-9ed64cd2");Object(i["k"])("data-v-9ed64cd2");var vt={class:"btd-item-title-edit"};Object(i["j"])();var Ot=ht((function(t,e,n,o,s,a){var c=Object(i["o"])("click-away");return Object(i["i"])(),Object(i["c"])("div",vt,[Object(i["t"])(Object(i["f"])("input",{ref:"inputField",class:"item-title-edit-input","onUpdate:modelValue":e[1]||(e[1]=function(t){return s.currentText=t}),onKeydown:e[2]||(e[2]=function(){return a.keylistener&&a.keylistener.apply(a,arguments)})},null,544),[[c,a.clickAway],[i["s"],s.currentText]]),Object(i["f"])("button",{onClick:e[3]||(e[3]=function(){return a.doneEditing&&a.doneEditing.apply(a,arguments)})},"Save"),Object(i["f"])("button",{onClick:e[4]||(e[4]=function(){return a.cancelEditing&&a.cancelEditing.apply(a,arguments)})},"Cancel")])})),jt={name:"btdItemTitleEdit",data:function(){return{currentText:this.text}},props:{text:String},emits:["doneEditing","canceledEditing"],methods:{focusInput:function(){this.$refs.inputField.focus(),this.$refs.inputField.select()},doneEditing:function(){this.$emit("doneEditing",this.currentText)},cancelEditing:function(){this.$emit("canceledEditing",this.currentText)},clickAway:function(t){t.path.some((function(t){return void 0!==t.className&&t.className.includes("btd-item-title-edit")}))||this.doneEditing()},keylistener:function(t){"Escape"===t.key?this.escapePressed():"Enter"===t.key&&this.enterPressed()},enterPressed:function(){this.doneEditing()},escapePressed:function(){this.cancelEditing()}},mounted:function(){this.focusInput()}};jt.render=Ot,jt.__scopeId="data-v-9ed64cd2";var yt=jt,gt={components:{btdOptionsButton:st,btdItemTitleDisplay:bt,btdItemTitleEdit:yt},name:"btdListItem",data:function(){return{mouseIn:!1,isEditing:!1}},props:{text:String,isDone:Boolean},emits:["itemDoneUpdate","itemDeleted","itemMoved","itemEdited"],computed:{itemTitleComponentType:function(){return this.isEditing?"btd-item-title-edit":"btd-item-title-display"}},methods:{handleCheckbox:function(t){this.$emit("itemDoneUpdate",t.target.checked)},textClicked:function(){this.isEditing||this.$emit("itemDoneUpdate",!this.isDone)},titleClickAway:function(){this.isEditing=!1},deleteButtonClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemDeleted")},moveToYesterdayClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",-1)},moveToTomorrowClicked:function(){this.$refs.itemOptionsMenu.hideMenu(),this.$emit("itemMoved",1)},editButtonClicked:function(){this.isEditing=!this.isEditing,this.isEditing?(console.log("hi"),console.log(this.$refs.itemText),this.$refs.itemOptionsMenu.hideMenu()):console.log("this shouldn't happen")},doneEditing:function(t){this.isEditing=!1,this.$emit("itemEdited",t)},canceledEditing:function(){this.isEditing=!1}}};n("cf4f");gt.render=ut,gt.__scopeId="data-v-8df84806";var kt=gt,Dt={name:"btdList",components:{BtdListHeader:ct,BtdListItem:kt,btdItemTitleEdit:yt},data:function(){return{isAddingItem:!1}},props:{list:Object},emits:["listUpdate"],computed:{title:function(){var t=this.list.id;if("day_"===t.substring(0,4)){var e={weekday:"short",month:"short",day:"numeric"};return new Intl.DateTimeFormat("en-US",e).format(new Date(this.list.start))}if("week_"===t.substring(0,5)){var n={month:"numeric",day:"numeric"},i=new Intl.DateTimeFormat("en-US",n);return i.format(new Date(this.list.start))+" - "+i.format(new Date(this.list.end))}return t},numComplete:function(){return this.list.items.reduceRight((function(t,e){return e.isDone?t+1:t+0}),0)}},methods:{itemDoneUpdate:function(t,e){var n={type:"itemDoneUpdate",itemUpdates:[{idx:t,val:e}]};this.$emit("listUpdate",n)},itemDeleted:function(t){this.$emit("listUpdate",{type:"itemDeleted",itemIdxs:[t]})},itemMoved:function(t,e){this.$emit("listUpdate",{type:"itemMovedToList",itemIdx:t,moveAmt:e})},itemEdited:function(t,e){var n={type:"itemEdited",itemUpdates:[{idx:t,val:e}]};this.$emit("listUpdate",n)},addItemClicked:function(){this.isAddingItem||(this.isAddingItem=!0)},doneEditing:function(t){var e=this,n={type:"itemAdded",itemUpdates:[{val:t}]};this.$emit("listUpdate",n),Object(i["h"])((function(){return e.isAddingItem=!1}))},canceledEditing:function(){var t=this;this.isAddingItem=!1,Object(i["h"])((function(){return t.isAddingItem=!1}))},updateSkipped:function(t){this.$emit("listUpdate",{type:"listSkippedUpdate",isSkipped:t})},setAllDone:function(t){var e={type:"itemDoneUpdate",itemUpdates:Object(P["a"])(Array(this.list.items.length).keys()).map((function(e){return{idx:e,val:t}}))};this.$emit("listUpdate",e)},loadDefaultList:function(){this.$emit("listUpdate",{type:"loadDefaultList"})},editDefaultList:function(){this.$emit("listUpdate",{type:"editDefaultList"})}}};n("f03f");Dt.render=H,Dt.__scopeId="data-v-ffef5c52";var Ct=Dt,It=n("745a"),wt=n.n(It),Lt=Object(i["u"])("data-v-2c214604");Object(i["k"])("data-v-2c214604");var Et={class:"btd-no-lists-filler"};Object(i["j"])();var Tt=Lt((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",Et,"No lists")})),St={name:"btdNoListsFiller",data:function(){return{}}};St.render=Tt,St.__scopeId="data-v-2c214604";var xt=St,Mt=Object(i["u"])("data-v-099dd730");Object(i["k"])("data-v-099dd730");var _t=Object(i["f"])("div",{class:"non-menu-mask"},null,-1),Ut={class:"modal-content"},$t={class:"modal-header"},At={class:"item-list"},Bt={class:"modal-footer"};Object(i["j"])();var Ft=Mt((function(t,e,n,o,s,a){return Object(i["i"])(),Object(i["c"])("div",{class:["modal-container",{"visible-container":s.displayModal}]},[_t,Object(i["f"])("div",Ut,[Object(i["f"])("div",$t,[Object(i["f"])("h1",null,"Default "+Object(i["q"])("day"===s.listType?"Daily":"Weekly")+" List",1)]),Object(i["f"])("div",At,[(Object(i["i"])(!0),Object(i["c"])(i["a"],null,Object(i["l"])(s.list.items,(function(t,e){return Object(i["t"])((Object(i["i"])(),Object(i["c"])("input",{class:"item-input","onUpdate:modelValue":function(e){return t.text=e},key:e},null,8,["onUpdate:modelValue"])),[[i["s"],t.text]])})),128))]),Object(i["f"])("div",Bt,[Object(i["f"])("button",{onClick:e[1]||(e[1]=function(){return a.save&&a.save.apply(a,arguments)})},"Save"),Object(i["f"])("button",{onClick:e[2]||(e[2]=function(){return a.cancel&&a.cancel.apply(a,arguments)})},"Cancel")])])],2)})),Nt={name:"btdEditDefaultModal",components:{},data:function(){return{displayModal:!1,listType:"",list:{}}},methods:{show:function(t){console.log("showing modal with type",t),this.listType=t,this.displayModal=!0},save:function(){this.displayModal=!1,this.list.id=this.listType+"_default",this.list.items.forEach((function(t){return t.isDone=!1})),wt.a.pushListToServer(this.list),this.listType=""},cancel:function(){console.log("hiding modal"),this.displayModal=!1,this.listType=""},getListFromServer:function(t){var e=this;console.log("getting list from server:",t),wt.a.getDefaultList(t+"_edit",(function(t){console.log("got from server:",t),e.list=t.data}))}},watch:{listType:function(t){""!==t&&this.getListFromServer(t)}}};n("7155");Nt.render=Ft,Nt.__scopeId="data-v-099dd730";var Ht=Nt,Pt={name:"btdMainComponent",components:{btdHeader:S,btdLoadingBody:$,btdNoListsFiller:xt,btdList:Ct,btdEditDefaultModal:Ht},data:function(){return{selectedDate:u.a.getToday(),lists:null}},props:{},methods:{dayChosen:function(t){this.selectedDate=t},getListsFromServer:function(t){var e=this;wt.a.getListsForDate(t,(function(n){e.selectedDate===t&&(e.lists=n.data)}))},displayEditDefaultList:function(t){this.$refs.editDefaultModal.show(t)},checkIfListDone:function(t){this.lists[t].isDone=this.lists[t].items.every((function(t){return t.isDone}))},pushListToServer:function(t){wt.a.pushListToServer(t)},listUpdate:function(t,e){var n=this;console.log("got update for list",t,"body:",e);var i=e.type,o=this.lists[t].id;switch(i){case"itemDoneUpdate":e.itemUpdates.forEach((function(e){return n.lists[t].items[e.idx].isDone=e.val})),this.checkIfListDone(t);break;case"itemDeleted":e.itemIdxs.sort((function(t,e){return e-t})),e.itemIdxs.forEach((function(e){return n.lists[t].items.splice(e,1)})),this.checkIfListDone(t);break;case"itemEdited":e.itemUpdates.forEach((function(e){return n.lists[t].items[e.idx].text=e.val}));break;case"itemAdded":e.itemUpdates.forEach((function(e){return n.lists[t].items.push({text:e.val,isDone:!1})})),this.checkIfListDone(t);break;case"listSkippedUpdate":this.lists[t].isSkipped=e.isSkipped;break;case"loadDefaultList":return wt.a.getDefaultList(o,(function(e){console.log(e),n.lists[t]=e.data})),void wt.a.deleteListFromServer(o);case"itemMovedToList":wt.a.addItemToList(this.lists[t].items[e.itemIdx],wt.a.siblingListId(this.lists[t].id,e.moveAmt)),this.lists[t].items.splice(e.itemIdx,1),this.checkIfListDone(t);break;case"editDefaultList":return void this.displayEditDefaultList(this.lists[t].id.split("_")[0]);default:return void console.log("unknown list update,",i)}this.pushListToServer(this.lists[t])}},watch:{selectedDate:function(t){this.getListsFromServer(t)}},mounted:function(){this.getListsFromServer(this.selectedDate)}};n("15c5");Pt.render=d,Pt.__scopeId="data-v-56ac99b8";var qt=Pt,Yt=n("bc3a"),Wt=n.n(Yt),Vt={name:"App",components:{btdMasterComponent:qt},data:function(){return{msg:"Loading"}},mounted:function(){var t=this;Wt.a.get("/api/v1/test").then((function(e){t.msg=e.data.body}))}};n("960d");Vt.render=s;var Jt=Vt,Kt=n("3ebd"),Rt=Object(i["b"])(Jt);Rt.use(Kt["a"]),Rt.mount("#app")},"6a23":function(t,e,n){},"700e":function(t,e,n){},7155:function(t,e,n){"use strict";n("2dfa")},"745a":function(t,e,n){n("ac1f"),n("1276");var i=n("bc3a"),o="/api/v1/",s=n("1ff6");t.exports={getListsForDate:function(t,e){var n=o+"/list/"+s.apiDateStr(t);i.get(n).then((function(t){e(t)}))},pushListToServer:function(t){var e=o+"/list/"+t.id;i.put(e,t)},getDefaultList:function(t,e){var n=o+"/list/default/"+t;i.get(n).then((function(t){e(t)}))},deleteListFromServer:function(t){var e=o+"/list/"+t;i.delete(e)},siblingListId:function(t,e){var n=t.split("_")[0],i="week"===n?7:1,o=s.getDateFromIdStr(t.split("_")[1]),a=new Date(o);return a.setDate(a.getDate()+e*i),console.log(t,e,a),n+"_"+s.apiDateStr(a)},addItemToList:function(t,e){var n=o+"/list/append_item/"+e;console.log("frontend sending:",n,t),i.put(n,t)}}},"7ae1":function(t,e,n){},"960d":function(t,e,n){"use strict";n("700e")},a82b:function(t,e,n){t.exports=n.p+"img/curved-arrow.46a16da5.png"},a9e3:function(t,e,n){t.exports=n.p+"img/down-arrow-red.af94d081.png"},b079:function(t,e,n){},b5cf:function(t,e,n){},b758:function(t,e,n){t.exports=n.p+"img/ellipsis.870e98e0.png"},c15f:function(t,e,n){},cf4f:function(t,e,n){"use strict";n("2602")},f03f:function(t,e,n){"use strict";n("feb2")},feb2:function(t,e,n){}});
//# sourceMappingURL=app.d8ca5767.js.map