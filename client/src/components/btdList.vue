
<template>
  <div class="btd-list">
    <btd-list-header
      :title="title"
      :numItems="list.items.length"
      :numComplete="numComplete"
      :isSkipped="list.isSkipped"
      @updateSkipped="updateSkipped"
      @setAllDone="setAllDone"
      @loadDefaultList="loadDefaultList"
      @editDefaultList="editDefaultList"
    />
    <div class="list-body">
      <btd-list-item
        v-for="(item, idx) in list.items"
        :key="idx"
        :text="item.text"
        :isDone="item.isDone"
        @itemDoneUpdate="itemDoneUpdate(idx, $event)"
        @itemDeleted="itemDeleted(idx)"
        @itemMoved="itemMoved(idx, $event)"
        @itemEdited="itemEdited(idx, $event)"
        :class="item.isDone ? 'done-item' : 'pending-item'"
      />
      <component
        class="add-item-button"
        :is="isAddingItem ? 'btd-item-title-edit' : 'button'"
        v-on="isAddingItem ? {} : { click: addItemClicked }"
        @doneEditing="doneEditing"
        @canceledEditing="canceledEditing"
        >+ Add Item</component
      >
    </div>
  </div>
</template>

<script>
import BtdListHeader from "./btdListHeader.vue";
import BtdListItem from "./btdListItem.vue";
import btdItemTitleEdit from "./btdItemTitleEdit.vue";
import { nextTick } from "vue";
// import date_util from "../utility/date_util";

export default {
  name: "btdList",
  components: {
    BtdListHeader,
    BtdListItem,
    btdItemTitleEdit,
  },
  data() {
    return {
      isAddingItem: false,
    };
  },
  props: {
    list: Object,
  },
  emits: ["listUpdate"],
  computed: {
    title() {
      const id = this.list.id;
      if (id.substring(0, 4) === "day_") {
        const formatOptions = {
          weekday: "short",
          month: "short",
          day: "numeric",
        };
        return new Intl.DateTimeFormat("en-US", formatOptions).format(
          new Date(this.list.start)
        );
      } else if (id.substring(0, 5) === "week_") {
        console.log(this.list.start);
        const formatOptions = {
          month: "numeric",
          day: "numeric",
        };
        const dtf = new Intl.DateTimeFormat("en-US", formatOptions);
        return (
          dtf.format(new Date(this.list.start)) +
          " - " +
          dtf.format(new Date(this.list.end))
        );
      } else return id;
    },
    numComplete() {
      return this.list.items.reduceRight(
        (a, v) => (v.isDone ? a + 1 : a + 0),
        0
      );
    },
  },
  methods: {
    itemDoneUpdate(idx, done) {
      const body = {
        type: "itemDoneUpdate",
        itemUpdates: [
          {
            idx,
            val: done,
          },
        ],
      };
      this.$emit("listUpdate", body);
    },
    itemDeleted(idx) {
      this.$emit("listUpdate", { type: "itemDeleted", itemIdxs: [idx] });
    },
    itemMoved(idx, moveAmt) {
      this.$emit("listUpdate", {
        type: "itemMovedToList",
        itemidx: idx,
        moveAmt,
      });
    },
    itemEdited(idx, newval) {
      const body = {
        type: "itemEdited",
        itemUpdates: [
          {
            idx,
            val: newval,
          },
        ],
      };
      this.$emit("listUpdate", body);
    },
    addItemClicked() {
      if (!this.isAddingItem) this.isAddingItem = true;
    },
    doneEditing(text) {
      const body = {
        type: "itemAdded",
        itemUpdates: [
          {
            val: text,
          },
        ],
      };
      this.$emit("listUpdate", body);
      nextTick(() => (this.isAddingItem = false));
    },
    canceledEditing() {
      this.isAddingItem = false;
      nextTick(() => (this.isAddingItem = false));
    },
    updateSkipped(val) {
      this.$emit("listUpdate", { type: "listSkippedUpdate", isSkipped: val });
    },
    setAllDone(val) {
      const body = {
        type: "itemDoneUpdate",
        itemUpdates: [...Array(this.list.items.length).keys()].map((i) => {
          return {
            idx: i,
            val,
          };
        }),
      };
      console.log(body);

      this.$emit("listUpdate", body);
    },
    loadDefaultList() {
      this.$emit("listUpdate", { type: "loadDefaultList" });
    },
    editDefaultList() {
      this.$emit("listUpdate", { type: "loadDefaultList" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-body {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
}
.done-item {
  order: 1;
}
.pending-item {
  order: 0;
}
.add-item-button {
  order: 2;
  color: blue;
  border-width: 0;
  font-weight: bold;
}
</style>
