import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
  changeUserRole({commit, dispatch}, payload){
    let userRecords = firebase.firestore().collection('users')
    userRecords.get().then(res => {
      res.docs.forEach(doc => {
        if (doc.data().email == payload.email){
          userRecords.doc(doc.id).set({
            email : payload.email,
            role  : payload.role,
            uid   : payload.uid
          })
          commit('changeUserRole', payload)
          dispatch('setToast',{
            status: true,
            msg   : `User ${payload.email} has been given the role of ${payload.role}`
          })
        }
      })
    })
    .catch(err => {
      let toastMsg = {
        status: true,
        msg   : err.message
      }
      dispatch('setToast', toastMsg)
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
      // DUPLICATE THIS RECORD IN MY USERS COLLECTION (NECESSARY TO EDIT/REMOVE LATER)
      firebase.firestore().collection('users').doc().set(usr)
      .then(() => {
        // ADD USER TO THE STORE
        commit('addUser', usr)
        dispatch('resetPassword', payload.email)
      })
    })
    .catch(err => {
      console.log(err)
      let toastMsg = {
        status: true,
        msg   : err.message
      }
      dispatch('setToast', toastMsg)
    })
  },
  deleteUser({commit, dispatch}, payload){
    let selectedUser = firebase.auth().user(payload.uid)
    console.log(selectedUser)
    let userRecords = firebase.firestore().collection('users')
    userRecords.get().then(res => {
      res.docs.forEach(doc => {
        if (doc.data().email == payload.email){
          userRecords.doc(doc.id).delete()
          .then(res => {
            commit('deleteUser', payload)
            dispatch('setToast',{
              status: true,
              msg   : `User ${payload.email} has been deleted.`
            })
          })
        }
      })
    })
    .catch(err => {
      let toastMsg = {
        status: true,
        msg   : err.message
      }
      dispatch('setToast', toastMsg)
    })
  },
  getCases({commit}) {
    commit('setCases')
  },
  getUsersAndRoles({commit}){
    let userList = []
    firebase.firestore().collection('users').get()
    .then(allUsers => {
      allUsers.forEach(usr => {
        userList.push(usr.data())
      })
    })
    commit('setAllUsers', userList)
  },
  resetPassword({commit}, payload){
    firebase.auth().sendPasswordResetEmail(payload)
    .then(() => {
      let toastMsg = {
        status: true,
        msg   : `An email has been sent to ${payload} regarding this account.`
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
        console.log(error.message)
      }
    )
  },
  signOut ({commit}) {
    firebase.auth().signOut()
    commit('signOut')
    commit('activateSignOut', false)
  },
  saveCase({commit}, payload){
    console.log(payload)
    // commit('saveCase', payload)
  }
}
