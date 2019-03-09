export default {
  activateSignIn(state, payload){
    state.signInStatus = payload
  },
  activateSignOut(state, payload){
    state.signOutStatus = payload
  },
  addUser(state, payload){
    state.allUsers.push(payload)
  },
  changeUserRole(state, payload){
    let user = state.allUsers.find(usr => {
      return usr.email === payload.email
    })
    user.role = payload.role
  },
  deleteUser(state, payload){
    let user = state.allUsers.find(usr => {
      return usr.email === payload.email
    })
    state.allUsers.splice(state.allUsers.indexOf(user), 1)
  },
  setAllUsers(state, payload){
    state.allUsers = payload
  },
  setCases(state, payload) {
    state.cases.push(payload)
  },
  setLoading(state, payload){
    state.loading = payload
  },
  setToast(state, payload){
    state.toast.status  = payload.status
    state.toast.msg     = payload.msg
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setUserRole(state, payload){
    let allUsers = state.allUsers
    allUsers.forEach(user => {
      if (user.email === payload.usr) {
        state.userRole = user.role
      }
    })
  },
  signOut (state) {
    state.user = null
    state.userRole = null
  }
}
