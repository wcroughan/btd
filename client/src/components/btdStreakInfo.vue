<template>
  <div class="btd-streak-info">Streak: Idk 7 or 8 days?</div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdStreakInfo",
  data() {
    return {};
  },
  props: {
    updateFlag: Number, // start it at 0, add 1 everytime should update. On receiving this emit, subtract one
  },
  emits: ["updateDone"],
  watch: {
    updateFlag(newval) {
      if (newval > 0) {
        console.log("time to update the streak!");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
