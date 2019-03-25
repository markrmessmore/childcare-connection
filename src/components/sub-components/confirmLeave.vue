<template lang="html">
  <v-card>
    <v-toolbar dense color="secondary" dark>
      <v-icon>fas fa-exclamation-triangle</v-icon>
      <v-toolbar-title>
        Just checking...
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="subheading">
      <v-layout row wrap>
        <v-flex xs12 class="subheading">
          Leaving this page without clicking the 'save' button may result in much weeping and gnashing of teeth.
          <br>
          <br>
          Are you sure you want to leave?
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" outline @click="leave()" round outline>
          <v-icon left>check</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="cancel()" round outline>
          <v-icon left>close</v-icon>
          No!
        </v-btn>
      </v-layout>
    </v-card-text>
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
