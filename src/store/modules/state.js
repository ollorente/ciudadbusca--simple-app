import axios from "axios";
import { db } from "@/main";

const state = {
  statement: "",
  statements: [],
  statementsByCountry: []
};

const getters = {
  getStatement: state => state.statement,
  getStatements: state => state.statements,
  getStatementsByCountry: state => state.statementsByCountry
};

const actions = {
  async fetchStatement({ commit }, id) {
    await axios
      .get(`${db}/states/${id}`)
      .then(async response => {
        await commit("setStatement", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchStatements({ commit }) {
    await axios
      .get(`${db}/states`)
      .then(async response => {
        await commit("setStatements", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchStatementsByCountry({ commit }, id) {
    await axios
      .get(`${db}/countries/${id}/states`)
      .then(async response => {
        await commit("setStatementsByCountry", response.data);
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
  setStatement: (state, statement) => (state.statement = statement),
  setStatements: (state, statements) => (state.statements = statements),
  setStatementsByCountry: (state, statements) =>
    (state.statementsByCountry = statements)
};

export default {
  state,
  getters,
  actions,
  mutations
};
