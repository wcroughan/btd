<template>
  <btd-dropdown menuAlign="right" ref="dropcal" :closeOnAnyClick="false">
    <template v-slot:button>
      <div class="btd-streak-info">
        <img
          class="fire-img"
          :class="{ greyed: !todayGood }"
          src="../assets/fire.png"
          alt="streak"
        />
        {{ streakLength }}
      </div>
    </template>
    <template v-slot:content>
      <btd-calendar :initialDate="date" />
    </template>
  </btd-dropdown>
</template>

<script>
import btdDropdown from "./btdDropdown.vue";
import btdCalendar from "./btdCalendar.vue";
import date_util from "../utility/date_util";
import { mapActions, mapState } from "vuex";

export default {
  name: "btdStreakInfo",
  components: {
    btdDropdown,
    btdCalendar,
  },
  data() {
    return {
      date: date_util.getToday(),
    };
  },
  computed: {
    ...mapState("todolist", {
      streakLength(state) {
        return state.streakInfo.len;
      },
      todayGood(state) {
        return state.streakInfo.todayGood;
      },
    }),
  },
  methods: {
    ...mapActions("todolist", ["refreshStreakInfo"]),
  },
  mounted() {
    this.refreshStreakInfo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-streak-info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fire-img {
  height: 50px;
  padding: 10px;
}
.greyed {
  filter: grayscale(100%);
}
</style>
