// import Vue from 'vue';
// // import { createApp } from 'vue';
// import App from './App.vue';

// Vue.config.productionTip = false

// const app = new Vue({
//     render: h => h(App),
// });
// // const app = createApp(App);

// app.$mount('#app')

import { createApp } from "vue";
import App from "./App.vue";
import VueClickAway from "vue3-click-away";

const app = createApp(App);
app.use(VueClickAway);
app.mount('#app');