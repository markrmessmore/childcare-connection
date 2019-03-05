<template lang="html">
  <v-card>
    <v-toolbar color="secondary" dark dense>
      <v-toolbar-title>Just a reminder...</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="subheading">
      Leaving this page without clicking the 'save' button may result in much weeping and gnashing of teeth.
      <br>
      <br>
      Are you sure you want to leave?
    </v-card-text>
      <v-divider></v-divider>
    <v-layout row wrap justify-space-around>
      <v-btn color="primary" outline @click="leave()">
        <v-icon left>check</v-icon>
        Yes
      </v-btn>
      <v-btn color="red darken-4" dark @click="cancel()">
        <v-icon left>close</v-icon>
        No!
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  methods: {
    leave(){
      this.$emit('leave')
    },
    cancel(){
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="css">
</style>
