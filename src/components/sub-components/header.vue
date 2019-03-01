<template lang="html">
  <div class="">
    <v-toolbar dense color="primary" dark>
      <img src="@/assets/ccc-logo.png" height="42px" width="auto"></img>
      <v-toolbar-title>
        Mercer Co. Subsidy Mgt. System
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- CHANGE BUTTON BASED ON WHETHER A USER IS LOGGED IN OR OUT -->
      <v-btn v-if="getUser == null" small color="white" outline @click="activateSignIn">
        <v-icon left small>navigate_next</v-icon>
        Sign In
      </v-btn>
      <v-btn v-else small color="white" outline @click="activateSignOut">
        <v-icon left>navigate_before</v-icon>
        Sign Out
      </v-btn>
    </v-toolbar>
    <v-toolbar flat dense color="primary lighten-1">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat color="white" v-for="item in checkUser()" :key="item.item" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.item}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- DIALOG/MODAL TO LOG IN -->
    <v-dialog
      v-model="getSignInStatus"
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <login></login>
    </v-dialog>
    <!-- DIALOG/MODAL TO CONFIRM LOG OUT -->
    <v-dialog
      v-model="getSignOutStatus"
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <logout></logout>
    </v-dialog>
  </div>
</template>

<script>
import login from '@/components/sub-components/login.vue'
import logout from '@/components/sub-components/logout.vue'
export default {
  components: {
    login, logout
  },
  methods: {
    activateSignIn(){
      this.$store.dispatch('activateSignIn', true)
    },
    activateSignOut(){
      this.$store.dispatch('activateSignOut', true)
    },
    checkUser(){
      let user  = this.getUser
      let nav   = this.getNav
      let navList = []
      if (user == null){
        nav.forEach(navItem => {
          if (navItem.access == "all") {
            navList.push(navItem)
          }
        })
      }
      else if (user == "admin") {
        navList = nav
      }
      else {
        nav.forEach(navItem => {
          if (navItem.access == "all" || navItem.access == "user"){
            navList.push(navItem)
          }
        })
      }
      return navList
    }
  },
  computed: {
    getNav(){
      return this.$store.getters.getNav
    },
    getUser(){
      return this.$store.getters.getUser
    },
    getSignInStatus(){
      return this.$store.getters.getSignInStatus
    },
    getSignOutStatus(){
      return this.$store.getters.getSignOutStatus
    }
  }
};
</script>

<style lang="css"></style>

<!--
* CHANGE BUTTON LANGUAGE AND ACTION BASED ON WHETHER A USER IS SIGNED IN
* ADD APPROPRIATE ICON
-->
