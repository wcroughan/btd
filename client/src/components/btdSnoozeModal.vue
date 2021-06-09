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
          <h4>Choose time</h4>
          ASDFqwer
        </div>
        <button class="cancel-button" @click="cancel">Cancel</button>
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

.numberinput {
  max-width: 35px;
  margin-right: 10px;
  margin-left: 10px;
}

h4 {
  margin: 0px;
  margin-top: 7px;
}

.buttoncontainer {
  display: flex;
}
.buttonspacer {
  flex-grow: 1;
}
.buttonspacer2 {
  flex-grow: 0;
}
</style>