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

export default {
  name: "App",
  components: {
    btdMainComponent,
    BtdLogin,
  },
  data() {
    return {
      msg: "Loading",
      authInfo: {
        loggedIn: false,
        atkn: "",
        pending: true,
      },
    };
  },
  provide() {
    return {
      authToken: computed(() => this.authInfo.atkn),
    };
  },
  methods: {
    logout() {
      this.authInfo.atkn = "";
      document.cookie = `atkn= ; expires=${new Date()}`;
      this.authInfo.loggedIn = false;
      this.authInfo.pending = false;
    },
    setAuthToken(tknInfo) {
      if (tknInfo.loggedIn) {
        this.authInfo.atkn = tknInfo.auth_token;
        // console.log("setting authtoken", this.authInfo.atkn);
        // console.log(tknInfo.expireDate);
        document.cookie = `atkn=${
          this.authInfo.atkn
        } ; expires=${tknInfo.expireDate.toUTCString()}`;
        // console.log("cookie: ", document.cookie);
      } else {
        this.authInfo.atkn = "";
        document.cookie = `atkn= ; expires=`;
        // console.log("cookie: ", document.cookie);
      }
      this.authInfo.loggedIn = tknInfo.loggedIn;
      this.authInfo.pending = false;
    },
  },
  created() {
    // console.log("cookie: ", document.cookie);
    if (document.cookie.split(";").some((c) => c.trim().startsWith("atkn="))) {
      this.authInfo.atkn = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("atkn="))
        .split("=")[1];
      if (this.authInfo.atkn.length > 0) {
        // console.log(this.authInfo.atkn.length, this.authInfo.atkn);
        api_util.checkAuthToken(this.authInfo.atkn, (res) => {
          if (res.data.success && res.data.authenticated)
            this.authInfo.loggedIn = true;
          else this.authInfo.loggedIn = false;
          this.authInfo.pending = false;
        });
        // console.log("found a token. authinfo", this.authInfo);
      } else {
        this.authInfo.loggedIn = false;
        this.authInfo.pending = false;
      }
    } else {
      this.authInfo.pending = false;
    }
  },
  mounted() {
    axios.get("/api/v1/test").then((res) => {
      this.msg = res.data.body;
    });
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
