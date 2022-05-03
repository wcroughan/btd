<template>
  <div class="modal-container" :class="{ 'visible-container': displayModal }">
    <div class="non-menu-mask" />
    <div class="modal-content">
      <div class="modal-header">
        <h1>
          {{
            isDefault
              ? "Default " + (listType === "day" ? "Daily" : "Weekly") + " List"
              : listId
          }}
        </h1>
      </div>
      <div class="item-list">
        <draggable
          v-model="list.items"
          item-key="id"
          handle=".list-item-handle"
          tag="transition-group"
          :component-data="{
            name: !drag ? 'flip-list' : null,
          }"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element }">
            <div class="list-item">
              <div class="list-item-handle">
                <div class="handlebar" />
                <div class="handlebar" />
                <div class="handlebar" />
                <div class="handlebar" />
              </div>
              <input
                :ref="setItemRef"
                v-model="element.text"
                class="item-input"
              />
              <div class="list-item-delete" @click="deleteItem(element.id)">
                <div class="deletebar delete1" />
                <div class="deletebar delete2" />
              </div>
            </div>
          </template>
        </draggable>
        <div class="last-input-container">
          <div class="last-input-spacer" />
          <input ref="lastInput" @input="lastInputChange" class="last-input" />
          <div class="last-input-spacer" />
        </div>
      </div>
      <div class="modal-footer">
        <button @click="save">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import api_util from "../utility/api_util";
import { nextTick } from "vue";
import draggable from "vuedraggable";
import misc_util from "../utility/misc_util";

export default {
  name: "btdEditDefaultModal",
  components: {
    draggable,
  },
  data() {
    return {
      displayModal: false,
      listType: "",
      isDefault: false,
      list: {},
      itemRefs: [],
      drag: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        ghostClass: "ghost",
      };
    },
  },
  inject: ["authToken"],
  emits: ["editMade"],
  methods: {
    setItemRef(el) {
      //   console.log("setting item ref", el);
      if (el) this.itemRefs.push(el);
    },
    deleteItem(id) {
      const idx = this.list.items.findIndex((v) => v.id === id);
      this.itemRefs = [];
      this.list.items.splice(idx, 1);
    },
    show(type) {
      // Note change here: if type contains "_", it's a specific list, otherwise it's a type
      //   console.log("showing modal with type", type);
      if (type.includes("_")) {
        this.isDefault = false;
        this.listId = type.split("_")[1];
        this.listType = type.split("_")[0];
      } else {
        this.isDefault = true;
        this.listId = "";
        this.listType = type;
      }
      this.displayModal = true;
    },
    save() {
      this.displayModal = false;
      if (this.isDefault) {
        this.list.id = this.listType + "_default";
        delete this.list.start;
        delete this.list.end;
        delete this.list.isDone;
        delete this.list.isSkipped;
        this.list.items.forEach((i, idx) => {
          i.isDone = false;
          i.id = idx;
        });
      } else {
        this.list.id = this.listType + "_" + this.listId;
        this.list.items.forEach((i, idx) => {
          i.id = idx;
        });
      }
      console.log(this.list);
      api_util.pushListToServer(this.authToken.value, this.list);
      this.listType = "";
      this.$emit("editMade");
    },
    cancel() {
      //   console.log("hiding modal");
      this.displayModal = false;
      this.listId = "";
      this.listType = "";
    },
    getDefaultListFromServer(type) {
      //   console.log("default editor getting list from server:", type);
      api_util.getDefaultList(this.authToken.value, type + "_edit", (list) => {
        // console.log("got from server:", list);
        this.list = list.data;
      });
    },
    getListFromServer(type) {
      //   console.log("default editor getting list from server:", type);
      api_util.getListForListId(this.authToken.value, type, (list) => {
        // console.log("got from server:", list);
        this.list = list.data;
      });
    },
    lastInputChange(event) {
      const newval = event.target.value;
      const nextid = misc_util.getUniqueItemId(this.list.items);
      //   console.log("change: ", newval);
      if (newval.length > 0) {
        this.list.items.push({ text: newval, isDone: false, id: nextid });
        this.$refs.lastInput.value = "";
        this.itemRefs = [];
        nextTick(() => {
          this.itemRefs[this.itemRefs.length - 1].focus();
        });
      }
    },
  },
  watch: {
    listType(newval) {
      if (newval === "") return;
      if (this.isDefault) this.getDefaultListFromServer(newval);
      else this.getListFromServer(newval + "_" + this.listId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-container {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.visible-container {
  display: flex;
}
.non-menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9000;
}
.modal-content {
  z-index: 9001;
  background-color: white;
  max-width: 900px;
  min-width: 400px;
  margin: auto;
}
.item-list {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  align-items: stretch;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* border: 1px solid black; */
  /* border-bottom: 1px solid grey; */
}

.list-item-handle {
  display: flex;
  flex-direction: column;
  min-width: 30px;
  min-height: 30px;
  justify-content: center;
}
.handlebar {
  background-color: black;
  width: 20px;
  min-height: 1px;
  margin: 1px 0px;
}

.deletebar {
  position: absolute;
  background-color: red;
  min-width: 20px;
  min-height: 2px;
  right: 0px;
}
.list-item-delete {
  position: relative;
  min-width: 30px;
  min-height: 30px;
}
.list-item-delete:hover > .deletebar {
  background-color: lightcoral;
}
.delete1 {
  transform: translateY(15px) translateX(-5px) rotate(45deg);
  top: 0px;
}
.delete2 {
  transform: translateY(15px) translateX(-5px) rotate(-45deg);
}

.last-input {
  /* max-width: 70%; */
  flex-grow: 1;
}
.last-input-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.item-input {
  flex-grow: 1;
}
.last-input-spacer {
  min-width: 30px;
}

.flip-list-move {
  transition: transform 0.5s ease;
}

.ghost {
  opacity: 0.5;
}
</style>