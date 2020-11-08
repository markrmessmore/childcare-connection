import Vue from "vue";
import Vuetify from "./plugins/vuetify";
import App from "./App.vue";
import store from "@/store/store.js";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import router from "@/router/router.js";

//INPUT MASK FOR NON-VUETIFY INPUTS
import maskedInput from 'vue-masked-input'
Vue.component('maskedInput', maskedInput)

// TO MOVE AWAY FROM VUE-MASKED-INPUT
import VueMask from 'v-mask'
Vue.use(VueMask);

// IMPORTS FOR FIREBASE
import {config} from "./firebase.js"
import firebase from 'firebase/app'
Vue.use(firebase)

// DIFFERENT LAYOUT VIEWS
import defaultLayout from '@/layouts/defaultLayout.vue'
import reportLayout from '@/layouts/reportLayout.vue'
import vuetify from './plugins/vuetify';
Vue.component('defaultLayout', defaultLayout)
Vue.component('reportLayout', reportLayout)

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  Vuetify,
  render: h => h(App),
  vuetify,

  created () {
    firebase.initializeApp(config)
    this.$store.dispatch('getUsersAndRoles')
  }
}).$mount("#app");
