<template>
  <div class="btd-item-title-edit">
    <input
      ref="inputField"
      class="item-title-edit-input"
      v-model="currentText"
      @keydown="keylistener"
    />
    <button @click="doneEditing">Save</button>
    <button @click="cancelEditing">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "btdItemTitleEdit",
  data() {
    return {
      currentText: this.text,
    };
  },
  props: {
    text: String,
  },
  emits: ["doneEditing", "canceledEditing"],
  methods: {
    focusInput() {
      this.$refs.inputField.focus();
      this.$refs.inputField.select();
    },
    doneEditing(event) {
      //   console.log("done");
      event.stopPropagation();
      this.$emit("doneEditing", this.currentText);
    },
    cancelEditing(event) {
      //   console.log("cancel");
      event.stopPropagation();
      this.$emit("canceledEditing", this.currentText);
    },
    keylistener(e) {
      if (e.key === "Escape") {
        this.escapePressed();
      } else if (e.key === "Enter") {
        this.enterPressed();
      }
    },
    enterPressed() {
      this.$emit("doneEditing", this.currentText);
    },
    escapePressed() {
      this.$emit("canceledEditing", this.currentText);
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-item-title-edit {
  display: flex;
}

.btd-item-title-edit > button {
  flex-grow: 0;
}
.item-title-edit-input {
  flex-grow: 1;
  /* font-size: 1.5em; */
  font-size: inherit;
}
</style>
