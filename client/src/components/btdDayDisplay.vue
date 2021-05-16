<template>
  <div class="btd-day-display">
    <button @click="yesterdayClicked">Yesterday</button>
    <span>{{ dateText }}</span>
    <button @click="tomorrowClicked">Tomorrow</button>
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
  computed: {
    dateText() {
      const format = [
        { year: "numeric" },
        { month: "numeric" },
        { day: "numeric" },
      ];
      return date_util.formatDate(this.date, format, "/");
    },
  },
  methods: {
    yesterdayClicked() {},
    tomorrowClicked() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-day-display {
  display: flex;
  justify-content: space-around;
}
</style>
