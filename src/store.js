import Vue  from  "vue";
import Vuex from  "vuex";
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import example from './exampleCase.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cases: example,
    loading: false,
    nav     : [
      {
        item: "Dashboard",
        link: "/dashboard",
        icon: "dashboard",
        access: "user",
        color: "primary darken-1",
        dark: true
      },
      {
        item: "New Case",
        link: "/new",
        icon: "add_circle",
        access: "user",
        color: "secondary lighten-1",
        dark: true
      },
      {
        item: "Search Case",
        link: "/search",
        icon: "search",
        access: "user",
        color: "accent1",
        dark: false
      },
      {
        item: "Run Reports",
        link: "/reports",
        icon: "insert_drive_file",
        access: "user",
        color: "secondary lighten-3",
        dark: true
      },
      {
        item: "About",
        link: "/about",
        icon: "info",
        access: "all",
        color: "accent2",
        dark: true
      },
      {
        item: "Admin",
        link: "/admin",
        icon: "person_outline",
        access: "admin",
        color: "info",
        dark: false
      }
    ],
    signInStatus: false,
    signOutStatus: false,
    user    : "admin",
  },
  mutations: {
    // LOGIN/LOGOUT MUTATIONS
    activateSignIn(state, payload){
      state.signInStatus = payload
    },
    activateSignOut(state, payload){
      state.signOutStatus = payload
    },
    setUser(state, payload) {
      state.user = payload;
    },
    signOut (state) {
      state.user = null
    },
    setCases(state) {
      console.log(example)
      state.cases.push(example)
    }
  },
  actions: {
    // LOGIN/LOGOUT ACTIONS
    activateSignIn({commit}, payload){
      commit('activateSignIn', payload)
    },
    activateSignOut({commit}, payload){
      commit('activateSignOut', payload)
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    signIn ({commit}, payload) {
      console.log(payload)
      // commit('setLoading', true)
      // firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      // .then(
      //   user => {
      //     console.log(user)
      //     commit('setLoading', false)
      //     const newUser = {
      //       id: user.uid
      //     }
      //     commit('setUser', newUser);
      //   }
      // )
      // .catch(
      //   error => {
      //     console.log(error.message)
      //   }
      // )
    },
    signOut ({commit}) {
      commit('signOut')
      firebase.auth().signOut()
    },
    //GET CASES
    getCases({commit}) {
      commit('setCases')
    },
    saveCase({commit}, payload){
      console.log(payload)
      // commit('saveCase', payload)
    }
  },
  getters: {
    getCases(state){
      return state.cases
    },
    getLoading(state){
      return state.loading
    },
    getNav(state) {
      if (state.user == ""){
        return state.nav.filter(navItem => navItem.access == "all")
      }
      else if (state.user == "admin") {
        return state.nav
      }
      else {
        return state.nav.filter(navItem => navItem.access == "user" || navItem.access == "all")
      }
    },
    getSignInStatus(state){
      return state.signInStatus
    },
    getSignOutStatus(state){
      return state.signOutStatus
    },
    getUser(state) {
      return state.user;
    }
  }
});

// TO DO:
// * Authenticate with firebase
// * Retrieve case info from firebase
// * Add/Update info from firebase
// * Get Users
// * Add/edit/update/delete users
