import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import router from "./router";

// IMPORTS FOR FIREBASE
// import {config} from "./firebase.js"
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
// Vue.use(firebase)

// DIFFERENT LAYOUT VIEWS
import defaultLayout from '@/layouts/defaultLayout.vue'
import reportLayout from '@/layouts/reportLayout.vue'
Vue.component('defaultLayout', defaultLayout)
Vue.component('reportLayout', reportLayout)

//LOADING DIALOG SHARED THROUGHOUT
import loading from '@/components/sub-components/loading.vue'
Vue.component('loading', loading)

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    // firebase.initializeApp(config)
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
  }
}).$mount("#app");
