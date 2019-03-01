<template lang="html">
  <v-dialog
    v-model="getLoading"
    persistent :overlay="false"
    max-width="400px"
    transition="dialog-transition"
  >
    <v-card height="100px" width="400px" >
      <v-card-text>
        <v-layout row wrap align-center justify-center>
          <v-progress-linear indeterminate color="secondary"></v-progress-linear>
          <br>
          <span class="headline">Loading...</span>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    getLoading(){
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style lang="css">
</style>
