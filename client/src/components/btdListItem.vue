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
    <btd-dropdown
      menuAlign="right"
      class="menu-button"
      ref="itemOptionsMenu"
      :closeOnAnyClick="true"
      v-show="(persistentOptions || mouseIn) && !isEditing"
    >
      <template v-slot:button>
        <img src="../assets/ellipsis.png" class="menu-icon" />
      </template>
      <template v-slot:content>
        <section class="dropdown-option">
          <button @click="editButtonClicked">edit</button>
        </section>
        <section class="dropdown-option">
          <button @click="deleteButtonClicked">delete</button>
        </section>
        <section class="dropdown-option">
          <button @click="moveToTomorrowClicked">move to tomorrow</button>
        </section>
        <section class="dropdown-option">
          <button @click="moveToYesterdayClicked">move to yesterday</button>
        </section>
      </template>
    </btd-dropdown>
  </div>
</template>

<script>
import btdOptionsButton from "./btdOptionsButton.vue";
// import date_util from "./../utility/date_util.js";
// import { nextTick } from "vue";
import btdItemTitleDisplay from "./btdItemTitleDisplay.vue";
import btdItemTitleEdit from "./btdItemTitleEdit.vue";
import { nextTick } from "@vue/runtime-core";
import BtdDropdown from "./btdDropdown.vue";

export default {
  name: "btdListItem",
  components: {
    btdOptionsButton,
    btdItemTitleDisplay,
    btdItemTitleEdit,
    BtdDropdown,
  },
  data() {
    return {
      mouseIn: false,
      isEditing: false,
      persistentOptions: false,
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
      this.isEditing = true;
      //   console.log(this.$refs.itemText);
      this.$refs.itemOptionsMenu.hideMenu();
      // nextTick(() => {
      //   this.$refs.itemText.focusInput();
      // });
    },
    doneEditing(newname) {
      this.isEditing = false;
      this.$emit("itemEdited", newname);
    },
    canceledEditing() {
      this.isEditing = false;
    },
  },
  mounted() {
    this.persistentOptions = !window.matchMedia("(pointer: fine)").matches;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-list-item {
  display: flex;
  justify-content: space-between;
  /* margin: 5px 0px; */
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  align-items: center;
  max-width: 600px;
  position: relative;
}

.todo-item-title {
  flex-grow: 1;
  font-size: inherit;
}

.menu-icon {
  max-height: 20px;
}
</style>
