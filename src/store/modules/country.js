import axios from "axios";
import { db } from "@/main";

const state = {
  country: "",
  countries: []
};

const getters = {
  getCountry: state => state.country,
  getCountries: state => state.countries
};

const actions = {
  async fetchCountry({ commit }, id) {
    await axios
      .get(`${db}/countries/${id}`)
      .then(async response => {
        await commit("setCountry", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchCountries({ commit }) {
    await axios
      .get(`${db}/countries`)
      .then(async response => {
        await commit("setCountries", response.data);
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
  setCountry: (state, country) => (state.country = country),
  setCountries: (state, countries) => (state.countries = countries)
};

export default {
  state,
  getters,
  actions,
  mutations
};
