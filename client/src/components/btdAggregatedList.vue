<template>
  <div class="agglist">
    <btd-aggregated-list-section
      v-for="(li, idx) in filteredListInfos"
      :listInfo="li"
      :key="'li_' + idx"
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
      listInfos(state) {
        const ret = this.allPossibleGroups.map((interval) => {
          return {
            getItems: () => {
              return state.todolist.todoItems.filter((i) => {
                return (
                  !i.isDone &&
                  i.dueDate.getTime() <= interval[1].getTime() &&
                  i.dueDate.getTime() > interval[0].getTime()
                );
              });
            },
            getDoneItems: () => {
              return state.todolist.todoItems.filter((i) => {
                return (
                  i.isDone &&
                  i.dueDate.getTime() <= interval[1].getTime() &&
                  i.dueDate.getTime() > interval[0].getTime()
                );
              });
            },
            title: interval[2],
          };
        });
        ret.push({
          title: "Overdue",
          getItems: () => {
            const ret = state.todolist.todoItems.filter((i) => {
              return !i.isDone && i.dueDate.getTime() <= new Date();
            });
            // console.log("overdue items returning: ", ret);
            return ret;
          },
          getDoneItems: () => [],
        });

        // console.log("timegroups: ", ret);
        return ret;
      },
    }),
    filteredListInfos() {
      const ret = this.listInfos.filter((li) => {
        return li.getItems().length > 0 || li.getDoneItems().length > 0;
      });
      //   console.log("filtered lsit infos", ret);
      return ret;
    },
  },
  created() {
    // console.log(this.debugInfo);
  },
};
</script>

<style scoped>
</style>
