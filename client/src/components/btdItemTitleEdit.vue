<template>
  <div class="btd-item-title-edit">
    <input
      ref="inputField"
      class="item-title-edit-input"
      v-click-away="clickAway"
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
    doneEditing() {
      //   console.log("done");
      this.$emit("doneEditing", this.currentText);
    },
    cancelEditing() {
      //   console.log("cancel");
      this.$emit("canceledEditing", this.currentText);
    },
    clickAway(event) {
      if (
        !event.path.some(
          (e) =>
            e.className !== undefined &&
            e.className.includes("btd-item-title-edit")
        )
      ) {
        this.doneEditing();
      }
    },
    keylistener(e) {
      if (e.key === "Escape") {
        this.escapePressed();
      } else if (e.key === "Enter") {
        this.enterPressed();
      }
    },
    enterPressed() {
      this.doneEditing();
    },
    escapePressed() {
      this.cancelEditing();
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
