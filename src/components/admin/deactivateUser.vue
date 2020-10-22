<template lang="html">
  <v-card text>
    <v-toolbar color="primary" dense dark text>
      <v-toolbar-title>
        <v-icon>fas fa-user-plus</v-icon>
        Confirm user deactivation:
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" outline icon small @click="close()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text class="subheading">
      <p>
        Are you sure you want to deactivate user:
        <br>
        <b>{{userData.email.toUpperCase()}}</b>
      </p>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" @click="deactivateUser()" rounded outlined>
         <v-icon left>fas fa-check-circle</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="close()" rounded outlined>
          <v-icon left>fas fa-times</v-icon>
          No
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    userData: Object
  },
  data(){
    return{}
  },
  methods: {
    close(){
      this.$emit('close')
    },
    deactivateUser(){
      let userToDeactivate = {
        uid: this.userData.uid,
        email: this.userData.email,
        role: "inactive"
      }
      this.$store.dispatch('changeUserRole', userToDeactivate)
      this.close()
    }
  }
}
</script>

<style lang="css">
</style>
