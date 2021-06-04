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
                value="rep1"
                v-model="repModeSelection"
              />
              <div class="repeveryx repselsection">
                Every
                <input
                  type="number"
                  v-model="item.repeatInfo.everyx.frequency"
                  min="1"
                />
                Days
              </div>
            </label>
            <label for="repondate">
              <input
                type="radio"
                id="repondate"
                value="rep2"
                v-model="repModeSelection"
              />
              <div class="repondate repselsection">Hi</div>
            </label>
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
      repModeSelection: {},
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
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
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
</style>