export default {
  getBlankCase(state){
    return state.blankCase
  },
  getCareType(state){
    return state.careType
  },
  getCases(state){
    return state.cases
  },
  getChildStatus(state){
    return state.childStatus
  },
  getDbVariables(state){
    return state.dbVariables
  },
  getCareTypes(state){
    return state.careTypes
  },
  getIncomeFrequency(state){
    return state.incomeFrequency
  },
  getIncomeType(state){
    return state.incomeType
  },
  getLocationItems(state){
    return state.locationItems
  },
  getLocationStatus(state){
    return state.locationStatus
  },
  getLoading(state){
    return state.loading
  },
  getNav(state) {
    if (state.userRole === null || state.userRole === "inactive"){
      return state.nav.filter(navItem => navItem.access === "all")
    }
    else if (state.userRole === 'user') {
      return state.nav.filter(navItem => navItem.access === "user" || navItem.access === "all")
    }
    else {
      return state.nav
    }
  },
  getPhoneTypes(state){
    return state.phoneTypes
  },
  getProviders(state){
    return state.providers
  },
  getRelationships(state){
    return state.relationshipItems
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
    return Object.values(state.allUsers)
  }
}
