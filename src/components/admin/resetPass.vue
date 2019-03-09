<template lang="html">
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>
        <v-icon>settings_backup_restore</v-icon>
        Confirm reset password
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" outline icon small @click="close()">
          <v-icon>close</v-icon>
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
        <v-btn color="primary" outline @click="resetPassword()">
          <v-icon left>check_circle</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="close()">
          <v-icon left>close</v-icon>
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
