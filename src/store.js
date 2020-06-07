import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    level: {},
    action: {},
    sudoku: {},
    isOver: false,
    result: {}
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setLevel: (state, level) => (state.level = level),
    setAction: (state, action) => (state.action = action),
    setSudoku: (state, sudoku) => (state.sudoku = sudoku),
    setIsOver: (state, isOver) => (state.isOver = isOver),
    setResult: (state, result) => (state.result = result)
  }
});
