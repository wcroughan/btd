<template>
  <div class="btd-calendar">
    <div class="cal-head">
      <div class="left-button">
        <img
          src="../assets/down-arrow-red.png"
          @click="lastMonthClicked"
          alt="Last Month"
          class="left-arrow arrow"
        />
      </div>
      <span class="cal-title">{{ title }}</span>
      <div class="right-button">
        <img
          src="../assets/down-arrow-red.png"
          @click="nextMonthClicked"
          alt="Next Month"
          class="right-arrow arrow"
        />
      </div>
      <span class="today-button" @click="todayClicked">Today</span>
    </div>
    <table class="cal-body">
      <tr>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
        <th>S</th>
        <th>Week</th>
      </tr>
      <tr v-for="(row, idx) in daystable" :key="'tr_' + idx">
        <td v-for="day in row" :key="day.idstr">
          <div
            class="day"
            :class="[
              dayinfo[day.idstr].classes,
              day.type === 'week' ? 'week' : 'day',
            ]"
          >
            {{ dayText(day) }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import api_util from "../utility/api_util";
import date_util from "../utility/date_util";
const _ = require("underscore");

export default {
  name: "btdCalendar",
  components: {},
  props: {
    initialDate: null,
  },
  inject: ["authToken"],
  data() {
    return {
      datestr: "" + new Date(this.initialDate),
      daystable: [[], []],
      dayinfo: {},
    };
  },
  computed: {
    title() {
      const formatOptions = {
        month: "long",
        year: "numeric",
      };
      const d = new Date(this.datestr);
      d.setHours(0, 0, 0, 0);
      return new Intl.DateTimeFormat("en-US", formatOptions).format(d);
    },
  },
  methods: {
    dayText(day) {
      if (day.type === "day") return day.d.getDate();
      else {
        const d2 = new Date(day.d);
        d2.setDate(d2.getDate() + 6);
        return day.d.getDate() + " - " + d2.getDate();
      }
    },
    todayClicked() {
      this.datestr = "" + date_util.getToday();
    },
    lastMonthClicked() {
      const d = new Date(this.datestr);
      d.setMonth(d.getMonth() - 1);
      this.datestr = "" + d;
    },
    nextMonthClicked() {
      const d = new Date(this.datestr);
      d.setMonth(d.getMonth() + 1);
      this.datestr = "" + d;
    },
    setDaysTableForDate() {
      const d = new Date(this.datestr);
      d.setDate(1);
      if (d.getHours() !== 0) {
        console.log("Calendar has a problem witha date!");
      }
      d.setHours(0, 0, 0, 0);
      const d1 = new Date(d);
      d1.setDate(d1.getDate() - d1.getDay() + 1);
      const d2 = new Date(d);
      d2.setMonth(d2.getMonth() + 1);
      d2.setDate(d2.getDate() - 1);
      d2.setDate(d2.getDate() - d2.getDay() + 7);
      //   console.log("from: ", d1, "to: ", d2);

      //   console.log(d2 - d1);
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = oneDay * 7;
      const nWeeks = Math.round((d2 - d1) / oneWeek);
      //   console.log(nWeeks);

      this.daystable = _.range(0, nWeeks).map((wk) => {
        const days = _.range(0, 7).map((dy) => {
          const di = new Date(d1);
          di.setDate(di.getDate() + 7 * wk + dy);
          return this.dayTableObject(di, "day");
        });
        const dii = new Date(d1);
        dii.setDate(dii.getDate() + 7 * wk);
        days.push(this.dayTableObject(dii, "week"));
        return days;
      });
      this.daystable.flat().forEach((v) => this.fillDateInfo(v));
      api_util.getDaysInfo(this.authToken.value, d1, d2, (info) => {
        info.data.forEach((v) => {
          //   console.log(
          //     "changing dayinfo id",
          //     v.id,
          //     "from",
          //     this.dayinfo[v.id],
          //     "to",
          //     v
          //   );
          this.dayinfo[v.id].classes = {
            ...this.dayinfo[v.id].classes,
            done: v.isDone,
            skip: v.isSkipped,
          };
        });
      });
      //   console.log(this.dayinfo);
    },
    dayTableObject(d, type) {
      return {
        d,
        idstr: type + "_" + date_util.apiDateStr(d),
        type,
      };
    },
    fillDateInfo(d) {
      const nd = new Date();
      if (this.dayinfo[d.idstr] === undefined) {
        this.dayinfo[d.idstr] = {
          d,
          classes: {
            done: false,
            skip: d.d.getDay() == 6 || d.d.getDay() == 0,
            future: d.d > nd,
            today: nd > d.d && nd - d.d < 1000 * 60 * 60 * 24,
          },
        };
      }
    },
  },
  watch: {
    datestr() {
      this.setDaysTableForDate();
    },
  },
  mounted() {
    this.setDaysTableForDate();
  },
};
</script>

<style>
.day {
  margin: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 68%;
}
.week {
  width: 70px;
  border-radius: 10px;
  padding: 0px 5px;
}

.future {
  /* border: 1px dashed rgb(200, 200, 200); */
  color: grey;
}
.done {
  background-color: rgb(82, 212, 82);
}
.day.skip {
  background-color: rgb(200, 200, 200);
}
.today {
  border: 3px solid blue;
}

th {
  text-align: center;
  background-color: blue;
  color: white;
  border: 1px solid black;
}
table {
  border-collapse: collapse;
}

td:first-child {
  border-left: 1px solid black;
}
td:last-child {
  padding: 0px 15px;
  border-left: 1px solid black;
}
tr:last-child > td {
  border-bottom: 1px solid black;
}
tr:last-child > td:last-child {
  border-bottom-width: 0px;
}

.cal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 5px;
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

.today-button {
  font-size: 0.7em;
  color: rgb(60, 60, 211);
  padding: 7px 17px;
  /* border: 1px solid black; */
  /* border-radius: 10px; */
  font-weight: bold;
}
</style>
