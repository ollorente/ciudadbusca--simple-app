import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const auth = "http://localhost:9876/api/v1";
export const db = "http://localhost:9500/api/v1";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
