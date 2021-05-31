<template>
  <div id="app">
    <btd-main-component v-if="authInfo.loggedIn" @logout="logout" />
    <div v-else-if="authInfo.pending" />
    <btd-login v-else />
  </div>
</template>

<script>
import btdMainComponent from "./components/btdMainComponent.vue";
import BtdLogin from "./components/btdLogin.vue";
import { computed } from "vue";
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
    ...mapState("auth", ["authInfo"]),
  },
  provide() {
    return {
      authToken: computed(() => this.authInfo.authTkn),
    };
  },
  methods: {
    ...mapMutations("auth", ["logout"]),
    ...mapActions("auth", ["tryCookieLogin"]),
  },
  created() {
    this.tryCookieLogin();
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
