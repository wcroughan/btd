
<template>
  <div
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
    class="btd-list-header"
  >
    <h1 class="header-title">
      {{ title }}
    </h1>
    <div class="header-info-container">
      <span class="header-info">
        {{ numComplete }}/{{ numItems }}
        <img
          class="skipped-icon"
          v-if="isSkipped"
          alt="Skipped"
          src="../assets/curved-arrow.png"
        />
      </span>
      <div class="header-info-spacer-vert" />
    </div>
    <div class="header-spacer" />
    <btd-options-button class="list-options" :mouseHovering="mouseIn">
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
.btd-list-header {
  display: flex;
  justify-content: space-between;
  /* display: inline-block; */
  /* background-color: khaki; */
}
.header-title {
  /* display: inline; */
  /* float: left; */
  flex-grow: 0;
  /* background-color: lavender; */
}
.header-spacer {
  flex-grow: 1;
  /* background-color: lawngreen; */
}
.list-options {
  align-self: center;
  flex-grow: 0;
  /* background-color: lightcoral; */
}
.header-info-container {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  justify-content: space-between;
  /* background-color: lightskyblue; */
  padding: 0px 20px;
}
.header-info {
  flex-grow: 1;
  /* background-color: magenta; */
  /* padding: auto; */
  transform: translate(0%, 40%);
}
.header-info-spacer-vert {
  flex-grow: 1;
  /* background-color: maroon; */
}
.skipped-icon {
  width: 20px;
}
</style>
