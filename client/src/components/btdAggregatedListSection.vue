<template>
  <div class="agglistsection">
    <btd-list-header
      :numItems="items.length + doneItems.length"
      :numComplete="doneItems.length"
      :title="title"
    />
    <div class="sectionbody">
      <btd-list-item v-for="(item, idx) in items" :item="item" :key="idx" />
    </div>
    <div class="sectionfooter" v-if="doneItems.length > 0">
      <transition name="doneitems-trans">
        <div class="doneitems" v-if="showDoneItems">
          <btd-list-item
            class="done-item"
            v-for="item in doneItems"
            :item="item"
            :key="item.id"
          />
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
import { mapState } from "vuex";
import btdListHeader from "./btdListHeader.vue";
import btdListItem from "./btdListItem.vue";

export default {
  name: "BtdAggregatedListItem",
  components: {
    btdListHeader,
    btdListItem,
  },
  props: {
    start: Date,
    end: Date,
    title: String,
  },
  data() {
    return {
      showDoneItems: true,
    };
  },
  computed: {
    ...mapState({
      items(state) {
        return state.todoItems.filter(
          (i) =>
            !i.isDone &&
            i.dueDate.getTime() <= this.end.getTime() &&
            i.dueDate.getTime() > this.start.getTime()
        );
        // return state.todoItems;
      },
      doneItems(state) {
        return state.todoItems.filter(
          (i) =>
            i.isDone &&
            i.doneDate.getTime() <= this.end.getTime() &&
            i.doneDate.getTime() > this.start.getTime()
        );
      },
    }),
  },
  created() {
    // setInterval(() => {
    //   console.log(this.items);
    // }, 1000);
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
.done-item:first-child {
  padding-top: 2em;
}

.sectionfooter > button {
  color: rgb(60, 60, 211);
  border-width: 0;
  font-weight: bold;
  font-size: 1em;
  background-color: inherit;
  padding-top: 10px;
}
</style>
