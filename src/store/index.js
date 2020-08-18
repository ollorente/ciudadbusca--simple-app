import Vue from "vue";
import Vuex from "vuex";
import city from "./modules/city";
import country from "./modules/country";
import page from "./modules/page";
import post from "./modules/post";
import statement from "./modules/state";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    city,
    country,
    page,
    post,
    statement,
    user
  }
});
