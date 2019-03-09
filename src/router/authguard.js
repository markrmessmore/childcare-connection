import store from '@/store/store.js'
export default (to, from, next) => {
  if (store.getters.getUser) {
    next()
  }
  else {
    store.dispatch('activateSignIn', true)
    next('/')
  }
}
