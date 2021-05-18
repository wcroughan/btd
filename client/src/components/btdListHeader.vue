
<template>
  <div
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
    class="btd-list-header"
  >
    {{ title }} {{ numComplete }}/{{ numItems
    }}{{ isSkipped ? ": skipped" : " active" }}
    <btd-options-button :mouseHovering="mouseIn">
      <div>
        <input type="checkbox" v-model="skipChecked" />
        <button class="options-button" @click="skipButtonClicked">Skip</button>
      </div>
      <button class="options-button" @click="markAllClicked">
        {{ markAllText }}
      </button>
      <button class="options-button" @click="loadDefaultClicked">
        Load Default List
      </button>
      <button class="options-button" @click="editDefaultClicked">
        Edit Default List
      </button>
    </btd-options-button>
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

import btdOptionsButton from "./btdOptionsButton.vue";

export default {
  name: "btdListHeader",
  components: { btdOptionsButton },
  data() {
    return {
      mouseIn: false,
      skipChecked: this.isSkipped,
    };
  },
  props: {
    numItems: Number,
    numComplete: Number,
    isSkipped: Boolean,
    title: String,
  },
  emits: ["updateSkipped", "setAllDone", "loadDefaultList", "editDefaultList"],
  computed: {
    isComplete() {
      return this.numItems === this.numComplete;
    },
    markAllText() {
      if (this.isComplete) return "Mark all incomplete";
      return "Mark all complete";
    },
  },
  methods: {
    skipButtonClicked() {
      this.skipChecked = !this.skipChecked;
    },
    markAllClicked() {
      this.$emit("setAllDone", !this.isComplete);
    },
    loadDefaultClicked() {
      this.$emit("loadDefaultList");
    },
    editDefaultClicked() {
      this.$emit("editDefaultList");
    },
  },
  watch: {
    skipChecked(newval) {
      this.$emit("updateSkipped", newval);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
