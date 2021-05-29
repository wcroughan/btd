<template>
  <div class="agglistsection">
    <div class="sectionheader">{{ title }}</div>
    <div class="sectionbody">
      <div v-for="item in items" :key="item.id">{{ item.text }}</div>
    </div>
    <div class="sectionfooter" v-if="doneItems.length > 0">
      <transition name="doneitems-trans">
        <div class="doneitems" v-if="showDoneItems">
          <div v-for="item in doneItems" :key="item.id">{{ item.text }}</div>
        </div>
      </transition>
      <button>Hide Completed</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BtdAggregatedListItem",
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
            i.dueDate.getTime() <= end.getTime() &&
            i.dueDate.getTime() > start.getTime()
        );
      },
      doneItems(state) {
        return state.todoItems.filter(
          (i) =>
            i.isDone &&
            i.doneTime.getTime() <= end.getTime() &&
            i.doneTime.getTime() > start.getTime()
        );
      },
    }),
  },
};
</script>

<style scoped>
</style>
