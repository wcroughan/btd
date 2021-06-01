<template>
  <div class="btd-header">
    <div class="menu">
      <btd-dropdown menuAlign="left" class="menu-button">
        <template v-slot:button>
          <img src="../assets/menu.png" class="menu-icon" />
        </template>
        <template v-slot:content>
          <section class="dropdown-option">
            <button @click="logout">Sign out</button>
          </section>
        </template>
      </btd-dropdown>
    </div>
    <!-- <btd-streak-info /> -->
    <div class="add-item">
      <btd-dropdown
        menuAlign="right"
        class="add-item-button"
        :closeOnAnyClick="false"
        ref="quickaddmenu"
      >
        <template v-slot:button>
          <!-- <img src="../assets/menu.png" class="add-item-icon" /> -->
          <div class="add-item-icon-container">
            <div class="add-item-horiz" />
            <div class="add-item-vert" />
          </div>
        </template>
        <template v-slot:content>
          <section class="dropdown-option">
            <div class="quickadd-container">
              <input
                type="text"
                v-model="quickAddText"
                @keydown="quickaddkeypressed"
              />
              <div class="quickadd-button-container">
                <button @click="quickAddMoreOptions">More Options</button>
                <button @click="quickAddDone">Add</button>
              </div>
            </div>
          </section>
        </template>
      </btd-dropdown>
    </div>
    <btd-item-edit-modal v-if="showAddItemModal" :initialItem="modalItem" />
  </div>
</template>

<script>
import BtdDropdown from "./btdDropdown.vue";
// import BtdStreakInfo from "./btdStreakInfo.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import BtdItemEditModal from "./btdItemEditModal.vue";

export default {
  name: "btdHeader",
  data() {
    return {
      quickAddText: "",
      modalItem: null,
      showAddItemModal: false,
    };
  },
  computed: {
    ...mapGetters("todolist", ["generateDefaultItem"]),
  },
  methods: {
    ...mapMutations("todolist", ["logout"]),
    ...mapActions("todolist", ["addItem"]),
    quickAddMoreOptions() {
      this.$refs.quickaddmenu.hideMenu();
      this.showAddItemModal = this.generateDefaultItem();
      this.showAddItemModal.text = this.quickAddText;
      this.showAddItemModal = true;
    },
    quickAddDone() {
      this.$refs.quickaddmenu.hideMenu();
      const item = this.generateDefaultItem();
      item.text = this.quickAddText;
      console.log("header, adding item ", item);
      this.addItem(item);
    },
    quickaddkeypressed(e) {
      if (e.key === "Escape") {
        this.$refs.quickaddmenu.hideMenu();
      } else if (e.key === "Enter") {
        this.quickAddDone();
      }
    },
  },
  components: {
    // BtdStreakInfo,
    BtdDropdown,
    BtdItemEditModal,
  },
};
</script>

<!-- Add "
    BtdItemEditModalscoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-header {
  max-width: inherit;
  margin: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #53d3d1;
  font-size: 2em;
  z-index: 1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
}
.btd-streak-info {
  flex-basis: 0;
  flex-grow: 0;
}

.menu-button {
  /* transform: translateY(10%); */
  align-self: center;
  margin-left: 30px;
}
.menu-icon {
  height: 40px;
}
.add-item-icon {
  height: 40px;
}

.add-item-icon-container {
  position: relative;
  /* background-color: brown; */
  width: 40px;
  height: 40px;
  margin-right: 30px;
}
.add-item-vert {
  position: absolute;
  left: calc(50% - 2px);
  width: 4px;
  top: 3px;
  height: calc(100% - 6px);
  background-color: black;
  border-radius: 3px;
}
.add-item-horiz {
  position: absolute;
  top: calc(50% - 2px);
  height: 4px;
  left: 3px;
  width: calc(100% - 6px);
  background-color: black;
  border-radius: 3px;
}
</style>
