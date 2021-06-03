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
      <div class="header-info-spacer-vert" />
    </div>
    <div class="header-spacer" />
    <btd-dropdown
      menuAlign="right"
      class="menu-button"
      ref="menuDropdown"
      :closeOnAnyClick="true"
      v-show="persistentOptions || mouseIn || menuShowing"
      :onContentMounted="menuMounted"
      :onContentUnmounted="menuUnmounted"
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
      </template>
    </btd-dropdown>
  </div>
</template>

<script>
import BtdDropdown from "./btdDropdown.vue";

export default {
  name: "btdListHeader",
  components: {
    BtdDropdown,
  },
  data() {
    return {
      mouseIn: false,
      persistentOptions: false,
      menuShowing: false,
    };
  },
  props: {
    numItems: Number,
    numComplete: Number,
    title: String,
  },
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
    menuMounted() {
      this.menuShowing = true;
    },
    menuUnmounted() {
      this.menuShowing = false;
    },
    markAllClicked() {
      console.log("TODO");
    },
  },
  mounted() {
    this.persistentOptions = !window.matchMedia("(pointer: fine)").matches;
    // this.persistentOptions = true;
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
.completion-status-enter-from {
  transform: rotateZ(-360deg) scale(0);
}
</style>
