<template>
  <div class="btd-main-component">
    <btd-header :date="selectedDate" @dayChosen="dayChosen($event)" />
    <btd-loading-body v-if="lists === null" />
    <btd-no-lists-filler v-if="lists !== null && lists.length == 0" />
    <btd-list
      v-for="(list, idx) in lists"
      :key="list.id"
      :list="list"
      @listUpdate="listUpdate(idx, $event)"
    />
  </div>
</template>

<script>
import date_util from "../utility/date_util.js";
import btdHeader from "./btdHeader.vue";
import btdLoadingBody from "./btdLoadingBody.vue";
import btdList from "./btdList.vue";
import api_util from "../utility/api_util.js";
import btdNoListsFiller from "./btdNoListsFiller.vue";

export default {
  name: "btdMainComponent",
  components: {
    btdHeader,
    btdLoadingBody,
    btdNoListsFiller,
    btdList,
  },
  data() {
    return {
      selectedDate: date_util.getToday(),
      lists: null,
    };
  },
  props: {},
  methods: {
    dayChosen(date) {
      //   console.log("main got date", date);
      this.selectedDate = date;
    },
    getListsFromServer(date) {
      api_util.getListsForDate(date, (res) => {
        console.log(res);
        if (this.selectedDate === date) {
          this.lists = res.data;
        }
      });
    },
    checkIfListDone(listidx) {
      this.lists[listidx].isDone = this.lists[listidx].items.every(
        (i) => i.isDone
      );
    },
    pushListToServer(list) {
      api_util.pushListToServer(list);
    },
    listUpdate(listidx, update) {
      console.log("got update for list", listidx, "body:", update);
      const type = update.type;
      switch (type) {
        case "itemDoneUpdate":
          update.itemUpdates.forEach(
            (i) => (this.lists[listidx].items[i.idx].isDone = i.val)
          );
          this.checkIfListDone(listidx);
          break;
        case "itemDeleted":
          update.itemIdxs.sort((a, b) => b - a);
          update.itemIdxs.forEach((i) =>
            this.lists[listidx].items.splice(i, 1)
          );
          this.checkIfListDone(listidx);
          break;
        case "itemEdited":
          update.itemUpdates.forEach(
            (i) => (this.lists[listidx].items[i.idx].text = i.val)
          );
          break;
        case "itemAdded":
          update.itemUpdates.forEach((i) =>
            this.lists[listidx].items.push({ text: i.val, isDone: false })
          );
          this.checkIfListDone(listidx);
          break;
        case "listSkippedUpdate":
          this.lists[listidx].isSkipped = update.isSkipped;
          break;
        case "loadDefaultList": //list might be done
        case "editDefaultList":
        case "itemMovedToList": //list might be done
          console.log("unimplemented");
          return;
        default:
          console.log("unknown list update,", type);
          return;
      }
      this.pushListToServer(this.lists[listidx]);
    },
  },
  watch: {
    selectedDate(newval) {
      this.getListsFromServer(newval);
    },
  },
  mounted() {
    // const d11 = date_util.getDateFromIdStr("20210517");
    // const d12 = date_util.tomorrow(d11);
    // const pl1 = {
    //   id: "day_20210517",
    //   isDone: false,
    //   isSkipped: false,
    //   items: [
    //     {
    //       text: "daily 1",
    //       isDone: false,
    //     },
    //     {
    //       text: "daily 2",
    //       isDone: true,
    //     },
    //   ],
    //   start: d11,
    //   end: d12,
    // };
    // this.pushListToServer(pl1);
    // const d21 = date_util.getDateFromIdStr("20210517");
    // const d22 = date_util.getDateFromIdStr("20210524");
    // const pl2 = {
    //   id: "week_20210517",
    //   isDone: false,
    //   isSkipped: false,
    //   items: [
    //     {
    //       text: "weekly 1",
    //       isDone: false,
    //     },
    //     {
    //       text: "weekly 2",
    //       isDone: true,
    //     },
    //   ],
    //   start: d21,
    //   end: d22,
    // };
    // this.pushListToServer(pl2);
    this.getListsFromServer(this.selectedDate);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
