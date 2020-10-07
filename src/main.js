import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "@/store/store.js";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import router from "@/router/router.js";

//INPUT MASK FOR NON-VUETIFY INPUTS
import maskedInput from 'vue-masked-input'
Vue.component('maskedInput', maskedInput)

// IMPORTS FOR FIREBASE
import {config} from "./firebase-dev.js"
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
    this.$store.dispatch('getUsersAndRoles')
  }
}).$mount("#app");
