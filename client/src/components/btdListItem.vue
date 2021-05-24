<template>
  <div
    class="btd-list-item"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <!-- <input type="checkbox" @change="handleCheckbox($event)" :checked="isDone" /> -->
    <component
      class="todo-item-title"
      ref="itemText"
      :is="itemTitleComponentType"
      @click="textClicked"
      :text="text"
      :isDone="isDone"
      @doneEditing="doneEditing"
      @canceledEditing="canceledEditing"
    />
    <btd-options-button ref="itemOptionsMenu" :mouseHovering="mouseIn">
      <div class="options-button-container">
        <button class="options-button" @click="editButtonClicked">edit</button>
        <button class="options-button" @click="deleteButtonClicked">
          delete
        </button>
        <button class="options-button" @click="moveToYesterdayClicked">
          move to yesterday
        </button>
        <button class="options-button" @click="moveToTomorrowClicked">
          move to tomorrow
        </button>
      </div>
    </btd-options-button>
  </div>
</template>

<script>
import btdOptionsButton from "./btdOptionsButton.vue";
// import date_util from "./../utility/date_util.js";
// import { nextTick } from "vue";
import btdItemTitleDisplay from "./btdItemTitleDisplay.vue";
import btdItemTitleEdit from "./btdItemTitleEdit.vue";
import { nextTick } from "@vue/runtime-core";

export default {
  components: { btdOptionsButton, btdItemTitleDisplay, btdItemTitleEdit },
  name: "btdListItem",
  data() {
    return {
      mouseIn: false,
      isEditing: false,
    };
  },
  props: {
    text: String,
    isDone: Boolean,
  },
  emits: ["itemDoneUpdate", "itemDeleted", "itemMoved", "itemEdited"],
  computed: {
    itemTitleComponentType() {
      if (this.isEditing) return "btd-item-title-edit";
      else return "btd-item-title-display";
    },
  },
  methods: {
    handleCheckbox(event) {
      this.$emit("itemDoneUpdate", event.target.checked);
    },
    textClicked() {
      if (!this.isEditing) this.$emit("itemDoneUpdate", !this.isDone);
    },
    titleClickAway() {
      this.isEditing = false;
    },
    deleteButtonClicked() {
      this.$refs.itemOptionsMenu.hideMenu();
      nextTick(() => {
        this.$emit("itemDeleted");
      });
    },
    moveToYesterdayClicked() {
      this.$refs.itemOptionsMenu.hideMenu();
      this.$emit("itemMoved", -1);
    },
    moveToTomorrowClicked() {
      this.$refs.itemOptionsMenu.hideMenu();
      this.$emit("itemMoved", 1);
    },
    editButtonClicked() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        console.log("hi");
        console.log(this.$refs.itemText);
        this.$refs.itemOptionsMenu.hideMenu();
        // nextTick(() => {
        //   this.$refs.itemText.focusInput();
        // });
      } else {
        console.log("this shouldn't happen");
      }
    },
    doneEditing(newname) {
      this.isEditing = false;
      this.$emit("itemEdited", newname);
    },
    canceledEditing() {
      this.isEditing = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-list-item {
  display: flex;
  justify-content: center;
  margin: 5px 0px;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  align-items: center;
  font-size: 1.5em;
}
.todo-item-title {
  flex-grow: 1;
}
.options-button-container {
  display: flex;
  flex-direction: column;
}
.options-button {
  background-color: rgb(250, 250, 250);
  border-width: 1px;
  display: block;
  white-space: nowrap;
  padding: 5px;
  font-size: 1em;
  width: inherit;
}
</style>
