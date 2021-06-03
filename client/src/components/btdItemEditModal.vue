<template>
  <teleport to="body">
    <div class="item-edit-modal">
      <div class="non-menu-mask" />
      <div class="modal-content">
        <label for="taskinput">
          <span>Task:</span>
          <input type="text" id="taskinput" v-model="item.text" />
        </label>
        <label for="dueinput">
          <span>Due date:</span>
          <input type="date" id="dueinput" v-model="item.dueDate" />
        </label>
        <label for="duetimeinput">
          <span>Due by:</span>
          <span v-if="!hasDueTime">End of day</span>
          <input v-else type="time" id="duetimeinput" v-model="item.dueTime" />
          <button @click="hasDueTime = !hasDueTime">
            {{ hasDueTime ? "End of day" : "Add time" }}
          </button>
        </label>
        <div class="repeat-container"></div>
      </div>
    </div>
  </teleport>
</template>

<script>
import clone from "just-clone";

export default {
  name: "BtdItemEditModal",
  props: ["initialItem"],
  data() {
    return {
      hasDueTime: false,
      item: clone(this.initialItem),
    };
  },
};
</script>

<style scoped>
.item-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.non-menu-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  z-index: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>