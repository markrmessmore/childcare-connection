import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    setLoginState(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    setLoginState({ commit }, payload) {
      commit("setLoginState", payload);
    }
  },
  getters: {
    getLoginState(state) {
      return state.loggedIn;
    }
  }
});
