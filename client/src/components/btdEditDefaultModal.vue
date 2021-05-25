<template>
  <div class="modal-container" :class="{ 'visible-container': displayModal }">
    <div class="non-menu-mask" />
    <div class="modal-content">
      <div class="modal-header">
        <h1>Default {{ listType === "day" ? "Daily" : "Weekly" }} List</h1>
      </div>
      <div class="item-list">
        <input
          class="item-input"
          v-for="(item, idx) in list.items"
          v-model="item.text"
          :key="idx"
          :ref="setItemRef"
          @blur="checkIfShouldDelete(idx)"
        />
        <input ref="lastInput" @input="lastInputChange" />
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

export default {
  name: "btdEditDefaultModal",
  components: {},
  data() {
    return {
      displayModal: false,
      listType: "",
      list: {},
      itemRefs: [],
    };
  },
  inject: ["authToken"],
  emits: ["editMade"],
  methods: {
    setItemRef(el) {
      //   console.log("setting item ref", el);
      if (el) this.itemRefs.push(el);
    },
    checkIfShouldDelete(idx) {
      console.log(
        "check if deleting ",
        idx,
        "list items = ",
        this.list.items,
        "value",
        this.itemRefs[idx].value,
        "len",
        this.itemRefs[idx].value.length
      );
      if (this.itemRefs[idx].value.length === 0) {
        // this.itemRefs.splice(idx, 1);
        this.itemRefs = [];
        this.list.items.splice(idx, 1);
      }
    },
    show(type) {
      console.log("showing modal with type", type);
      this.listType = type;
      this.displayModal = true;
    },
    save() {
      this.displayModal = false;
      this.list.id = this.listType + "_default";
      this.list.items.forEach((i, idx) => {
        i.isDone = false;
        i.id = idx;
      });
      console.log(this.list);
      api_util.pushListToServer(this.authToken.value, this.list);
      this.listType = "";
      this.$emit("editMade");
    },
    cancel() {
      console.log("hiding modal");
      this.displayModal = false;
      this.listType = "";
    },
    getListFromServer(type) {
      console.log("default editor getting list from server:", type);
      api_util.getDefaultList(this.authToken.value, type + "_edit", (list) => {
        console.log("got from server:", list);
        this.list = list.data;
      });
    },
    lastInputChange(event) {
      const newval = event.target.value;
      console.log("change: ", newval);
      if (newval.length > 0) {
        this.list.items.push({ text: newval, isDone: false });
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
      this.getListFromServer(newval);
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
  margin: auto;
}
.item-list {
  display: flex;
  flex-direction: column;
}
</style>