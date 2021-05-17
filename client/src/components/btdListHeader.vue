
<template>
  <div class="btd-list-header">
    {{ numItems }}{{ numComplete }}{{ isSkipped }}{{ title }}
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdListHeader",
  data() {
    return {};
  },
  props: {
    numItems: Number,
    numComplete: Number,
    isSkipped: Boolean,
    title: String,
  },
  computed: {
    isComplete() {
      return this.numItems === this.numComplete;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
