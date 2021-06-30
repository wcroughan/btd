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
          <input type="date" id="dueinput" v-model="duedatestr" />
        </div>
        <div class="formsection duetime">
          <h4>Due by:</h4>
          <label for="duetimeeod">
            <input
              type="radio"
              id="duetimeeod"
              value="endofday"
              v-model="item.dueDateMode"
            />
            End of day
          </label>
          <label for="duetimetime">
            <input
              type="radio"
              id="duetimetime"
              value="dueattime"
              v-model="item.dueDateMode"
            />
            <input
              type="time"
              id="duetimeinput"
              v-model="duetimestr"
              step="900"
            />
          </label>
        </div>
        <div
          class="formsection repeatcontainer"
          :class="item.repeats ? 'repeatcontaineractive' : ''"
        >
          <label class="rc1" for="repeatsbox">
            <btd-checkbox v-model="item.repeats" :id="'repeatsbox'" />
            <span>Repeats</span>
          </label>
          <div class="repeatcontent" v-if="item.repeats">
            <label for="repeveryx">
              <input
                type="radio"
                id="repeveryx"
                value="everyx"
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
                of the month
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
                  min="2"
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
        <div class="formsection buttoncontainer">
          <div class="buttonspacer" />
          <div class="buttonspacer2">
            <button @click="cancel">Cancel</button>
            <btd-dropdown v-if="editingExistingItem && item.repeats">
              <template v-slot:button>
                <button>Save</button>
              </template>
              <template v-slot:content>
                <h4>Apply changes to</h4>
                <section class="dropdown-option">
                  <button @click="finishAndAddItem('single')">
                    Just this occurence
                  </button>
                </section>
                <section class="dropdown-option">
                  <button @click="finishAndAddItem('future')">
                    All future occurences
                  </button>
                </section>
              </template>
            </btd-dropdown>
            <button v-else @click="finishAndAddItem">
              {{ editingExistingItem ? "Save" : "Add" }}
            </button>
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
import { mapActions } from "vuex";
import btdDropdown from "./btdDropdown.vue";
import deepequal from "deep-equal";

export default {
  name: "BtdItemEditModal",
  components: {
    btdCheckbox,
    btdDropdown,
  },
  props: ["initialItem"],
  emits: ["closeModal"],
  data() {
    const d = new Date(this.initialItem.dueDate);
    d.setSeconds(d.getSeconds() - 1);
    let duetimestr = "17:00";
    if (this.initialItem.dueDateMode !== "endofday") {
      duetimestr = date_util.timeInputValueStr(this.initialItem.dueDate);
    }

    return {
      savedDueTime: null,
      item: clone(this.initialItem),
      duedatestr: date_util.calendarInputDateStr(d),
      duetimestr,
      editingExistingItem: this.initialItem._id !== undefined,
    };
  },
  computed: {
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
    ...mapActions("todolist", ["addItem", "updateItem"]),
    finishAndAddItem(repeatUpdateType) {
      date_util.updateDateFromCalendarInputStr(
        this.item.dueDate,
        this.duedatestr
      );
      if (this.item.dueDateMode === "endofday") {
        this.item.dueDate.setDate(this.item.dueDate.getDate() + 1);
        this.item.dueDate.setHours(0, 0, 0, 0);
      } else {
        date_util.updateDateFromTimeInputStr(
          this.item.dueDate,
          this.duetimestr
        );
      }
      if (this.editingExistingItem) {
        const upop = { _id: this.item._id };
        for (const key in this.item) {
          if (!deepequal(this.item[key], this.initialItem[key])) {
            upop[key] = this.item[key];
          }
        }
        upop.repeatUpdateType = repeatUpdateType;
        upop.updateType = "fullitemedit";
        this.updateItem(upop);
      } else this.addItem(this.item);
      this.$emit("closeModal", true);
    },
    cancel() {
      this.$emit("closeModal", false);
    },
  },
  mounted() {
    console.log(this.initialItem);
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
  left: calc(50% - 160px);
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

.rc1 {
  display: flex;
  padding-bottom: 10px;
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
h4 {
  margin: 0px;
  margin-top: 7px;
}

.duetime {
  display: flex;
  flex-direction: column;
}
.buttoncontainer {
  display: flex;
}
.buttonspacer {
  flex-grow: 1;
}
.buttonspacer2 {
  flex-grow: 0;
  display: flex;
}
.formsection {
  margin-top: 15px;
}
.repeatcontaineractive {
  border: 1px solid rgb(150, 150, 150);
  border-radius: 10px;
  padding: 10px;
}
.repeatcontent > label {
  padding-top: 5px;
}
.repeatsubsection > label {
  padding-top: 5px;
}
</style>