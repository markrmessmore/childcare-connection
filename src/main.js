import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import router from "./router";
import {config} from "./firebase.js"
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(firebase)
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount("#app");
