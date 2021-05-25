<template>
  <div class="btd-modal">
    <div class="back-mask" @click="maskClickHandler"></div>
    <div class="modal-content" :class="menuAlign + '-align-modal'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "btdListItem",
  data() {
    return {};
  },
  props: {
    menuAlign: {
      type: String,
      default: "right",
    },
  },
  emits: ["close"],
  methods: {
    maskClickHandler(event) {
      if (
        !event.path.some(
          (e) =>
            e.className !== undefined && e.className.includes("modal-content")
        )
      ) {
        this.$emit("close");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-modal {
  position: absolute;
  top: 100%;
}
.back-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: -1;
}

.modal-content {
  z-index: 1;
}
.right-align-modal {
  transform: translateX(-100%);
}
.center-align-modal {
  transform: translateX(-50%);
}
</style>
