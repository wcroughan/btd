<template>
  <div class="btd-streak-info">
    <img
      class="fire-img"
      :class="{ greyed: streakLength === 0 }"
      src="../assets/fire.png"
      alt="streak"
    />
    {{ streakLength }}
  </div>
</template>

<script>
// import date_util from "./../utility/date_util.js";

export default {
  name: "btdStreakInfo",
  data() {
    return {
      streakLength: 0,
    };
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
.fire-img {
  height: 20px;
}
.greyed {
  filter: grayscale(100%);
}
</style>
