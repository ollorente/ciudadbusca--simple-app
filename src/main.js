import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

/* import dotenv from "dotenv";

const config = dotenv.config();
if (config.error) {
  console.log("Could not load env file", config.error);
} */

Vue.config.productionTip = false;

export const auth = "http://localhost:9876/api/v1";
export const db = "http://localhost:9500/api/v1";
/* export const auth = process.env.AUTH;
export const db = process.env.SERVER; */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
