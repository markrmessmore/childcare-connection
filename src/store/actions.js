import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {config} from '@/firebase.js'

export default {
  activateSignIn({commit}, payload){
    commit('activateSignIn', payload)
  },
  activateSignOut({commit}, payload){
    commit('activateSignOut', payload)
  },
  changeUserRole({commit, state}, payload){
    let allUsers = state.allUsers
    allUsers.forEach(user => {
      if (user.email == payload.email){
        firebase.firestore().collection('Users').doc(user.id).update({
          role  : payload.role,
        })
        .then(() =>{
          commit('changeUserRole', payload)
          commit('setToast',{
            status: true,
            msg   : `User ${payload.email.toUpperCase()} has been given the role of ${payload.role.toUpperCase()}`
          })
        })
        .catch(err => {
          let toastMsg = {
            status: true,
            msg   : err
          }
          commit('setToast', toastMsg)
        })
      }
    })
  },
  createUser({commit, dispatch}, payload){
    // CREATE A RANDOM EMAIL FOR DEFAULT SET UP
    let randPass = Math.random().toString().split(".")
    randPass = randPass[1].slice(0,6)
    // BEGIN BY CREATING THE USER FOR FIREBASE AUTHENTICATION
    firebase.auth().createUserWithEmailAndPassword(payload.email, randPass)
    .then(res => {
      let usr = {
        email : payload.email,
        role  : payload.role,
        uid   : res.user.uid
      }
      // DUPLICATE THIS RECORD IN MY USERS COLLECTION (NECESSARY TO SET ROLES WHICH IS HOW WE DISABLE ACCOUNTS)
      firebase.firestore().collection('Users').add(usr)
      .then(() => {
        firebase.auth().sendPasswordResetEmail(payload.email)
        let toastMsg = {
          status: true,
          msg   : `User ${usr.email} has been added and given the role of ${usr.role}`
        }
        commit('setToast', toastMsg)
      })
    })
    .catch(e => {
      let toastMsg = {
        status: true,
        msg   : e.message
      }
      commit('setToast', toastMsg)
    })
  },
  getCases({commit}) {
    commit('setLoading', true)
    firebase.firestore().collection('Cases').onSnapshot(allCases => {
      let caseArray = []
      allCases.forEach( getData => {
        let currentcase = getData.data()
        currentcase.id = getData.id
        caseArray.push(currentcase)
      })
      commit('setCases', caseArray)
      commit('setLoading', false)
    })
  },
  getUsersAndRoles({commit, dispatch}){
    commit('setLoading', true)
    firebase.firestore().collection('Users').onSnapshot(allUsers => {
      let userData = []
      allUsers.forEach(usr => {
        let currentUser = usr.data()
        currentUser.id = usr.id
        userData.push(currentUser)
      })
      commit('setAllUsers', userData)
      commit('setLoading', false)
    },
      err => {
        let toastMsg = {
          status: true,
          msg   : err
        }
        commit('setToast', toastMsg)
        commit('setLoading', false)
    })
  },
  resetPassword({commit}, payload){
    firebase.auth().sendPasswordResetEmail(payload)
    .then(() => {
      let toastMsg = {
        status: true,
        msg   : `An email has been sent to ${payload} to reset the password.`
      }
      commit('setToast', toastMsg)
    })
  },
  setLoading({commit}, payload){
    commit('setLoading', payload)
  },
  setToast({commit}, payload){
    commit('setToast', payload)
  },
  signIn ({commit, dispatch}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.usr, payload.pass)
    .then(
      user => {
        dispatch('getCases')
        commit('setUserRole', payload)
        commit('setLoading', false)
        commit('activateSignIn', false)
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      }
    )
    .catch(
      err => {
        let toastMsg = {
          status: true,
          msg   : err
        }
        commit('setLoading', false)
        commit('setToast', toastMsg)
      }
    )
  },
  signOut ({commit}) {
    firebase.auth().signOut()
    commit('signOut')
    commit('activateSignOut', false)
  },
  saveCase({commit, state}, payload){
    commit('setLoading', true)
    //IF IT IS A NEW CASE, ASSIGN A CASE ID
    if (payload.caseId == null) {
      firebase.firestore().collection('CaseIds').doc('nums').get()
      .then(number => {
        firebase.firestore().collection('CaseIds').doc('nums').update({
          currentNum: number.data().currentNum + 1
        })
        payload.caseId = (number.data().currentNum + 1)
        firebase.firestore().collection('Cases').add(payload)
        let toastMsg = {
          status: true,
          msg   : `Case ${payload.caseId} has been saved.`
        }
        commit('newCase', payload)
        commit('setToast', toastMsg)
        commit('setLoading', false)
      })
      .catch(err => {
        let toastMsg = {
          status: true,
          msg   : err
        }
        commit('setToast', toastMsg)
        commit('setLoading', false)
      })
    }
    else {
      firebase.firestore().collection('Cases').doc(payload.id).set(payload)
      .then(() => {
        let toastMsg = {
          status: true,
          msg   : `Case ${payload.caseId} has been saved.`
        }
        commit('saveCase', payload)
        commit('setToast', toastMsg)
        commit('setLoading', false)
      })
      .catch(err => {
        let toastMsg = {
          status: true,
          msg   : err
        }
        commit('setToast', toastMsg)
        commit('setLoading', false)
      })
    }
  }
}
