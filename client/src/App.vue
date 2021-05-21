<template>
  <div id="app">
    <btd-main-component v-if="authInfo.loggedIn" />
    <btd-login v-if="!authInfo.loggedIn" @setAuthToken="setAuthToken" />
  </div>
</template>

<script>
import btdMainComponent from "./components/btdMainComponent.vue";
import axios from "axios";
import BtdLogin from "./components/btdLogin.vue";
import { computed } from "vue";

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
      },
    };
  },
  provide() {
    return {
      authToken: computed(() => this.authInfo.atkn),
    };
  },
  methods: {
    setAuthToken(tknInfo) {
      if (tknInfo.loggedIn) {
        this.authInfo.atkn = tknInfo.auth_token;
        console.log("setting authtoken", this.authInfo.atkn);
        document.cookie = `atkn=${this.authInfo.atkn} ; expires=${tknInfo.expireDate}`;
        console.log("cookie: ", document.cookie);
      } else {
        this.authInfo.atkn = "";
        document.cookie = `atkn="" ; expires=""`;
        console.log("cookie: ", document.cookie);
      }
      this.authInfo.loggedIn = tknInfo.loggedIn;
    },
  },
  created() {
    console.log("cookie: ", document.cookie);
    if (document.cookie.split(";").some((c) => c.trim().startsWith("atkn="))) {
      this.authInfo.atkn = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("atkn="))
        .split("=")[1];
      if (this.authInfo.atkn.length > 0) {
        console.log(this.authInfo.atkn.length, this.authInfo.atkn);
        this.authInfo.loggedIn = true;
        console.log("found a token. authinfo", this.authInfo);
      } else {
        this.authInfo.loggedIn = false;
      }
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #002447;
  margin-top: 60px;
  /* background-color: teal; */
}
</style>
