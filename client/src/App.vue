<template>
  <div id="app">
    <btd-main-component v-if="authInfo.loggedIn" @logout="logout" />
    <div v-else-if="authInfo.pending" />
    <btd-login v-else @setAuthToken="setAuthToken" />
  </div>
</template>

<script>
import btdMainComponent from "./components/btdMainComponent.vue";
import axios from "axios";
import BtdLogin from "./components/btdLogin.vue";
import { computed } from "vue";
import api_util from "./utility/api_util";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    btdMainComponent,
    BtdLogin,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["authInfo"]),
  },
  provide() {
    return {
      authToken: computed(() => this.authInfo.authTkn),
    };
  },
  methods: {
    ...mapActions(["checkAuthToken"]),
    ...mapMutations(["setAuthInfo"]),
  },
  created() {
    if (
      document.cookie.split(";").some((c) => c.trim().startsWith("authTkn="))
    ) {
      const authTkn = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("authTkn="))
        .split("=")[1];
      if (authTkn.length > 0) {
        this.checkAuthToken(authTkn);
      } else {
        const info = {
          loggedIn: false,
          authTkn: "",
          pending: false,
        };
        this.setAuthInfo(info);
      }
    } else {
      const info = {
        loggedIn: false,
        authTkn: "",
        pending: false,
      };
      this.setAuthInfo(info);
    }
  },
};
</script>

<style>
@font-face {
  font-family: "PinkChicken";
  src: url("./assets/PinkChicken-Regular.ttf") format("truetype");
}
#app {
  font-family: "PinkChicken", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #002447;
  margin-top: 80px;
  /* background-color: #53d3d1; */
}
body {
  background-color: #a6f1ef;
}
</style>
