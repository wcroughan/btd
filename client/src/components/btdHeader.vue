<template>
  <div class="btd-header">
    <div class="menu">
      <img
        src="../assets/menu.png"
        @click="showMenu = !showMenu"
        class="menu-button"
      />
      <btd-modal v-if="showMenu" @close="showMenu = false" menuAlign="left">
        <div class="options-button-container">
          <button class="options-button" @click="editButtonClicked">
            edit
          </button>
          <button class="options-button" @click="deleteButtonClicked">
            delete
          </button>
          <button class="options-button" @click="moveToYesterdayClicked">
            move to yesterday
          </button>
          <button class="options-button" @click="moveToTomorrowClicked">
            move to tomorrow
          </button>
        </div>
      </btd-modal>
    </div>
    <btd-day-display :date="date" @dayChosen="dayChosen($event)" />
    <btd-streak-info />
  </div>
</template>

<script>
import date_util from "../utility/date_util";
import BtdDayDisplay from "./btdDayDisplay.vue";
import BtdModal from "./btdModal.vue";
import BtdStreakInfo from "./btdStreakInfo.vue";
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdHeader",
  data() {
    return {
      showMenu: false,
    };
  },
  components: {
    BtdDayDisplay,
    BtdStreakInfo,
    BtdModal,
  },
  props: {
    scrollInfo: null,
    date: Date,
  },
  emits: ["dayChosen"],
  methods: {
    dayChosen(date) {
      //   console.log("header got date", date);
      this.$emit("dayChosen", date);
    },
    todayClicked() {
      this.dayChosen(date_util.getToday());
    },
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
  height: 40px;
  transform: translateY(10%);
}

.options-button-container {
  display: flex;
  flex-direction: column;
  /* position: relative;
  z-index: 9001; */
}
.options-button {
  background-color: rgb(250, 250, 250);
  border-width: 1px;
  display: block;
  white-space: nowrap;
  padding: 5px;
  font-size: 1em;
  width: inherit;
  /* position: relative;
  z-index: 9001; */
}
</style>
