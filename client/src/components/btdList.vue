
<template>
  <div class="btd-list">
    <btd-list-header
      :title="title"
      :numItems="list.items.length"
      :numComplete="numComplete"
      :isSkipped="list.isSkipped"
    />
    <div class="list-body">
      <btd-list-item
        v-for="(item, idx) in list.items"
        :key="idx"
        :text="item.text"
        :isDone="item.isDone"
        @itemDoneUpdate="itemDoneUpdate(idx, $event)"
        :class="item.isDone ? 'done-item' : 'pending-item'"
      />
    </div>
  </div>
</template>

<script>
import BtdListHeader from "./btdListHeader.vue";
import BtdListItem from "./btdListItem.vue";
// import date_util from "../utility/date_util";

export default {
  name: "btdList",
  components: {
    BtdListHeader,
    BtdListItem,
  },
  data() {
    return {};
  },
  props: {
    list: Object,
  },
  emits: ["itemDoneUpdate"],
  computed: {
    title() {
      const id = this.list.id;
      return id;
      // if (id.substring(0,3) === "day") {
      // return date_util.formatDate(list)
      // }
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
      this.$emit("itemDoneUpdate", { itemidx: idx, done });
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
</style>
