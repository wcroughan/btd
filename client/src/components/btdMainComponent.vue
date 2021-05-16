<template>
  <div class="btd-main-component">
    <btd-header :date="selectedDate" @dayChosen="dayChosen($event)" />
    <btd-loading-body v-if="lists === null" />
    <btd-list
      v-for="list in lists"
      :key="list.id"
      :title="list.title"
      :items="list.items"
    />
  </div>
</template>

<script>
import date_util from "../utility/date_util.js";
import btdHeader from "./btdHeader.vue";
import btdLoadingBody from "./btdLoadingBody.vue";
import btdList from "./btdList.vue";
import api_util from "../utility/api_util.js";

export default {
  name: "btdMainComponent",
  components: {
    btdHeader,
    btdLoadingBody,
    btdList,
  },
  data() {
    return {
      selectedDate: date_util.getToday(),
      lists: null,
    };
  },
  props: {},
  methods: {
    dayChosen(date) {
      //   console.log("main got date", date);
      this.selectedDate = date;
    },
    updateLists(date) {
      api_util.getListsForDate(date, (res) => {
        console.log(res);
        if (this.selectedDate === date) {
          this.lists = res.data;
        }
      });
    },
  },
  watch: {
    selectedDate(newval) {
      this.updateLists(newval);
    },
  },
  mounted() {
    this.updateLists(this.selectedDate);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
