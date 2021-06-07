<template>
  <div class="agglist">
    <transition-group name="lists">
      <btd-aggregated-list-section
        class="aggsection"
        v-for="li in filteredListInfos"
        :listInfo="li"
        :key="li.title"
      />
    </transition-group>
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
      titles.push("Later This Week");
    }
    const nextWeek = date_util.plusOneWeek(
      date_util.plusOneWeek(date_util.getMonday(today))
    );
    timeDividers.push(nextWeek);
    titles.push("Next Week");
    timeDividers.push(new Date(3000, 0, 0, 0, 0, 0, 0));
    titles.push("Later");
    const futureGroups = _.zip(
      timeDividers.slice(0, timeDividers.length - 1),
      timeDividers.slice(1, timeDividers.length),
      titles
    );

    const yesterday = date_util.getYesterday();
    const ptimeDividers = [today, yesterday];
    const pastTitles = ["Yesterday"];
    if (today.getDay() > 2) {
      const sunday = date_util.getMonday(today);
      ptimeDividers.push(sunday);
      pastTitles.push("Earlier This Week");
    }
    const lastWeek = date_util.offsetByDays(date_util.getMonday(today), -7);
    ptimeDividers.push(lastWeek);
    pastTitles.push("Last Week");
    ptimeDividers.push(new Date(0));
    pastTitles.push("Earlier");

    const pastGroups = _.zip(
      ptimeDividers.slice(1, ptimeDividers.length),
      ptimeDividers.slice(0, ptimeDividers.length - 1),
      pastTitles
    );

    const allPossibleGroups = futureGroups.concat(pastGroups);

    //TODO:
    //add a variable output here that points to the correct list in state, then can just change that and listinfos should react
    //also break up "later" input months up to a year (maybe just a few months?) out, then next year, then later
    //Also have category for yesterday, last week etc.
    //Theoretically these groups should never have to change when displayig different categories, then can just update which list drawing from

    // console.log(timeDividers, titles, futureGroups);
    // console.log(ptimeDividers, pastTitles, pastGroups);
    // console.log(allPossibleGroups);

    return {
      allPossibleGroups,
    };
  },
  computed: {
    ...mapState({
      currentList(state) {
        return state.todolist.currentList;
      },
      listInfos(state) {
        let list;
        switch (this.currentList) {
          case "active":
            list = state.todolist.todoItems;
            break;
          case "past":
            list = state.todolist.pastItems;
            break;
          case "upcoming":
            list = state.todolist.upcomingItems;
            break;
        }
        const ret = this.allPossibleGroups.map((interval) => {
          return {
            getItems: () => {
              return list.filter((i) => {
                return (
                  !i.isDone &&
                  i.dueDate.getTime() <= interval[1].getTime() &&
                  i.dueDate.getTime() > interval[0].getTime() &&
                  i.dueDate.getTime() > new Date()
                );
              });
            },
            getDoneItems: () => {
              return list.filter((i) => {
                return (
                  i.isDone &&
                  i.doneDate.getTime() <= interval[1].getTime() &&
                  i.doneDate.getTime() > interval[0].getTime()
                );
              });
            },
            title: interval[2],
          };
        });
        ret.unshift({
          title: "Overdue",
          getItems: () => {
            const ret = list.filter((i) => {
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
.agglist {
  position: relative;
}
.lists-move {
  transition: transform 0.5s ease;
}

.lists-enter-active {
  animation: rollbounce 0.5s;
}
.lists-leave-active {
  position: absolute;
  animation: rollbounce 0.3s reverse;
}
.lists-leave-to {
  opacity: 0;
}
@keyframes rollbounce {
  0% {
    transform: translateY(-50%) scaleY(0);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
    /* transform: translateY(10%) scaleY(1.2); */
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}
</style>
