<template>
  <v-container class="elevation-1" fluid>
    <v-toolbar color="secondary" dark flat dense text>
      <v-toolbar-title>
        <v-icon left>fas fa-home</v-icon>
        Welcome
      </v-toolbar-title>
    </v-toolbar>
    <!-- DEFAULT LANGUAGE IF USER IS NOT LOGGED IN. -->
    <v-row align-center class="text-center text-h5" v-if="!getUser">
      <v-col cols="12" sm="8" offset-sm="2">
          <p>Please sign in to access the Mercer County Subsidy Management System.</p>
          <p>Unauthorized access to this database is prohibited!</p>
      </v-col>
      <v-col xs="12" sm="6">
        <v-img :src="require('@/assets/ccc-logo-original.jpg')" height="150px" width="auto" contain></v-img>
      </v-col>
      <v-col xs="12" sm="6">
        <v-img :src="require('@/assets/mercerColor.png')" height="150px" width="auto" contain></v-img>
      </v-col>
      <br>
    </v-row>
    <v-row align-center v-else>
      <v-col cols="12" sm="8" offset-sm="2" class="text-center title">
        Welcome {{getUser.email}}!
      </v-col>
      <v-col cols="12" sm="8" offset-sm="2" class="text-center subtitle-1">
        Last Sign In: {{getUser.lastSignIn}}
      </v-col>
    </v-row>
    <v-row class="secondary ml-1 mr-1 mt-2" v-if="!getUser">
      <v-col xs="12" class="text-center text-md-right">
        <v-btn outlined small color="white" rounded to="/apply" class="subtitle-1">
          <v-icon left dark>fas fa-pen</v-icon>
          Apply Online
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    getUser(){
      return this.$store.getters.getUser
    },
    getUsersAndRoles(){
      return this.$store.getters.getUsersAndRoles
    }
  }
};
</script>
