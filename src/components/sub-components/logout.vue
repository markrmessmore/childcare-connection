<template lang="html">
  <v-container class="white">
    <v-toolbar color="secondary" dark dense flat>
      <v-toolbar-title>
       <v-icon left>fas fa-question-circle</v-icon>
        Are you sure you want to sign out?
      </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="6" class="text-center">
        <v-btn color="red darken-4" dark @click="deactivateSignOut()" rounded outlined>
          <v-icon left>fas fa-times</v-icon>
          Cancel
        </v-btn>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-btn color="secondary" @click="signOut()" rounded outlined>
          <v-icon left>fas fa-check</v-icon>
          Sign out
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      usr : "",
      pass: "",
      showPass: false
    }
  },
  methods: {
    signOut(){
      this.$store.dispatch('signOut')
    },
    deactivateSignOut(){
      this.$store.dispatch('activateSignOut', false)
    }
  }
}
</script>

<style lang="css">
</style>
