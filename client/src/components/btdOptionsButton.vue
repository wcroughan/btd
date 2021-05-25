<template>
  <div class="options-button-container">
    <div
      class="button-container"
      @click="optionsClicked"
      :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
    >
      <slot name="button">
        <img :src="iconPath" class="main-button" />
      </slot>
    </div>
    <div
      class="non-menu-mask"
      :class="{ 'visible-mask': displayDropdownOptions }"
      @click="maskClicked"
    />
    <div
      class="dropdown-content"
      :class="[
        { 'visible-dropdown': displayDropdownOptions },
        menuAlign + '-align-menu',
      ]"
    >
      <slot name="menu">
        <div class="fillermenu"><h3>hi</h3></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "btdListItem",
  data() {
    return {
      displayDropdownOptions: false,
    };
  },
  props: {
    mouseHovering: Boolean,
    showOnlyOnHover: {
      type: Boolean,
      default: true,
    },
    iconPath: {
      type: String,
      default: require("../assets/ellipsis.png"),
    },
    menuAlign: {
      type: String,
      default: "right",
    },
  },
  computed: {
    displayOptionsButton() {
      return (
        !this.showOnlyOnHover ||
        this.mouseHovering ||
        this.displayDropdownOptions
      );
    },
  },
  methods: {
    maskClicked(event) {
      console.log(event);
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
  z-index: 9001;
}
.left-align-menu {
  left: 0;
}
.right-align-menu {
  right: 0;
}
.center-align-menu {
  left: 50%;
  transform: translateX(-50%);
}
.visible-dropdown {
  display: block;
}
.button-container {
  background-color: inherit;
  border-width: 0px;
  /* vertical-align: super; */
  /* height: 20px; */
  height: 100%;
}
.main-button {
  background-color: inherit;
  border-width: 0px;
  /* vertical-align: super; */
  /* height: 20px; */
  height: 20px;
}
.non-menu-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
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

.fillermenu {
  height: 100px;
  width: 100px;
  background-color: teal;
}
</style>
