<template>
  <div class="item-title-display">
    <span
      class="title-display-text"
      :class="{ strike: isDone }"
      @mousedown="mousedown"
    >
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
  computed: {
    itemTitleComponentType() {
      return this.isDone ? "s" : "b";
    },
  },
  methods: {
    mousedown(e) {
      e.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-title-display {
  white-space: normal;
  word-wrap: break-word;
  max-width: 95%;
}
/* .strike {
  text-decoration: line-through;
} */
</style>
