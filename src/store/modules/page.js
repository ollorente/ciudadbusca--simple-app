import axios from "axios";
import { db } from "@/main";

const token = localStorage.getItem("access_token");

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
  async newPage({ commit }, id) {
    await axios
      .post(`${db}/pages`, JSON.stringify(id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(async response => {
        await commit("addPage", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPage({ commit }, id) {
    await axios
      .get(`${db}/pages/${id}`)
      .then(async response => {
        commit("setPage", {
          id: await response.data._id,
          name: await response.data.name,
          slug: await response.data.slug,
          userId: await response.data.userId,
          geoLat: await response.data.geo.lat,
          geoLon: await response.data.geo.lon,
          image: await response.data.image,
          description: await response.data.description,
          location: await response.data.location,
          phone: await response.data.phone,
          mobile: await response.data.mobile,
          countryId: await response.data.countryId._id,
          countryIdName: await response.data.countryId.name,
          countryIdSlug: await response.data.countryId.slug,
          stateId: await response.data.stateId._id,
          stateIdCode: await response.data.stateId.code,
          stateIdName: await response.data.stateId.name,
          cityId: await response.data.cityId._id,
          cityIdCode: await response.data.cityId.code,
          cityIdName: await response.data.cityId.name,
          isActive: await response.data.isActive,
          isLock: await response.data.isLock,
          createdAt: await response.data.createdAt
        });
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
      .then(async response => {
        await commit("setPages", response.data);
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
  addPage: (state, newPage) => (state.pagesPerUser = newPage),
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
