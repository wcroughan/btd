<template>
  <div class="btd-dropdown">
    <div @click="showMenu = !showMenu">
      <slot name="button" />
    </div>
    <div class="back-mask" v-if="showMenu" @click="maskClickHandler"></div>
    <transition name="modal">
      <div
        class="btd-modal"
        v-if="showMenu"
        @click="menuClickHandler"
        :class="menuAlign + '-align-modal'"
      >
        <div class="modal-content">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "btdDropdown",
  data() {
    return {
      showMenu: false,
    };
  },
  props: {
    menuAlign: {
      type: String,
      default: "right",
    },
    closeOnAnyClick: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    menuClickHandler() {
      if (this.closeOnAnyClick) this.showMenu = false;
    },
    maskClickHandler(event) {
      if (
        !event.path.some(
          (e) =>
            e.className !== undefined && e.className.includes("modal-content")
        )
      ) {
        this.showMenu = false;
      }
    },
    hideMenu() {
      this.showMenu = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.btd-dropdown {
  position: relative;
  z-index: 1;
}
.btd-modal {
  position: absolute;
  z-index: 2;
}
.back-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.modal-content {
  z-index: 3;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 10px 10px 0 0 rgba(black, 0.03);
  background: white;
  padding: 5px 12px;
}
.right-align-modal {
  right: 0px;
}
.center-align-modal {
  left: 50%;
  transform: translateX(-50%);
}

.modal-content > .dropdown-option {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  position: relative;
  z-index: 2;
  white-space: nowrap;
}
.modal-content > .dropdown-option:last-child {
  border-bottom: 0;
}

.modal-content > .dropdown-option > * {
  width: 100%;
  text-align: left;
  font-size: 1rem;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
}

.modal-enter-from {
  transform: translateY(-50%) scaleY(0);
}
.modal-enter-active {
  transition: all 0.1s;
}
.modal-leave-active {
  animation: rollbounce 0.1s reverse;
}
@keyframes rollbounce {
  0% {
    transform: translateY(-50%) scaleY(0);
  }
  60% {
    transform: translateY(10%) scaleY(1.2);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}
</style>
