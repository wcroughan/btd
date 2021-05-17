<template>
  <div class="btd-main-component">
    <btd-header :date="selectedDate" @dayChosen="dayChosen($event)" />
    <btd-loading-body v-if="lists === null" />
    <btd-list
      v-for="(list, idx) in lists"
      :key="list.id"
      :list="list"
      @itemDoneUpdate="itemDoneUpdate(idx, $event)"
    />
  </div>
</template>

<script>
import date_util from "../utility/date_util.js";
import btdHeader from "./btdHeader.vue";
import btdLoadingBody from "./btdLoadingBody.vue";
import btdList from "./btdList.vue";
import api_util from "../utility/api_util.js";

export default {
  name: "btdMainComponent",
  components: {
    btdHeader,
    btdLoadingBody,
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
    pushListToServer(list) {
      api_util.pushListToServer(list);
    },
    itemDoneUpdate(listidx, { itemidx, done }) {
      console.log(
        "item done update for list",
        listidx,
        ", item",
        itemidx,
        "done?",
        done
      );
      console.log(this.lists);
      this.lists[listidx].items[itemidx].isDone = done;
      this.pushListToServer(this.lists[listidx]);
    },
  },
  watch: {
    selectedDate(newval) {
      this.getListsFromServer(newval);
    },
  },
  mounted() {
    // const d11 = date_util.getDateFromIdStr("20210516");
    // const d12 = date_util.tomorrow(d11);
    // const pl1 = {
    //   id: "day_20210516",
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
    // const d21 = date_util.getDateFromIdStr("20210510");
    // const d22 = date_util.getDateFromIdStr("20210517");
    // const pl2 = {
    //   id: "week_20210510",
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
