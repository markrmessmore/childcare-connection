<template lang="html">
  <v-card flat>
    <v-toolbar color="primary" dense dark flat>
      <v-icon>fas fa-undo</v-icon>
      <v-toolbar-title>
        Confirm reset password
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
        Are you sure you want to reset the password for
        <br>
        <b>{{user.email}}?</b>
      </p>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" outline @click="resetPassword()" round outline>
         <v-icon left>fas fa-check-circle</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="close()" round outline>
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
    user: Object
  },
  data(){
    return{

    }
  },
  methods: {
    close(){
      this.$emit('close')
    },
    resetPassword(){
      this.$store.dispatch('resetPassword', this.user.email)
      this.$emit('close')
    }
  }
}
</script>

<style lang="css">
</style>
