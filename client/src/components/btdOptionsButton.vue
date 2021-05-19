<template>
  <div class="options-button-container">
    <!-- <button
      class="main-button"
      :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
      @click="optionsClicked"
      v-click-away="clickNotOnOptionsButton"
    > -->
    <img
      src="../assets/ellipsis.png"
      class="main-button"
      :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
      @click="optionsClicked"
      v-click-away="clickNotOnOptionsButton"
    />
    <!-- </button> -->
    <div
      class="non-menu-mask"
      :class="{ 'visible-mask': displayDropdownOptions }"
    />
    <div
      class="dropdown-content"
      :class="{ 'visible-dropdown': displayDropdownOptions }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdListItem",
  data() {
    return {
      displayDropdownOptions: false,
    };
  },
  props: {
    mouseHovering: Boolean,
  },
  computed: {
    displayOptionsButton() {
      return this.mouseHovering || this.displayDropdownOptions;
    },
  },
  methods: {
    clickNotOnOptionsButton(event) {
      if (
        !event.path.some(
          (e) =>
            e.className !== undefined &&
            e.className.includes("dropdown-content")
        )
      ) {
        this.displayDropdownOptions = false;
      }
    },
    optionsClicked() {
      this.displayDropdownOptions = !this.displayDropdownOptions;
    },
    hideMenu() {
      this.displayDropdownOptions = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.options-button-container {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  z-index: 9001;
  /* background-color: white; */
}
.dropdown-content button {
  display: block;
}
.visible-dropdown {
  display: block;
}
.main-button {
  background-color: inherit;
  border-width: 0px;
  /* vertical-align: super; */
  height: 20px;
}
.non-menu-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9000;
}
.visible-mask {
  display: block;
}

@media (pointer: fine) {
  button {
    transition: 0.1s;
  }
  .visible-button {
    opacity: 100;
  }
  .hidden-button {
    opacity: 0;
  }
}
</style>
