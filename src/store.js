import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    level: {},
    action: "",
    sudoku: {}
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setLevel: (state, levelChoise) => (state.level = levelChoise),
    setAction: (state, action) => (state.action = action),
    setSudoku: (state, sudoku) => (state.sudoku = sudoku)
  }
});
