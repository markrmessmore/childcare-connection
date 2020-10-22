<template lang="html">
  <div class="">
    <v-toolbar dense color="primary" dark>
      <img src="@/assets/ccc-logo.png" height="42px" width="auto" style="cursor: pointer" @click="goHome()"></img>
      <v-toolbar-title style="cursor: pointer" @click="goHome()">
        Mercer Co. Subsidy Mgt. System
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- CHANGE BUTTON BASED ON WHETHER A USER IS LOGGED IN OR OUT -->
      <v-btn v-if="getUser == null" small color="white" outlined @click="activateSignIn" rounded>
        <v-icon left small>fas fa-chevron-right</v-icon>
        Sign In
      </v-btn>
      <v-btn v-else small color="white" outlined @click="activateSignOut" rounded>
        <v-icon left>fas fa-chevron-left</v-icon>
        Sign Out
      </v-btn>
    </v-toolbar>
    <v-toolbar text dense>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text color="" v-for="item in getNav" :key="item.item" :to="item.link">
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
    goHome(){
      this.$router.push('/')
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
