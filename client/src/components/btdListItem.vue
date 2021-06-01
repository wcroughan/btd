<template>
  <div
    class="btd-list-item"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <label :for="item.id">
      <!-- <input
        class="ogcheck"
        :id="item.id"
        type="checkbox"
        @change="handleCheckbox($event)"
        :checked="item.isDone"
      />
      <div class="ogreplace">
        <div class="checkmark" />
      </div> -->
      <btd-checkbox :id="item.id" :checked="item.isDone" />

      <btd-item-title-display :text="item.text" :isDone="item.isDone" />
    </label>
    <btd-dropdown
      menuAlign="right"
      class="menu-button"
      ref="itemOptionsMenu"
      :closeOnAnyClick="true"
      v-show="persistentOptions || mouseIn"
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
          <button @click="snoozeButtonClicked">Snooze</button>
        </section>
      </template>
    </btd-dropdown>
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";
import btdItemTitleDisplay from "./btdItemTitleDisplay.vue";
import { nextTick } from "@vue/runtime-core";
import BtdDropdown from "./btdDropdown.vue";
import { mapMutations } from "vuex";
import BtdCheckbox from "./btdCheckbox.vue";

export default {
  name: "btdListItem",
  components: {
    btdItemTitleDisplay,
    BtdDropdown,
    BtdCheckbox,
  },
  data() {
    return {
      mouseIn: false,
      persistentOptions: false,
    };
  },
  props: {
    type: String,
    item: Object,
  },
  methods: {
    ...mapMutations(["updateItem", "deleteItem", "addItem"]),
    handleCheckbox(event) {
      const i = { ...this.item };
      i.isDone = event.target.checked;
      if (i.isDone) {
        i.doneDate = new Date();
      } else {
        delete i.doneDate;
      }
      this.updateItem(i);
    },
    deleteButtonClicked() {
      //   this.$refs.itemOptionsMenu.hideMenu(false);
      nextTick(() => {
        this.deleteItem(this.item.id);
      });
    },
    snoozeButtonClicked() {
      console.log("TODO");
    },
    editButtonClicked() {
      console.log("TODO");
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
  /* margin: 10px 0px; */
  /* Note can't have a margin here or animation stops working!! */
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: rgb(200, 200, 200);
  align-items: center;
  max-width: 600px;
  position: relative;
}
.btd-list-item:last-child {
  border-bottom-width: 0px;
}

.todo-item-title {
  flex-grow: 1;
  font-size: inherit;
}

.menu-icon {
  max-height: 20px;
}

label {
  display: flex;
}
</style>
