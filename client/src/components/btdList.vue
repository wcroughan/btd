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
      <div
        v-for="item in list.items"
        class="test-item"
        :key="list.id + '_' + item.id + '_test'"
        @click="itemDoneUpdate(item.id, !item.isDone)"
      >
        {{ item }}
      </div>
      <transition-group name="testlist">
        <div
          v-for="item in itemsNotDone"
          class="test-item"
          :key="list.id + '_' + item.id + '_test'"
          @click="itemDoneUpdate(item.id, !item.isDone)"
        >
          {{ item }}
        </div>
      </transition-group>
      <transition-group name="list">
        <btd-list-item
          v-for="item in itemsNotDone"
          class="list-item"
          :key="list.id + '_' + item.id + '_nd'"
          :text="item.text"
          :isDone="item.isDone"
          @itemDoneUpdate="itemDoneUpdate(item.id, $event)"
          @itemDeleted="itemDeleted(item.id)"
          @itemMoved="itemMoved(item.id, $event)"
          @itemEdited="itemEdited(item.id, $event)"
          :class="item.isDone ? 'done-item' : 'pending-item'"
        />
      </transition-group>
      <component
        class="add-item-button"
        :is="isAddingItem ? 'btd-item-title-edit' : 'button'"
        v-on="isAddingItem ? {} : { click: addItemClicked }"
        @doneEditing="doneEditing"
        @canceledEditing="canceledEditing"
        key="-1"
        >+ Add Item</component
      >
      <btd-list-item
        v-for="item in itemsDone"
        :key="list.id + '_' + item.id + '_nd'"
        :text="item.text"
        :isDone="item.isDone"
        @itemDoneUpdate="itemDoneUpdate(item.id, $event)"
        @itemDeleted="itemDeleted(item.id)"
        @itemMoved="itemMoved(item.id, $event)"
        @itemEdited="itemEdited(item.id, $event)"
        :class="item.isDone ? 'done-item' : 'pending-item'"
      />
    </div>
  </div>
</template>

<script>
import BtdListHeader from "./btdListHeader.vue";
import BtdListItem from "./btdListItem.vue";
import btdItemTitleEdit from "./btdItemTitleEdit.vue";
import { nextTick } from "vue";
// import date_util from "../utility/date_util";
// const _ = require("underscore");

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
      testitems: [1, 2, 3, 4, 5],
    };
  },
  props: {
    list: Object,
  },
  emits: ["listUpdate"],
  computed: {
    itemsDone() {
      return this.list.items.filter((v) => v.isDone);
    },
    itemsNotDone() {
      return this.list.items.filter((v) => !v.isDone);
    },
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
        // console.log(this.list.start);
        const formatOptions = {
          month: "numeric",
          day: "numeric",
        };
        const dtf = new Intl.DateTimeFormat("en-US", formatOptions);
        return (
          dtf.format(new Date(this.list.start)) +
          " - " +
          dtf.format(new Date(this.list.end) - 1)
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
    itemDoneUpdate(id, done) {
      const body = {
        type: "itemDoneUpdate",
        itemUpdates: [
          {
            id,
            val: done,
          },
        ],
      };
      this.$emit("listUpdate", body);
    },
    itemDeleted(id) {
      this.$emit("listUpdate", { type: "itemDeleted", itemIds: [id] });
    },
    itemMoved(id, moveAmt) {
      this.$emit("listUpdate", {
        type: "itemMovedToList",
        itemId: id,
        moveAmt,
      });
    },
    itemEdited(id, newval) {
      const body = {
        type: "itemEdited",
        itemUpdates: [
          {
            id,
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
            id: this.list.items[i].id,
            val,
          };
        }),
      };
      //   console.log(body);

      this.$emit("listUpdate", body);
    },
    loadDefaultList() {
      this.$emit("listUpdate", { type: "loadDefaultList" });
    },
    editDefaultList() {
      this.$emit("listUpdate", { type: "editDefaultList" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-body {
  /* display: flex; */
  /* flex-direction: column; */
  max-width: 600px;
  margin: auto;
  position: relative;
}
.done-item {
  order: 2;
  font-size: 0.8em;
}
.pending-item {
  order: 0;
}
.add-item-button {
  order: 1;
  color: blue;
  border-width: 0;
  font-weight: bold;
  font-size: 1em;
  background-color: inherit;
  padding-bottom: 20px;
  /* transition: transform 0.2s ease; */
}

.list-leave-active {
  position: absolute;
  transition: transform 1.7s ease, opacity 1.6s ease;
}
.list-leave-to {
  transform: translateX(-150px);
  opacity: 0;
}
.list-move {
  transition: transform 1.2s ease;
}
.testlist-leave-active {
  position: absolute;
  transition: transform 1.7s ease, opacity 1.6s ease;
}
.testlist-leave-to {
  transform: translateX(-150px);
  opacity: 0;
}
.testlist-move {
  transition: transform 1.2s ease;
}
</style>
