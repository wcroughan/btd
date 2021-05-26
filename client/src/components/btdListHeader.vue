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
      <div class="completion-container">
        <transition name="completion-status" mode="out-in">
          <span v-if="!isComplete" class="header-info">
            {{ numComplete }}/{{ numItems }}
          </span>
          <img v-else src="../assets/check.png" class="checkimg" />
        </transition>
      </div>
      <img
        class="skipped-icon"
        v-if="isSkipped"
        alt="Skipped"
        src="../assets/curved-arrow.png"
      />
      <div class="header-info-spacer-vert" />
    </div>
    <div class="header-spacer" />
    <btd-dropdown
      menuAlign="right"
      class="menu-button"
      ref="menuDropdown"
      :closeOnAnyClick="false"
      v-show="persistentOptions || mouseIn"
    >
      <template v-slot:button>
        <img src="../assets/ellipsis.png" class="menu-icon" />
      </template>
      <template v-slot:content>
        <section class="dropdown-option">
          <button @click="markAllClicked">
            {{ markAllText }}
          </button>
        </section>
        <section class="dropdown-option">
          <button @click="skipButtonClicked">Skip</button>
        </section>
        <section class="dropdown-option">
          <button @click="loadDefaultClicked">Load Default List</button>
        </section>
        <section class="dropdown-option">
          <button @click="editDefaultClicked">Edit Default List</button>
        </section>
      </template>
    </btd-dropdown>
  </div>
</template>

<script>
import BtdDropdown from "./btdDropdown.vue";
// import date_util from "./../utility/date_util.js";

// import btdOptionsButton from "./btdOptionsButton.vue";

export default {
  name: "btdListHeader",
  components: {
    //    btdOptionsButton,
    BtdDropdown,
  },
  data() {
    return {
      mouseIn: false,
      persistentOptions: false,
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
      this.$emit("updateSkipped", !this.isSkipped);
    },
    markAllClicked() {
      this.$emit("setAllDone", !this.isComplete);
    },
    loadDefaultClicked() {
      this.$refs.menuDropdown.hideMenu();
      this.$emit("loadDefaultList");
    },
    editDefaultClicked() {
      this.$refs.menuDropdown.hideMenu();
      this.$emit("editDefaultList");
    },
  },
  mounted() {
    this.persistentOptions = !window.matchMedia("(pointer: fine)").matches;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-list-header {
  display: flex;
  justify-content: space-between;
  /* background-color: teal; */
}

.header-title {
  flex-grow: 0;
  /* background-color: khaki; */
}

.header-info-container {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  justify-content: space-between;
  /* background-color: lightskyblue; */
  padding: 0px 20px;
}
.completion-container {
  flex-grow: 1;
  /* background-color: magenta; */
  transform: translate(0%, 40%);
}
.skipped-icon {
  width: 20px;
}
.checkimg {
  width: 30px;
}
.header-info-spacer-vert {
  flex-grow: 1;
  /* background-color: maroon; */
}

.header-spacer {
  flex-grow: 1;
  /* background-color: coral; */
}
.menu-button {
  align-self: center;
}
.menu-icon {
  height: 20px;
}

.completion-status-enter-active {
  transition: all 0.4s ease;
}
/* .completion-status-leave-active {
  transition: all 0.4s ease;
} */
.completion-status-enter-from,
.completion-status-leave-to {
  transform: rotateZ(-360deg) scale(0);
}
</style>
