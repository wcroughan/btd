<template>
  <teleport to="body">
    <div class="item-edit-modal">
      <div class="non-menu-mask" />
      <div class="modal-content">
        <div class="formsection task">
          <label for="taskinput"> Task: </label>
          <input type="text" id="taskinput" v-model="item.text" />
        </div>
        <div class="formsection duedate">
          <label for="dueinput"> Due date: </label>
          <input type="date" id="dueinput" v-model="duedate" />
        </div>
        <div class="formsection duetime">
          <label for="duetimeinput"> Due by: </label>
          <span v-if="!hasDueTime">End of day</span>
          <input
            v-else
            type="time"
            id="duetimeinput"
            @change="duetime = $event.target.value"
            :value="duetime"
            step="900"
          />
          <button @click="toggleDueTimeClicked">
            {{ hasDueTime ? "End of day" : "Add time" }}
          </button>
        </div>
        <div class="formsection repeatcontainer">
          <label class="rc1" for="repeatsbox">
            <btd-checkbox
              @change="showRepeatSection = $event.target.checked"
              :id="'repeatsbox'"
              :checked="false"
            />
            <span>Repeats</span>
          </label>
          <div class="repeatcontent" v-if="showRepeatSection">
            <label for="repeveryx">
              <input
                type="radio"
                id="repeveryx"
                value="repeveryx"
                v-model="item.repeatInfo.repeatMode"
              />
              <div class="repeveryx repselsection">
                Every
                <input
                  class="numberinput"
                  type="number"
                  v-model.number="item.repeatInfo.everyx.frequency"
                  min="1"
                />
                <select v-model="item.repeatInfo.everyx.unit">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </select>
              </div>
            </label>
            <label for="reponxweekday">
              <input
                type="radio"
                id="reponxweekday"
                value="reponxweekday"
                v-model="item.repeatInfo.repeatMode"
              />
              <div class="reponxweekday repselsection">
                On the
                <select v-model="item.repeatInfo.xweekday.x">
                  <option value="1st">1st</option>
                  <option value="last">last</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                </select>
                <select v-model="item.repeatInfo.xweekday.weekday">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </label>
            <div class="repeatsubsection">
              <h4>Ends:</h4>
              <label for="endafterx">
                <input
                  type="radio"
                  id="endafterx"
                  value="endafterx"
                  v-model="item.repeatInfo.end.endMode"
                />
                After
                <input
                  type="number"
                  class="numberinput"
                  min="1"
                  v-model.number="item.repeatInfo.end.endafterx"
                />
                Occurences
              </label>
              <label for="endon">
                <input
                  type="radio"
                  id="endon"
                  value="endon"
                  v-model="item.repeatInfo.end.endMode"
                />
                On
                <input type="date" v-model="endOnCalendarVal" />
              </label>
              <label for="endnever">
                <input
                  type="radio"
                  id="endnever"
                  value="endnever"
                  v-model="item.repeatInfo.end.endMode"
                />
                Never
              </label>
            </div>
            <div class="repeatsubsection">
              <h4>Show:</h4>
              <label for="shownow">
                <input
                  type="radio"
                  id="shownow"
                  value="shownow"
                  v-model="item.repeatInfo.show.showMode"
                />
                now
              </label>
              <label for="xunits">
                <input
                  type="radio"
                  id="xunits"
                  value="xunits"
                  v-model="item.repeatInfo.show.showMode"
                />
                <input
                  class="numberinput"
                  type="number"
                  v-model.number="item.repeatInfo.show.xunits.x"
                  min="1"
                />
                <select v-model="item.repeatInfo.show.xunits.unit">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </select>
                before due date
              </label>
              <label for="showweekday">
                <input
                  type="radio"
                  id="showweekday"
                  value="showweekday"
                  v-model="item.repeatInfo.show.showMode"
                />
                on the
                <select v-model="item.repeatInfo.show.weekday">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                before due date
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import clone from "just-clone";
import btdCheckbox from "./btdCheckbox.vue";
import date_util from "../utility/date_util";

export default {
  name: "BtdItemEditModal",
  components: {
    btdCheckbox,
  },
  props: ["initialItem"],
  data() {
    return {
      hasDueTime: false,
      savedDueTime: null,
      item: clone(this.initialItem),
      showRepeatSection: false,
    };
  },
  computed: {
    duedate: {
      get() {
        //if it's midnight, should show the day before technically
        const d = new Date(this.item.dueDate);
        d.setSeconds(d.getSeconds() - 1);
        return date_util.calendarInputDateStr(d);
      },
      set(val) {
        // console.log(val);
        date_util.updateDateFromCalendarInputStr(this.item.dueDate, val);
        // console.log(this.item.dueDate);
        if (!this.hasDueTime)
          this.item.dueDate.setDate(this.item.dueDate.getDate() + 1);
        this.item.dueDate = new Date(this.item.dueDate);
      },
    },
    duetime: {
      get() {
        const ret = date_util.timeInputValueStr(this.item.dueDate);
        // console.log(ret);
        return ret;
        // return this.item.dueDate;
      },
      set(val) {
        console.log("due time setting: ", val);
        date_util.updateDateFromTimeInputStr(this.item.dueDate, val);
        // console.log(this.item.dueDate);
        this.savedDueTime = val;
        this.item.dueDate = new Date(this.item.dueDate);
      },
    },
    endOnCalendarVal: {
      get() {
        const ret = date_util.calendarInputDateStr(
          this.item.repeatInfo.end.endon
        );
        console.log(ret);
        return ret;
      },
      set(val) {
        console.log("end on calendar setting: ", val);
        date_util.updateDateFromCalendarInputStr(
          this.item.repeatInfo.end.endon,
          val
        );
        console.log(this.item.repeatInfo.end.endon);
        this.item.repeatInfo.end.endon = new Date(
          this.item.repeatInfo.end.endon
        );
      },
    },
  },
  methods: {
    toggleDueTimeClicked() {
      this.hasDueTime = !this.hasDueTime;
      console.log(this.savedDueTime);
      if (!this.hasDueTime) {
        console.log("tog1");
        //no due time, set back to midnight
        this.item.dueDate.setHours(0, 0, 0, 0);
        this.item.dueDate.setDate(this.item.dueDate.getDate() + 1);
      } else if (this.savedDueTime === null) {
        console.log("tog2");
        //user hasn't input any time specifically, but now wants there to be a date. Set it to a default
        this.item.dueDate.setDate(this.item.dueDate.getDate() - 1);
        this.item.dueDate.setHours(17);
      } else {
        console.log("tog3");
        //user switching back to due time, and has input previously
        this.item.dueDate.setDate(this.item.dueDate.getDate() - 1);
        date_util.updateDateFromTimeInputStr(
          this.item.dueDate,
          this.savedDueTime
        );
      }

      //more reactivity hax
      this.item.dueDate = new Date(this.item.dueDate);

      console.log(this.item.dueDate);
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
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  /* width: 50%; */
  /* height: 50%; */
  min-width: 300px;
  min-height: 300px;
  z-index: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.rc1 {
  display: flex;
}

.repeatcontent > label {
  display: flex;
}

.numberinput {
  max-width: 35px;
  margin-right: 10px;
  margin-left: 10px;
}

.repeatsubsection {
  display: flex;
  flex-direction: column;
}
.repeatsubsection > h4 {
  margin: 0px;
  margin-top: 7px;
}
</style>