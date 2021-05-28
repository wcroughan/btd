<template>
  <div
    class="btd-list-item"
    @mouseenter="mouseIn = true"
    @mouseleave="mouseIn = false"
  >
    <label :for="key">
      <input
        class="ogcheck"
        :id="key"
        type="checkbox"
        @change="handleCheckbox($event)"
        :checked="isDone"
      />
      <div class="ogreplace">
        <div class="checkmark" />
      </div>

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
    </label>
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
          <button @click="moveToTomorrowClicked">
            move to
            {{
              type === "day"
                ? "tomorrow"
                : type === "week"
                ? "next week"
                : "next list"
            }}
          </button>
        </section>
        <section class="dropdown-option">
          <button @click="moveToYesterdayClicked">
            move to
            {{
              type === "day"
                ? "yesterday"
                : type === "week"
                ? "last week"
                : "previous list"
            }}
          </button>
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
    type: String,
    key: String,
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
    // textClicked() {
    //   if (!this.isEditing) this.$emit("itemDoneUpdate", !this.isDone);
    // },
    deleteButtonClicked() {
      //   this.$refs.itemOptionsMenu.hideMenu(false);
      nextTick(() => {
        this.$emit("itemDeleted");
      });
    },
    moveToYesterdayClicked() {
      //   this.$refs.itemOptionsMenu.hideMenu(false);
      nextTick(() => {
        this.$emit("itemMoved", -1);
      });
    },
    moveToTomorrowClicked() {
      //   this.$refs.itemOptionsMenu.hideMenu(false);
      nextTick(() => {
        this.$emit("itemMoved", 1);
      });
    },
    editButtonClicked() {
      this.isEditing = true;
      //   console.log(this.$refs.itemText);
      //   this.$refs.itemOptionsMenu.hideMenu();
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
