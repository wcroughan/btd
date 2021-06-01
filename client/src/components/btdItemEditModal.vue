<template>
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
</template>

<script>
export default {
  name: "BtdItemEditModal",
  data() {
    return {
      hasDueTime: false,
    };
  },
};
</script>

<style scoped>
</style>