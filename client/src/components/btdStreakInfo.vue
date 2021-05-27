<template>
  <btd-dropdown menuAlign="right" :closeOnAnyClick="false">
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
      <btd-calendar
        :initialDate="date"
        @dayChosen="$emit('dayChosen', $event)"
      />
    </template>
  </btd-dropdown>
</template>

<script>
import btdDropdown from "./btdDropdown.vue";
import btdCalendar from "./btdCalendar.vue";
import { inject } from "vue";
import api_util from "./../utility/api_util.js";

export default {
  name: "btdStreakInfo",
  components: {
    btdDropdown,
    btdCalendar,
  },
  data() {
    return {
      streakLength: 0,
      todayGood: false,
      date: new Date(),
    };
  },
  inject: ["authToken"],
  setup() {
    const updateFlag = inject("streakUpdateFlag");
    const updateReceived = inject("streakUpdateReceived");
    return {
      updateFlag,
      updateReceived,
    };
  },
  emits: ["updateDone", "dayChosen"],
  methods: {
    getStreakLengthFromServer() {
      api_util.getStreakLength(this.authToken.value, this.date, (l) => {
        this.streakLength = l.data.len;
        this.todayGood = l.data.todayGood;
      });
    },
  },
  watch: {
    updateFlag(newval) {
      if (newval > 0) {
        // console.log("time to update the streak! val", this.updateFlag);
        this.getStreakLengthFromServer();
        this.updateReceived();
      }
    },
  },
  mounted() {
    this.getStreakLengthFromServer();
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
