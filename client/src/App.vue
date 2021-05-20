<template>
  <div id="app">
    <btd-main-component v-if="loggedIn" :authToken="auth_token" />
    <btd-login v-if="!loggedIn" @setAuthToken="setAuthToken" />
  </div>
</template>

<script>
import btdMainComponent from "./components/btdMainComponent.vue";
import axios from "axios";
import BtdLogin from "./components/btdLogin.vue";

export default {
  name: "App",
  components: {
    btdMainComponent,
    BtdLogin,
  },
  data() {
    return {
      msg: "Loading",
      auth_token: null,
      loggedIn: false,
    };
  },
  methods: {
    setAuthToken(tknInfo) {
      this.loggedIn = tknInfo.loggedIn;
      if (tknInfo.loggedIn) {
        this.auth_token = tknInfo.auth_token;
      }
    },
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
  /* background-color: teal; */
}
</style>
