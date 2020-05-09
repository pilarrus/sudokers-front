import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    level: {}
  },
  mutations: {
    setLevel: (state, levelChoise) => (state.level = levelChoise)
  }
});
