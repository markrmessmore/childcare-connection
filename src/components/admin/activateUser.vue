<template lang="html">
  <v-card flat>
    <v-toolbar color="primary" dense dark flat>
      <v-icon>fas fa-user-plus</v-icon>
      <v-toolbar-title>
        Confirm user activation:
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
        Are you sure you want to activate user:
        <br>
        <b>{{userData.email.toUpperCase()}}</b>
      </p>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" outline @click="activateUser()" outline round>
         <v-icon left>fas fa-check-circle</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="close()" outline round>
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
    activateUser(){
      let userToActivate = {
        uid: this.userData.uid,
        email: this.userData.email,
        role: "user"
      }
      this.$store.dispatch('changeUserRole', userToActivate)
      this.close()
    }
  }
}
</script>

<style lang="css">
</style>
