<template>
  <div class="btd-header">
    <btd-day-display :date="date" @dayChosen="dayChosen($event)" />
    <button class="today-button" @click="todayClicked">Today</button>
    <btd-streak-info />
  </div>
</template>

<script>
import date_util from "../utility/date_util";
import BtdDayDisplay from "./btdDayDisplay.vue";
import BtdStreakInfo from "./btdStreakInfo.vue";
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdHeader",
  data() {
    return {};
  },
  components: {
    BtdDayDisplay,
    BtdStreakInfo,
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
  /* max-width: 900px; */
  /* margin: auto; */

  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;

  /* background-color: white; */
}
.btd-day-display {
  order: 2;
  flex-basis: 0;
  flex-grow: 1;
}
.btd-streak-info {
  order: 1;
  flex-basis: 0;
  flex-grow: 1;
}
.today-button {
  order: 3;
  flex-basis: 0;
  flex-grow: 1;
}

@media screen and (max-width: 680px) {
  .btd-header {
    display: grid;
    grid-template-columns: 1fr 1fr;

    max-width: 600px;
    margin: auto;
    position: static;
  }
  .btd-day-display {
    grid-row: 1;
    grid-column: 1 / 3;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    /* background-color: yellow; */
  }
  .today-button {
    grid-row: 2;
    grid-column: 2;
  }
  .btd-streak-info {
    grid-row: 2;
    grid-column: 1;
  }
}
</style>
