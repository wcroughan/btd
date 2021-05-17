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
    <div class="options-button-container">
      <button
        :class="displayOptionsButton ? 'visible-button' : 'hidden-button'"
        @click="optionsClicked"
        @focusin="focusChange($event)"
        @focusout="optionsBlur($event)"
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
      //   displayDropdownOptions: false,
      focusCounter: 0,
    };
  },
  props: {
    text: String,
    isDone: Boolean,
  },
  emits: ["itemDoneUpdate"],
  computed: {
    displayDropdownOptions() {
      return this.focusCounter > 0;
    },
    displayOptionsButton() {
      return this.mouseIn || this.displayDropdownOptions;
    },
  },
  methods: {
    focusChange(a) {
      console.log("focus change", a);
      this.focusCounter += 1;
    },
    optionsBlur(a) {
      console.log("blur", a);
      this.focusCounter -= 1;
      //   this.displayDropdownOptions = false;
    },
    caw() {
      console.log("caw! caw!");
    },
    handleCheckbox(event) {
      this.$emit("itemDoneUpdate", event.target.checked);
    },
    optionsClicked() {
      //   this.displayDropdownOptions = !this.displayDropdownOptions;
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
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}
.dropdown-content button {
  display: block;
}
.visible-dropdown {
  display: block;
}

@media screen and (min-width: 680px) {
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
