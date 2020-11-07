<template lang="html">
  <v-dialog
    v-model="getLoading"
    persistent :overlay="false"
    height="300px"
    width="400px"
    transition="dialog-transition"
  >
    <v-card color="white" height="300px" width="400px">
      <v-container>
        <v-row class="pa-3">
          <v-col cols="12" class="text-center">
            <v-img :src="require('@/assets/ccc-logo-original.jpg')" height="150px" width="auto" contain></v-img>
          </v-col>
          <v-col cols="12" class="text-center headline">
            <v-icon>fas fa-spinner fa-spin</v-icon>
            <span class="pr-5 pl-5">Loading</span>
            <v-icon>fas fa-spinner fa-spin</v-icon>
          </v-col>
        </v-row>
      </v-container>
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
