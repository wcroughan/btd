<template>
  <div class="btd-main-component">
    <btd-header
      :date="selectedDate"
      @dayChosen="dayChosen($event)"
      @logout="$emit('logout')"
    />
    <btd-loading-body v-if="lists === null" />
    <btd-no-lists-filler v-if="lists !== null && lists.length == 0" />
    <btd-list
      v-for="(list, idx) in lists"
      :key="list.id"
      :list="list"
      @listUpdate="listUpdate(idx, $event)"
    />
    <btd-edit-default-modal ref="editDefaultModal" @editMade="refreshList" />
  </div>
</template>

<script>
import date_util from "../utility/date_util.js";
import btdHeader from "./btdHeader.vue";
import btdLoadingBody from "./btdLoadingBody.vue";
import btdList from "./btdList.vue";
import api_util from "../utility/api_util.js";
import btdNoListsFiller from "./btdNoListsFiller.vue";
import btdEditDefaultModal from "./btdEditDefaultModal.vue";
import { provide, ref } from "vue";

export default {
  name: "btdMainComponent",
  components: {
    btdHeader,
    btdLoadingBody,
    btdNoListsFiller,
    btdList,
    btdEditDefaultModal,
  },
  data() {
    return {
      selectedDate: date_util.getToday(),
      lists: null,
      //   streakUpdateFlag: 0,
    };
  },
  inject: ["authToken"],
  emits: ["logout"],
  setup() {
    const streakUpdateFlag = ref(0);
    const streakUpdateReceived = () => streakUpdateFlag.value--;
    provide("streakUpdateFlag", streakUpdateFlag);
    provide("streakUpdateReceived", streakUpdateReceived);

    return {
      streakUpdateFlag,
    };
  },
  //   provide() {
  //     return {
  //       streakUpdateFlag: computed(() => this.streakUpdateFlag),
  //       streakUpdateReceived: () => this.streakUpdateFlag--,
  //     };
  //   },
  methods: {
    refreshList() {
      this.getListsFromServer(this.selectedDate);
    },
    dayChosen(date) {
      //   console.log("main got date", date);
      this.selectedDate = date;
    },
    getListsFromServer(date) {
      //   console.log(
      //     "getting list for date",
      //     date,
      //     "with toke",
      //     this.authToken.value
      //   );
      api_util.getListsForDate(this.authToken.value, date, (res) => {
        if (this.selectedDate === date) {
          this.lists = res.data;
        }
      });
    },
    displayEditDefaultList(type) {
      this.$refs.editDefaultModal.show(type);
    },
    checkIfListDone(listidx) {
      this.lists[listidx].isDone = this.lists[listidx].items.every(
        (i) => i.isDone
      );
    },
    pushListToServer(list) {
      api_util.pushListToServer(this.authToken.value, list);
    },
    listUpdate(listidx, update) {
      //   console.log("got update for list", listidx, "body:", update);
      const type = update.type;
      const id = this.lists[listidx].id;
      if (type === "itemDoneUpdate") {
        update.itemUpdates.forEach(
          (i) =>
            (this.lists[listidx].items.find((it) => i.id === it.id).isDone =
              i.val)
        );
        this.checkIfListDone(listidx);
      } else if (type === "itemDeleted") {
        const idxs = update.itemIds.map((i) =>
          this.lists[listidx].items.findIndex((it) => it.id === i)
        );

        idxs.sort((a, b) => b - a);
        idxs.forEach((i) => this.lists[listidx].items.splice(i, 1));
        this.checkIfListDone(listidx);
      } else if (type === "itemEdited") {
        update.itemUpdates.forEach(
          (i) =>
            (this.lists[listidx].items.find((it) => i.id === it.id).text =
              i.val)
        );
      } else if (type === "itemAdded") {
        update.itemUpdates.forEach((i) =>
          this.lists[listidx].items.push({
            text: i.val,
            isDone: false,
            id:
              this.lists[listidx].items.reduceRight(
                (a, v) => Math.max(a, v.id),
                0
              ) + 1,
          })
        );
        this.checkIfListDone(listidx);
      } else if (type === "listSkippedUpdate") {
        this.lists[listidx].isSkipped = update.isSkipped;
      } else if (type === "loadDefaultList") {
        api_util.getDefaultList(this.authToken.value, id, (res) => {
          this.lists[listidx] = res.data;
        });
        api_util.deleteListFromServer(this.authToken.value, id);
        setTimeout(() => this.streakUpdateFlag++, 50);
        return;
      } else if (type === "itemMovedToList") {
        const idx = this.lists[listidx].items.findIndex(
          (it) => it.id === update.itemId
        );
        api_util.addItemToList(
          this.authToken.value,
          this.lists[listidx].items[idx],
          api_util.siblingListId(this.lists[listidx].id, update.moveAmt)
        );
        this.lists[listidx].items.splice(idx, 1);
        this.checkIfListDone(listidx);
      } else if (type === "editDefaultList") {
        this.displayEditDefaultList(this.lists[listidx].id.split("_")[0]);
        return;
      } else {
        console.log("unknown list update,", type);
        return;
      }
      this.pushListToServer(this.lists[listidx]);
      setTimeout(() => this.streakUpdateFlag++, 50);
    },
  },
  watch: {
    selectedDate(newval) {
      this.getListsFromServer(newval);
    },
  },
  mounted() {
    // console.log("main comp mounted");
    this.getListsFromServer(this.selectedDate);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-main-component {
  max-width: 600px;
  margin: auto;
}
</style>
