import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "@/store/store.js";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import router from "@/router/router.js";

// IMPORTS FOR FIREBASE
import {config} from "./firebase.js"
import firebase from 'firebase/app'
Vue.use(firebase)

// DIFFERENT LAYOUT VIEWS
import defaultLayout from '@/layouts/defaultLayout.vue'
import reportLayout from '@/layouts/reportLayout.vue'
Vue.component('defaultLayout', defaultLayout)
Vue.component('reportLayout', reportLayout)

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
    this.$store.dispatch('getUsersAndRoles')
  }
}).$mount("#app");
