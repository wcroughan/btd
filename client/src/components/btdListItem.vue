<template>
  <div
    class="btd-list-item"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <label :for="item.id">
      <input
        class="ogcheck"
        :id="item.id"
        type="checkbox"
        @change="handleCheckbox($event)"
        :checked="item.isDone"
      />
      <div class="ogreplace">
        <div class="checkmark" />
      </div>

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

export default {
  name: "btdListItem",
  components: {
    btdItemTitleDisplay,
    BtdDropdown,
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

.ogcheck {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.ogreplace {
  width: 1em;
  height: 1em;
  background-color: white;
  border: 2px solid black;
  border-radius: 3px;
}

label:hover .ogreplace {
  background-color: #6fd4d3;
}

input:checked ~ .ogreplace {
  width: 0.8em;
  height: 0.8em;
  background-color: #53d3d1;
}
input:checked ~ .ogreplace .checkmark {
  position: absolute;
  border: 0.2em solid white;
  border-top-width: 0px;
  border-right-width: 0px;
  height: 2px;
  width: 6px;
  transform: rotate(-45deg) translate(0px, 2px);
}
</style>
