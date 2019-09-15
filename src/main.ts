import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import translate from "./filters/translate";

Vue.config.productionTip = false;

Vue.filter("translate", translate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
