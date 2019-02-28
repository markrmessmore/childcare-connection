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
    ],
    signInStatus: false,
    signOutStatus: false,
    user    : "Mark",
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
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getNav(state) {
      return state.nav;
    },
    getCases(state){
      return state.cases
    },
    getSignInStatus(state){
      return state.signInStatus
    },
    getSignOutStatus(state){
      return state.signOutStatus
    }
  }
});

// TO DO:
// * Authenticate with firebase
// * Retrieve case info from firebase
// * Add/Update info from firebase
// * Get Users
// * Add/edit/update/delete users
