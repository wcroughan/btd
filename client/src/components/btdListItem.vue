<template>
  <div
    class="btd-list-item"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <input type="checkbox" @change="handleCheckbox($event)" :checked="isDone" />
    <component
      class="todo-item-title"
      :is="isDone ? 's' : 'b'"
      @click="textClicked"
      >{{ text }}</component
    >
    <!-- TODO make this a reusable component, so can also use for list options. How to pass exact button specifications? Especially for checkboxes? -->
    <div class="options-button-container">
      <button
        :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
        @click="optionsClicked"
        @focusin="focusChange($event)"
        @focusout="optionsBlur($event)"
        v-click-away="clickNotOnOptionsButton"
      >
        ...
      </button>
      <div
        class="dropdown-content"
        :class="{ 'visible-dropdown': displayDropdownOptions }"
        @focusin="focusChange($event)"
        @focusout="optionsBlur($event)"
      >
        <button>Hello</button>
        <button>You</button>
        <button>There</button>
      </div>
    </div>
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdListItem",
  data() {
    return {
      mouseIn: false,
      displayDropdownOptions: false,
      focusCounter: 0,
    };
  },
  props: {
    text: String,
    isDone: Boolean,
  },
  emits: ["itemDoneUpdate"],
  computed: {
    displayOptionsButton() {
      return this.mouseIn || this.displayDropdownOptions;
    },
  },
  methods: {
    focusChange(a) {
      console.log("focus change", a);
    },
    optionsBlur(a) {
      console.log("blur", a);
      //   this.displayDropdownOptions = false;
    },
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
    handleCheckbox(event) {
      this.$emit("itemDoneUpdate", event.target.checked);
    },
    optionsClicked() {
      this.displayDropdownOptions = !this.displayDropdownOptions;
    },
    textClicked() {
      this.$emit("itemDoneUpdate", !this.isDone);
    },
    mof(a) {
      console.log("mouseover", a);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-item-title {
  flex-grow: 1;
}
.btd-list-item {
  display: flex;
  justify-content: center;
  margin: 5px 0px;
}
.options-button-container {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: white;
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
