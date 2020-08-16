import axios from "axios";
import { db } from "@/main";

const state = {
  page: "",
  pages: [],
  pagesPerUser: []
};

const getters = {
  getPage: state => state.page,
  getPages: state => state.pages,
  getPagesPerUser: state => state.pagesPerUser
};

const actions = {
  async fetchPage({ commit }, id) {
    await axios
      .get(`${db}/pages/${id}`)
      .then(response => {
        commit("setPage", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPages({ commit }) {
    await axios
      .get(`${db}/pages`)
      .then(response => {
        commit("setPages", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPagesPerUser({ commit }, data) {
    await axios
      .get(`${db}/users/${data}/pages`)
      .then(async response => {
        await commit("setPagesPerUser", response.data);
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
  setPage: (state, page) => (state.page = page),
  setPages: (state, pages) => (state.pages = pages),
  setPagesPerUser: (state, pages) => (state.pagesPerUser = pages)
};

export default {
  state,
  getters,
  actions,
  mutations
};
