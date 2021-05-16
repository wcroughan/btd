<template>
  <div id="app">
    <btd-master-component />
  </div>
</template>

<script>
import btdMasterComponent from "./components/btdMainComponent.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    btdMasterComponent,
  },
  data() {
    return {
      msg: "Loading",
    };
  },
  mounted() {
    axios.get("/api/v1/test").then((res) => {
      this.msg = res.data.body;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: teal;
}
</style>
