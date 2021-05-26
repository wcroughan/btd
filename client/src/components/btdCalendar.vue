<template>
  <div class="btd-calendar">
    <div class="cal-head">
      <div class="left-button"></div>
      <div class="cal-title"></div>
      <div class="right-button"></div>
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
        <td v-for="(day, ridx) in row" :key="day + '' + ridx">
          <div class="day" :class="dayinfo[dstr(day)].classes">
            {{ day.getDate() }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const _ = require("underscore");

export default {
  name: "btdCalendar",
  components: {},
  props: {
    date: null,
  },
  data() {
    return {
      daystable: [[], []],
      dayinfo: {},
    };
  },
  methods: {
    setDaysTableForDate() {
      const d = new Date(this.date);
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      const d1 = new Date(d);
      d1.setDate(d1.getDate() - d1.getDay() + 1);
      const d2 = new Date(d);
      d2.setMonth(d2.getMonth() + 1);
      d2.setDate(d2.getDate() - 1);
      d2.setDate(d2.getDate() - d2.getDay() + 7);
      console.log("from: ", d1, "to: ", d2);

      console.log(d2 - d1);
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = oneDay * 7;
      const nWeeks = Math.round((d2 - d1) / oneWeek);
      console.log(nWeeks);

      this.daystable = _.range(0, nWeeks).map((wk) => {
        const days = _.range(0, 7).map((dy) => {
          const di = new Date(d1);
          di.setDate(di.getDate() + 7 * wk + dy);
          return di;
        });
        const dii = new Date(d1);
        dii.setDate(dii.getDate() + 7 * wk);
        days.push(dii);
        return days;
      });
      this.daystable.flat().forEach((v) => this.fillDateInfo(v));
      console.log(
        "TODO: api_util call for dates info between d1 & d2, callback updates dayinfo"
      );
      console.log(this.dayinfo);
    },
    dstr(d) {
      return "" + d;
    },
    fillDateInfo(d) {
      console.log("TODO: date_util call here");
      //   const datestr = this.dstr(d);
      const datestr = "" + d;
      if (this.dayinfo[datestr] === undefined) {
        this.dayinfo[datestr] = {
          d,
          classes: {
            done: Math.random() < 0.5,
            skip: d.getDay() == 6 || d.getDay() == 0,
            future: d > new Date(),
            type: "day",
          },
        };
      }
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

.future {
  border: 1px dashed rgb(200, 200, 200);
  color: grey;
}
.done {
  background-color: green;
}
.day.skip {
  background-color: rgb(200, 200, 200);
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
</style>
