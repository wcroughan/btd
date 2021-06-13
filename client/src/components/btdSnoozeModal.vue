<template>
  <teleport to="body">
    <div class="snooze-modal">
      <div class="non-menu-mask" />
      <div class="modal-content">
        <button
          v-for="(option, idx) in quickOptions"
          :key="idx"
          @click="snoozeChosen(option)"
        >
          {{ option.text }}
        </button>
        <div class="custom-option">
          <h4>Custom time:</h4>
          <div />
          <label for="cdate">Due date:</label>
          <input id="cdate" type="date" v-model="cdatestr" />
          <span>Due time:</span>
          <div class="duetimeoptions">
            <label for="duetimeeod">
              <input
                id="duetimeeod"
                value="duetimeeod"
                type="radio"
                v-model="cdatetimeoption"
              />End of day</label
            >
            <label for="duetimetime"
              ><input
                id="duetimetime"
                type="radio"
                value="duetimetime"
                v-model="cdatetimeoption" />Time:
              <input type="time" v-model="ctimestr"
            /></label>
          </div>
          <span>Show:</span>
          <div class="showtimeoptions">
            <label for="showtimenow"
              ><input
                id="showtimenow"
                value="showtimenow"
                type="radio"
                v-model="showTimeOptions"
              />Now</label
            >
            <label for="showtimexbefore">
              <input
                id="showtimexbefore"
                type="radio"
                value="showtimexbefore"
                v-model="showTimeOptions"
              />
              <input
                class="numberinput"
                type="number"
                min="1"
                v-model.number="xbeforenum"
              />
              <select v-model="xbeforeunit">
                <option value="days">days</option>
                <option value="weeks">weeks</option>
                <option value="months">months</option>
                <option value="years">years</option>
              </select>
              before it's due
            </label>
            <label for="showtimeattime"
              ><input
                id="showtimeattime"
                type="radio"
                value="showtimeattime"
                v-model="showTimeOptions"
              />
              At this time:
              <input id="showdate" type="date" v-model="showdatestr" />
              <input id="showtime" type="time" v-model="showtimestr" />
            </label>
          </div>
        </div>
        <div class="buttoncontainer">
          <div class="buttonspacer" />
          <div class="buttonspacer2">
            <button @click="cancel" class="cancel-button">Cancel</button>
            <button @click="finish">Snooze</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapActions } from "vuex";
import date_util from "../utility/date_util";

export default {
  name: "BtdItemEditModal",
  components: {},
  props: ["item"],
  emits: ["closeModal", "snoozeDateChosen"],
  data() {
    const quickOptions = [
      {
        text: "Tomorrow",
        newDueDate: date_util.tomorrow(date_util.getTomorrow()),
        newDisplayDate: date_util.getTomorrow(),
      },
    ];
    const d = date_util.getToday();
    if (d.getDay() < 4) {
      quickOptions.push({
        text: "This weekend",
        newDueDate: date_util.offsetByDays(date_util.getMonday(), 7),
        newDisplayDate: date_util.offsetByDays(date_util.getMonday(), 5),
      });
    }

    if (d.getDay() !== 0) {
      quickOptions.push({
        text: "Next week",
        newDueDate: date_util.offsetByDays(date_util.getMonday(), 8),
        newDisplayDate: date_util.offsetByDays(date_util.getMonday(), 7),
      });
    }

    return {
      quickOptions,
      cdatestr: date_util.calendarInputDateStr(
        date_util.tomorrow(date_util.getTomorrow())
      ),
      ctimestr: "17:00",
      cdatetimeoption: "duetimeeod",
      showTimeOptions: "showtimenow",
      xbeforenum: 1,
      xbeforeunit: "days",
      showdatestr: date_util.calendarInputDateStr(date_util.getTomorrow()),
      showtimestr: "17:00",
    };
  },
  computed: {},
  methods: {
    ...mapActions("todolist", ["updateItem"]),
    snoozeChosen(option) {
      this.$emit("snoozeDateChosen", option);
    },
    cancel() {
      this.$emit("closeModal", false);
    },
    finish() {
      const customOption = {
        newDueDate,
        newDisplayDate,
      };
      this.$emit("snoozeDateChosen", customOption);
    },
  },
};
</script>

<style scoped>
.item-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.non-menu-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
  position: absolute;
  /* margin: auto; */
  top: calc(25% - 150px);
  left: calc(40% - 160px);
  /* width: 50%; */
  /* height: 50%; */
  min-width: 300px;
  /* min-height: 300px; */
  z-index: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
}

.modal-content > * {
  border-radius: 15px;
  border: 1px solid grey;
  margin: 5px;
}

.numberinput {
  max-width: 35px;
  margin-right: 10px;
  margin-left: 10px;
}

h4 {
  margin: 0px;
  margin-top: 7px;
  padding-bottom: 10px;
}

.buttoncontainer {
  display: flex;
  padding-top: 10px;
}
.buttonspacer {
  flex-grow: 1;
}
.buttonspacer2 {
  flex-grow: 0;
}

button {
  padding-bottom: 20px;
}
/* button:last-child {
  padding-top: 20px;
  padding-bottom: 0px;
} */
.buttoncontainer {
  display: flex;
}
.buttonspacer {
  flex-grow: 1;
}
.buttonspacer2 {
  flex-grow: 0;
}
.cancel-button {
  font-weight: normal;
  padding-right: 30px;
  color: rgb(100, 100, 100);
}

.custom-option {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 20px;
}
.duetimecontainer {
  display: flex;
}
.duetimecontainer > span {
  min-width: 80px;
}
.duetimeoptions {
  display: flex;
  flex-direction: column;
}
.showtimeoptions {
  display: flex;
  flex-direction: column;
}

.numberinput {
  max-width: 35px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>