<template>
  <div class="item-title-display">
    <span class="title-display-text" :class="{ strike: isDone }">
      &nbsp;&nbsp;{{ text }}&nbsp;&nbsp;
    </span>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-title-display {
  white-space: normal;
  word-wrap: break-word;
  max-width: 95%;
  padding-left: 1em;
  text-indent: -1em;
  user-select: none;
}
/* .strike {
  text-decoration: line-through;
} */
</style>
