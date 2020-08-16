import axios from "axios";
import { auth, db } from "@/main";

const token = localStorage.getItem("access_token");

const state = {
  profile: "",
  user: "",
  users: []
};

const getters = {
  getAuth: state => state.profile,
  getUser: state => state.user,
  getUsers: state => state.users
};

const actions = {
  async auth({ commit }) {
    if (token) {
      await axios
        .get(`${auth}/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
        .then(async response => {
          await commit("setAuth", response.data);
        })
        .catch(e => {
          console.log({
            name: e.name,
            msg: e.message
          });

          localStorage.clear("access_token");
          this.$router.replace("/login");
        });
    }
  },
  async fetchUser({ commit }, id) {
    await axios
      .get(`${db}/users/${id}`)
      .then(async response => {
        await commit("setUser", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchUsers({ commit }) {
    await axios
      .get(`${db}/users`)
      .then(async response => {
        await commit("setUsers", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  }
};

const mutations = {
  setAuth: (state, user) => (state.profile = user),
  setUser: (state, user) => (state.user = user),
  setUsers: (state, users) => (state.users = users)
};

export default {
  state,
  getters,
  actions,
  mutations
};
