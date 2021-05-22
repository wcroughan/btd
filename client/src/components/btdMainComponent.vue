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
    };
  },
  inject: ["authToken"],
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
          break;
        case "listSkippedUpdate":
          this.lists[listidx].isSkipped = update.isSkipped;
          break;
        case "loadDefaultList":
          api_util.getDefaultList(this.authToken.value, id, (res) => {
            console.log(res);
            this.lists[listidx] = res.data;
          });
          api_util.deleteListFromServer(this.authToken.value, id);
          return;
        case "itemMovedToList": //list might be done
          api_util.addItemToList(
            this.authToken.value,
            this.lists[listidx].items[update.itemIdx],
            api_util.siblingListId(
              this.authToken.value,
              this.lists[listidx].id,
              update.moveAmt
            )
          );
          this.lists[listidx].items.splice(update.itemIdx, 1);
          this.checkIfListDone(listidx);
          break;
        case "editDefaultList":
          this.displayEditDefaultList(this.lists[listidx].id.split("_")[0]);
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
