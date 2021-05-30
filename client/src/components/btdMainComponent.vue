<template>
  <div class="btd-main-component">
    <btd-header />
    <btd-loading-body v-if="loadingItems" />
    <btd-no-lists-filler v-else-if="numTodoItems === 0" />
    <btd-aggregated-list v-else />
  </div>
</template>

<script>
import btdHeader from "./btdHeader.vue";
import btdLoadingBody from "./btdLoadingBody.vue";
import btdNoListsFiller from "./btdNoListsFiller.vue";
import { provide, ref } from "vue";
import btdAggregatedList from "./btdAggregatedList.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "btdMainComponent",
  components: {
    btdHeader,
    btdLoadingBody,
    btdNoListsFiller,
    btdAggregatedList,
  },
  computed: {
    ...mapState(["loadingItems"]),
    ...mapGetters(["numTodoItems"]),
  },
  setup() {
    const streakUpdateFlag = ref(0);
    const streakUpdateReceived = () => streakUpdateFlag.value--;
    provide("streakUpdateFlag", streakUpdateFlag);
    provide("streakUpdateReceived", streakUpdateReceived);

    return {
      streakUpdateFlag,
    };
  },
  methods: {
    ...mapActions(["refreshItems"]),
  },
  mounted() {
    this.refreshItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btd-main-component {
  max-width: 600px;
  margin: auto;
}
</style>
