import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { auth, db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggIn: false,
    profile: "",
    user: "",
    userLogin: ""
  },
  getters: {
    getProfile: state => state.profile,
    getUser: state => state.user
  },
  mutations: {
    setProfile: (state, user) => (state.profile = user),
    setUser: (state, user) => (state.userLogin = user)
  },
  actions: {
    async fetchProfile({ commit }, id) {
      const response = await axios.get(`${auth}/profile`, id, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      commit("setProfile", response.data);
    },
    async fetchUser({ commit }, id) {
      const response = await axios.get(`${db}/users/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      commit("setUser", response.data);
    }
  },
  modules: {}
});
