export default {
  getCases(state){
    return state.cases
  },
  getLoading(state){
    return state.loading
  },
  getNav(state) {
    if (state.userRole === null){
      return state.nav.filter(navItem => navItem.access === "all")
    }
    else if (state.userRole === 'user') {
      return state.nav.filter(navItem => navItem.access === "user" || navItem.access === "all")
    }
    else {
      return state.nav
    }
  },
  getSignInStatus(state){
    return state.signInStatus
  },
  getSignOutStatus(state){
    return state.signOutStatus
  },
  getToast(state){
    return state.toast
  },
  getUser(state) {
    return state.user;
  },
  getUserRole(state){
    return state.userRole
  },
  getUsersAndRoles(state){
    return state.allUsers
  }
}
