<template>
  <div class="agglist">
    <btd-aggregated-list-section
      v-for="(tg, idx) in timeGroups"
      :key="'tg_' + idx"
      :start="tg[0]"
      :end="tg[1]"
      :title="tg[2]"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import date_util from "../utility/date_util";
import BtdAggregatedListSection from "./btdAggregatedListSection.vue";
const _ = require("underscore");

export default {
  name: "BtdAggregatedList",
  components: {
    BtdAggregatedListSection,
  },
  data() {
    const today = date_util.getToday();
    const tomorrow = date_util.getTomorrow();
    const twodays = date_util.tomorrow(tomorrow);
    const timeDividers = [today, tomorrow, twodays];
    const titles = ["Today", "Tomorrow"];
    if (today.getDay() < 6) {
      const sunday = date_util.plusOneWeek(date_util.getMonday(today));
      timeDividers.push(sunday);
      titles.push("This Week");
    }
    const nextWeek = date_util.plusOneWeek(
      date_util.plusOneWeek(date_util.getMonday(today))
    );
    timeDividers.push(nextWeek);
    titles.push("Next Week");
    timeDividers.push(new Date(3000, 0, 0, 0, 0, 0, 0));
    titles.push("Later");

    const allPossibleGroups = _.zip(
      timeDividers.slice(0, timeDividers.length - 1),
      timeDividers.slice(1, timeDividers.length),
      titles
    );

    // console.log(timeDividers, titles, allPossibleGroups);

    return {
      //   timeDividers,
      allPossibleGroups,
    };
  },
  computed: {
    ...mapState({
      timeGroups(state) {
        return this.allPossibleGroups.filter((interval) => {
          return state.todolist.todoItems.some((i) => {
            if (i.isDone)
              return (
                i.doneDate.getTime() <= interval[1].getTime() &&
                i.doneDate.getTime() > interval[0].getTime()
              );
            return (
              i.dueDate.getTime() <= interval[1].getTime() &&
              i.dueDate.getTime() > interval[0].getTime()
            );
          });
        });
      },
    }),
  },
  created() {
    // console.log(this.debugInfo);
  },
};
</script>

<style scoped>
</style>
