<template>
  <div class="btd-header">
    <div class="menu">
      <btd-dropdown menuAlign="left" class="menu-button">
        <template v-slot:button>
          <img src="../assets/menu.png" class="menu-icon" />
        </template>
        <template v-slot:content>
          <section class="dropdown-option">
            <button @click="$emit('logout')">Sign out</button>
          </section>
        </template>
      </btd-dropdown>
    </div>
    <btd-day-display :date="date" @dayChosen="dayChosen($event)" />
    <btd-streak-info :date="date" @dayChosen="dayChosen($event)" />
  </div>
</template>

<script>
import date_util from "../utility/date_util";
import BtdDayDisplay from "./btdDayDisplay.vue";
import BtdDropdown from "./btdDropdown.vue";
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
    BtdDropdown,
  },
  props: {
    scrollInfo: null,
    date: Date,
  },
  emits: ["dayChosen", "logout"],
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
