<template>
  <div class="item-title-display">
    <component class="title-display-text" :is="itemTitleComponentType">{{
      text
    }}</component>
  </div>
</template>

<script>
export default {
  name: "btdItemTitleDisplay",
  data() {
    return {};
  },
  props: {
    text: String,
    isDone: Boolean,
  },
  computed: {
    itemTitleComponentType() {
      return this.isDone ? "s" : "b";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
