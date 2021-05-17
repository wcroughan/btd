<template>
  <div class="options-button-container">
    <button
      :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
      @click="optionsClicked"
      v-click-away="clickNotOnOptionsButton"
    >
      ...
    </button>
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
  z-index: 1;
  /* background-color: white; */
}
.dropdown-content button {
  display: block;
}
.visible-dropdown {
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
