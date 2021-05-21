<template>
  <div id="btd-login">
    <img src="../assets/logo.png" />
    <div id="login-form">
      Email:<input v-model="email" /><br />
      Password:<input type="password" v-model="pwd" /><br />
      <button @click="createAccount">Create Account</button>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import api_util from "../utility/api_util";

export default {
  name: "btdLogin",
  components: {},
  emits: ["setAuthToken"],
  data() {
    return {
      email: "",
      pwd: "",
    };
  },
  methods: {
    async createAccount() {
      const hpw = await api_util.getHash(this.pwd);
      //   console.log("creating account with ", this.email, hpw);
      api_util.createAccount(this.email, hpw, this.createAccountCallback);
    },
    createAccountCallback(res) {
      //   console.log(res.data);
      if (res.data.success) {
        // console.log("success, logggin in");
        this.login();
      }
    },
    async login() {
      const hpw = await api_util.getHash(this.pwd);
      //   console.log("logging in with ", this.email, hpw);
      api_util.login(this.email, hpw, this.loginCallback);
    },
    loginCallback(res) {
      //   console.log(res);
      if (res.data.success) {
        this.$emit("setAuthToken", {
          loggedIn: true,
          auth_token: res.data.auth_token,
        });
      }
    },
  },
};
</script>

<style>
</style>
