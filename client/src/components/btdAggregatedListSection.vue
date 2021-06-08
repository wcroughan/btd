<template>
  <div class="agglistsection">
    <btd-list-header
      :numItems="items.length + doneItems.length"
      :numComplete="doneItems.length"
      :title="listInfo.title"
    />
    <div class="done-rearrange-container">
      <button @click="dragModeEnabled = false" v-if="dragModeEnabled">
        Done Rearranging
      </button>
    </div>
    <div class="sectionbody">
      <!-- <transition-group name="listitems">
        <btd-list-item v-for="item in items" :item="item" :key="item._id" />
      </transition-group> -->
      <draggable
        v-model="items"
        :item-key="(v) => v._id"
        handle=".list-item-handle"
        tag="transition-group"
        :component-data="{
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div class="list-item">
            <div class="list-item-handle" v-if="dragModeEnabled">
              <div class="handlebar" />
              <div class="handlebar" />
              <div class="handlebar" />
              <div class="handlebar" />
            </div>
            <btd-list-item
              class="list-item-content"
              :item="element"
              :hideCheckbox="dragModeEnabled"
              :hideMenu="dragModeEnabled"
              @dragModeEnabled="dragModeEnabled = $event"
            />
            <div
              class="list-item-delete"
              @click="deleteItem(element._id)"
              v-if="dragModeEnabled"
            >
              <div class="deletebar delete1" />
              <div class="deletebar delete2" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="sectionfooter" v-if="doneItems.length > 0">
      <transition name="doneitems-trans">
        <div class="doneitems" v-if="showDoneItems">
          <div class="sectionfooterspacer" />
          <transition-group name="donelisttrans">
            <btd-list-item
              class="done-item"
              v-for="item in doneItems"
              :item="item"
              :key="item._id"
            />
          </transition-group>
        </div>
      </transition>
      <button @click="showDoneItems = !showDoneItems">
        {{
          showDoneItems
            ? "Hide Completed"
            : `Show Completed (${doneItems.length})`
        }}
      </button>
    </div>
  </div>
</template>

<script>
import btdListHeader from "./btdListHeader.vue";
import btdListItem from "./btdListItem.vue";
// import _ from "underscore";
import draggable from "vuedraggable";
import { mapActions } from "vuex";

export default {
  name: "BtdAggregatedListItem",
  components: {
    btdListHeader,
    btdListItem,
    draggable,
  },
  props: {
    listInfo: Object,
  },
  data() {
    return {
      showDoneItems: true,
      drag: false,
      dragModeEnabled: false,
      itemOrders: this.listInfo.getItems().map((i) => i.displayOrder),
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        ghostClass: "ghost",
      };
    },
    items: {
      get() {
        return this.listInfo.getItems();
      },
      set(val) {
        console.log("TODO send item updates to state");
        val.forEach((v, i) => (v.displayOrder = this.itemOrders[i]));
        this.updateItems(val);
      },
    },
    doneItems() {
      const ret = this.listInfo.getDoneItems();
      //   console.log("doneItems: ", ret);
      return ret;
    },
  },
  methods: {
    ...mapActions("todolist", ["updateItems"]),
  },
  created() {
    // console.log("creating section with info: ", this.listInfo);
  },
};
</script>

<style scoped>
.agglistsection {
  /* border: 2px solid black; */
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px;
  padding-top: 0px;
  /* box-shadow: 10px 10px 0 0 rgba(black, 0.03); */
  background-color: white;
}

.done-item {
  font-size: 0.8rem;
  user-select: none;
  text-decoration: line-through;
}
/* .done-item:first-child {
  padding-top: 2em;
} */
.sectionfooterspacer {
  height: 1em;
}

/* .sectionfooter > button { */
button {
  position: relative;
  color: rgb(60, 60, 211);
  border-width: 0;
  font-weight: bold;
  font-size: 1em;
  background-color: inherit;
  padding-top: 10px;
}

.doneitems-trans-enter-from,
.doneitems-trans-leave-to {
  transform: translateY(-50%) scaleY(0);
}
.doneitems-trans-enter-active,
.doneitems-trans-leave-active {
  transition: all 0.15s;
}

.donelisttrans-enter-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.donelisttrans-leave-active {
  position: absolute;
  /* top: 0px; */
  /* transition: transform 0.3s ease, opacity 0.2s ease; */
}
.donelisttrans-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.donelisttrans-move {
  transition: transform 0.25s ease;
}

.listitems-leave-active {
  position: absolute;
  /* top: 0px; */
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.listitems-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.listitems-move {
  transition: transform 0.25s ease;
}

.flip-list-move {
  transition: transform 0.5s ease;
}

.ghost {
  opacity: 0.5;
}
.list-item {
  display: flex;
  width: 100%;
}
.list-item-content {
  flex-grow: 1;
}
.list-item-handle {
  display: flex;
  flex-direction: column;
  min-width: 30px;
  min-height: 30px;
  justify-content: center;
}
.handlebar {
  background-color: black;
  width: 20px;
  min-height: 1px;
  margin: 1px 0px;
}

.deletebar {
  position: absolute;
  background-color: red;
  min-width: 20px;
  min-height: 2px;
  right: 0px;
}
.list-item-delete {
  position: relative;
  min-width: 30px;
  min-height: 30px;
}
.list-item-delete:hover > .deletebar {
  background-color: lightcoral;
}
.delete1 {
  transform: translateY(15px) translateX(-5px) rotate(45deg);
  top: 0px;
}
.delete2 {
  transform: translateY(15px) translateX(-5px) rotate(-45deg);
}

.done-rearrange-container {
  display: flex;
  justify-content: flex-start;
}
</style>
