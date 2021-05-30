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
    <!-- <btd-day-display /> -->
    <btd-streak-info />
    <div class="add-item">
      <btd-dropdown menuAlign="right" class="add-item-button">
        <template v-slot:button>
          <div class="add-item-icon-container">
            <div class="add-item-horiz" />
            <div class="add-item-vert" />
          </div>
          <!-- <img src="../assets/menu.png" class="add-item-icon" /> -->
        </template>
        <template v-slot:content>
          <section class="dropdown-option">
            <div class="quickadd-container">
              <input type="text" v-model="quickAddText" />
              <div class="quickadd-button-container">
                <button @click="quickAddMoreOptions">More Options</button>
                <button @click="quickAddDone">Add</button>
              </div>
            </div>
          </section>
        </template>
      </btd-dropdown>
    </div>
  </div>
</template>

<script>
import BtdDayDisplay from "./btdDayDisplay.vue";
import BtdDropdown from "./btdDropdown.vue";
import BtdStreakInfo from "./btdStreakInfo.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "btdHeader",
  data() {
    return {
      quickAddText: "",
    };
  },
  computed: {
    ...mapGetters(["defaultItem"]),
  },
  methods: {
    ...mapMutations(["logout"]),
    quickAddMoreOptions() {
      //TODO show modal here
    },
    quickAddDone() {
      const item = this.defaultItem;
      console.log(item);
    },
  },
  components: {
    BtdDayDisplay,
    BtdStreakInfo,
    BtdDropdown,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-header {
  max-width: inherit;
  margin: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #53d3d1;
  font-size: 2em;
  z-index: 1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.btd-day-display {
  flex-basis: 0;
  flex-grow: 0.6;
  height: 64px;
}
.btd-streak-info {
  flex-basis: 0;
  flex-grow: 0;
}
.today-button {
  flex-basis: 0;
  flex-grow: 0;
  border-width: 0px;
  /* color: blue; */
  font-weight: bold;
  font-size: 0.7em;
  background-color: inherit;
}
.today-button:hover {
  color: lightblue;
}

.menu-button {
  /* transform: translateY(10%); */
  align-self: center;
}
.menu-icon {
  height: 40px;
}
</style>
