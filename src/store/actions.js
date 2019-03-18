import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import {config} from '@/firebase.js'
// const users = firebase.database().ref('Users')

export default {
  activateSignIn({commit}, payload){
    commit('activateSignIn', payload)
  },
  activateSignOut({commit}, payload){
    commit('activateSignOut', payload)
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', payload.uid)
    commit('setUserRole', payload.email)
  },
  changeUserRole({commit, state}, payload){
    let allUsers = Object.entries(state.allUsers)
    allUsers.forEach(user => {
      if (user[1].email == payload.email){
        firebase.database().ref('Users').child(user[0]).update({
          email : payload.email,
          role  : payload.role,
          uid   : payload.uid
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
            msg   : err.message
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
      firebase.database().ref('Users').push(usr)
      .then(() => {
        firebase.auth().sendPasswordResetEmail(payload.email)
        let toastMsg = {
          status: true,
          msg   : `User ${usr.email} has been added and given the role of ${usr.role}`
        }
        commit('addUser', usr)
        commit('setToast', toastMsg)
      })
      .catch(e => {
        let toastMsg = {
          status: true,
          msg   : e
        }
        commit('setToast', toastMsg)
      })
    })
  },
  deactivateUser({commit}, payload){
    let allUsers = Object.entries(state.allUsers)
    allUsers.forEach(user => {
      if (user[1].email == payload.email){
        firebase.database().ref('Users').child(user[0]).update({
          email : payload.email,
          role  : payload.role,
          uid   : payload.uid
        })
        .then(() =>{
          commit('deactivate', payload)
          commit('setToast',{
            status: true,
            msg   : `User ${payload.email} has been given the role of ${payload.role}`
          })
        })
        .catch(err => {
          let toastMsg = {
            status: true,
            msg   : err.message
          }
          commit('setToast', toastMsg)
        })
      }
    })
  },
  getCases({commit}) {
    commit('setLoading', true)
    firebase.database().ref('Cases').on('value', allCases => {
      commit('setCases', allCases.val())
      commit('setLoading', false)
    })
  },
  getCaseId({commit, dispatch}){
    firebase.database().ref('CaseIds').once('value', id => {
      let firebaseData = {}
      // commit()
    })
  },
  getUsersAndRoles({commit}){
    commit('setLoading', true)
    firebase.database().ref('Users').on('value', allUsers => {
      commit('setAllUsers', allUsers.val())
      commit('setLoading', false)
    })
  },
  newCase({commit, dispatch}, payload){
    // FIRST WE GET OUR NEW CASE ID
    firebase.database().ref('CaseIds').once('value')
    .then(id => {
      let cid = id.val() + 1
      firebase.database().ref('CaseIds').set(cid)
      // WE NOW ATTACH THE NEW CASE ID TO THE CASE OBJECT
      payload.caseId = cid
      firebase.database().ref('Cases').push(payload)
      .then(res => {
        let toastMsg = {
          status: true,
          msg   : `This case has been saved and given the number ${cid}.`
        }
        let newKey = `${res.key}`
        let firebaseData = { [newKey] : payload}
        commit('newCase', firebaseData)
        commit('setToast', toastMsg)
      })
      .catch(err => {
        let toastMsg = {
          status: true,
          msg   : err.message
        }
        commit('setToast', toastMsg)
      })
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
    commit('setUserRole', payload)
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.usr, payload.pass)
    .then(
      user => {
        commit('setLoading', false)
        commit('activateSignIn', false)
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      }
    )
    .catch(
      error => {
        let toastMsg = {
          status: true,
          msg   : err.msg
        }
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
    let allCases    = Object.entries(state.cases)
    let firebaseId  = ""
    allCases.forEach(c => {
      if (c[1].caseId === payload.caseId){
        firebaseId = c[0]
      }
    })
    firebase.database().ref('Cases').child(firebaseId).set(payload)
    .then(res => {
      let toastMsg = {
        status: true,
        msg   : `Case ${payload.caseId} has been saved.`
      }
      commit('setToast', toastMsg)
      commit('saveCase', payload)
      commit('setLoading', false)
    })
    .catch(() => {
      let toastMsg = {
        status: true,
        msg   : err.message
      }
      commit('setToast', toastMsg)
      commit('setLoading', false)
    })
  }
}
