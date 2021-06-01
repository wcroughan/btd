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
</style>