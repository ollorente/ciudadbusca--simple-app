import axios from "axios";
import { db } from "@/main";

const state = {
  city: "",
  cities: [],
  citiesByStatement: []
};

const getters = {
  getCity: state => state.city,
  getCities: state => state.cities,
  getCitiesByStatement: state => state.citiesByStatement
};

const actions = {
  async fetchCity({ commit }, id) {
    await axios
      .get(`${db}/cities/${id}`)
      .then(async response => {
        await commit("setCity", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchCities({ commit }) {
    await axios
      .get(`${db}/cities`)
      .then(async response => {
        await commit("setCities", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchCitiesByStatement({ commit }, id) {
    await axios
      .get(`${db}/states/${id}/cities`)
      .then(async response => {
        await commit("setCitiesByStatement", response.data);
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
  setCity: (state, city) => (state.city = city),
  setCities: (state, cities) => (state.cities = cities),
  setCitiesByStatement: (state, cities) => (state.citiesByStatement = cities)
};

export default {
  state,
  getters,
  actions,
  mutations
};
