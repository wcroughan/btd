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
      <transition-group name="list">
        <btd-list-item
          v-for="item in itemsNotDone"
          class="list-item"
          :key="list.id + '_' + item.id + '_nd'"
          :text="item.text"
          :isDone="item.isDone"
          :type="listType"
          @itemDoneUpdate="itemDoneUpdate(item.id, $event)"
          @itemDeleted="itemDeleted(item.id)"
          @itemMoved="itemMoved(item.id, $event)"
          @itemEdited="itemEdited(item.id, $event)"
        />
      </transition-group>
      <div class="list-footer">
        <component
          class="add-item-button"
          :class="isAddingItem ? 'growedit' : ''"
          :is="isAddingItem ? 'btd-item-title-edit' : 'button'"
          v-on="isAddingItem ? {} : { click: addItemClicked }"
          @doneEditing="doneEditing"
          @canceledEditing="canceledEditing"
          key="list.id + '_-1'"
          >+ Add Item</component
        >
        <button
          v-show="itemsDone.length > 0"
          @click="showCompleted = !showCompleted"
          class="show-completed-button"
        >
          {{
            showCompleted
              ? "Hide Completed"
              : `Show Completed (${itemsDone.length})`
          }}
        </button>
      </div>
      <transition name="donelist">
        <div class="completed-container" v-if="showCompleted">
          <btd-list-item
            v-for="item in itemsDone"
            :key="list.id + '_' + item.id + '_nd'"
            :text="item.text"
            :isDone="item.isDone"
            @itemDoneUpdate="itemDoneUpdate(item.id, $event)"
            @itemDeleted="itemDeleted(item.id)"
            @itemMoved="itemMoved(item.id, $event)"
            @itemEdited="itemEdited(item.id, $event)"
            class="done-item"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BtdListHeader from "./btdListHeader.vue";
import BtdListItem from "./btdListItem.vue";
import btdItemTitleEdit from "./btdItemTitleEdit.vue";
import { nextTick } from "vue";
import date_util from "../utility/date_util";
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
      showCompleted: false,
    };
  },
  props: {
    list: Object,
  },
  emits: ["listUpdate"],
  computed: {
    listType() {
      return this.list.id.split("_")[0];
    },
    itemsDone() {
      return this.list.items.filter((v) => v.isDone);
    },
    itemsNotDone() {
      return this.list.items.filter((v) => !v.isDone);
    },
    title() {
      const id = this.list.id;
      const type = id.split("_")[0];
      const datestr = id.split("_")[1];
      if (type === "day") {
        const formatOptions = {
          weekday: "short",
          month: "short",
          day: "numeric",
        };
        const d = date_util.getDateFromIdStr(datestr);
        return new Intl.DateTimeFormat("en-US", formatOptions).format(d);
      } else if (type === "week") {
        // console.log(this.list.start);
        const formatOptions = {
          month: "numeric",
          day: "numeric",
        };
        const dtf = new Intl.DateTimeFormat("en-US", formatOptions);
        return (
          dtf.format(date_util.getDateFromIdStr(datestr)) +
          " - " +
          dtf.format(
            date_util.plusOneWeek(
              date_util.yesterday(date_util.getDateFromIdStr(datestr))
            )
          )
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
  position: relative;
}
.list-item {
  font-size: 2rem;
  width: 100%;
  padding: 10px 0px;
  user-select: none;
}
@media only screen and (min-width: 600px) {
  .list-item {
    font-size: 1.5rem;
  }
}

.done-item {
  font-size: 1.3rem;
  user-select: none;
}
.list-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* transition: transform 0.2s ease; */
}
.list-footer > button {
  color: rgb(60, 60, 211);
  border-width: 0;
  font-weight: bold;
  font-size: 1em;
  background-color: inherit;
  padding-bottom: 20px;
}

.show-completed-button {
  flex-grow: 0;
}
.growedit {
  flex-grow: 1;
}

.list-enter-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.list-leave-active {
  position: absolute;
  /* top: 0px; */
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.list-move {
  transition: transform 0.25s ease;
}

.donelist-enter-from,
.donelist-leave-to {
  transform: translateY(-50%) scaleY(0);
}
.donelist-enter-active,
.donelist-leave-active {
  transition: all 0.15s;
}

.btd-list {
  /* border: 2px solid black; */
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px;
  /* box-shadow: 10px 10px 0 0 rgba(black, 0.03); */
  background-color: white;
}
</style>