import router from '@/router/router.js'

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
    Object.entries(state.allUsers).forEach(usr => {
      if (usr[1].email === payload.email){
        usr[1].role = payload.role
      }
    })
  },
  newCase(state, payload){
    state.cases.push(payload)
  },
  setAllUsers(state, payload){
    state.allUsers = payload
  },
  setCases(state, payload) {
    // state.cases.push(payload)
    console.log(payload)
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
    let allUsers = Object.values(state.allUsers)
    allUsers.forEach(user => {
      if (user.email === payload.usr) {
        state.userRole = user.role
        if (state.userRole == "inactive"){
          router.push('/accountDeactivated')
        }
      }
    })
  },
  signOut (state) {
    state.user = null
    state.userRole = null
  }
}
