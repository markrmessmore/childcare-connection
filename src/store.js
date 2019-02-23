import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    nav     : [
      {
        item: "Dashboard",
        link: "/dashboard",
        icon: ""
      },
      {
        item: "New Case",
        link: "/new",
        icon: ""
      },
      {
        item: "Search Case",
        link: "/search",
        icon: ""
      },
      {
        item: "About",
        link: "/about",
        icon: ""
      },
      {
        item: "Admin",
        link: "/admin",
        icon: ""
      }
    ]
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
    },
    getNav(state){
      return state.nav
    }
  }
});
