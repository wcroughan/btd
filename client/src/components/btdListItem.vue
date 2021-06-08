<template>
  <div
    class="btd-list-item"
    :class="{ 'menu-showing': menuShowing }"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <label :for="item.id">
      <btd-checkbox
        :id="item.id"
        @update:modelValue="handleCheckbox($event)"
        :modelValue="item.isDone"
        v-show="!hideCheckbox"
      />
      <btd-dropdown
        menuAlign="left"
        :closeOnAnyClick="true"
        v-if="isOverdue && item.isDone"
      >
        <template v-slot:button>
          <img
            class="warning-icon"
            title="overdue"
            src="../assets/warning.png"
          />
        </template>
        <template v-slot:content>
          <section class="dropdown-option">
            <button @click="markNotOverdueClicked">Mark as not overdue</button>
          </section>
        </template>
      </btd-dropdown>
      <btd-item-title-display :text="item.text" :isDone="item.isDone" />
    </label>
    <btd-dropdown
      menuAlign="right"
      class="menu-button"
      ref="itemOptionsMenu"
      :closeOnAnyClick="true"
      v-show="!hideMenu && (persistentOptions || mouseIn || menuShowing)"
      :onContentMounted="menuMounted"
      :onContentUnmounted="menuUnmounted"
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
        <section class="dropdown-option" v-if="isOverdue && item.isDone">
          <button @click="markNotOverdueClicked">Mark as not overdue</button>
        </section>
      </template>
    </btd-dropdown>
    <btd-item-edit-modal
      v-if="showAddItemModal"
      :initialItem="item"
      @closeModal="showAddItemModal = false"
    />
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";
import btdItemTitleDisplay from "./btdItemTitleDisplay.vue";
import { nextTick } from "@vue/runtime-core";
import BtdDropdown from "./btdDropdown.vue";
import { mapActions } from "vuex";
import BtdCheckbox from "./btdCheckbox.vue";
import btdItemEditModal from "./btdItemEditModal.vue";
import { itemIsOverdue } from "../utility/misc_util.js";
import date_util from "../utility/date_util";

export default {
  name: "btdListItem",
  components: {
    btdItemEditModal,
    btdItemTitleDisplay,
    BtdDropdown,
    BtdCheckbox,
  },
  data() {
    // console.log("creating item with ", this.item);
    return {
      mouseIn: false,
      persistentOptions: false,
      menuShowing: false,
      showAddItemModal: false,
    };
  },
  props: {
    type: String,
    item: Object,
    hideCheckbox: {
      type: Boolean,
      default: false,
    },
    hideMenu: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isOverdue() {
      return itemIsOverdue(this.item);
    },
  },
  methods: {
    menuMounted() {
      this.menuShowing = true;
    },
    menuUnmounted() {
      this.menuShowing = false;
    },
    ...mapActions("todolist", ["updateItem", "deleteItem"]),
    handleCheckbox(newval) {
      const i = { ...this.item };
      i.isDone = newval;
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
        this.deleteItem(this.item._id);
      });
    },
    snoozeButtonClicked() {
      console.log("TODO");
    },
    editButtonClicked() {
      this.showAddItemModal = true;
    },
    markNotOverdueClicked() {
      const i = { ...this.item };
      i.overriddenDueDate = i.dueDate;
      i.dueDate = date_util.getTomorrow();
      this.updateItem(i);
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
.warning-icon {
  max-height: 20px;
}

label {
  display: flex;
}

.menu-showing {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
