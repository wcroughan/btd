<template>
  <div class="btd-day-display">
    <img
      src="../assets/down-arrow-red.png"
      @click="yesterdayClicked"
      alt="Yesterday"
      class="left-arrow arrow"
    />
    <span class="date-text">{{ dateText }}</span>
    <img
      src="../assets/down-arrow-red.png"
      @click="tomorrowClicked"
      alt="Tomorrow"
      class="right-arrow arrow"
    />
  </div>
</template>

<script>
import date_util from "./../utility/date_util.js";

export default {
  name: "btdDayDisplay",
  data() {
    return {};
  },
  props: {
    date: Date,
  },
  emits: ["dayChosen"],
  computed: {
    dateText() {
      const format = [
        { year: "numeric" },
        { month: "numeric" },
        { day: "numeric" },
      ];
      return date_util.formatDateOld(this.date, format, "/");
    },
  },
  methods: {
    yesterdayClicked() {
      const newday = date_util.yesterday(this.date);
      //   console.log("yesterday clicked, new date: ", newday);
      this.$emit("dayChosen", newday);
    },
    tomorrowClicked() {
      this.$emit("dayChosen", date_util.tomorrow(this.date));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-day-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-height: 20px; */
  background-color: inherit;
}
.arrow {
  height: 40px;
  filter: hue-rotate(180deg);
}
.arrow:hover {
  filter: hue-rotate(45deg);
}
.left-arrow {
  transform: rotateZ(90deg);
}
.right-arrow {
  transform: rotateZ(270deg);
}
.date-text:hover {
  color: lightblue;
}
</style>
