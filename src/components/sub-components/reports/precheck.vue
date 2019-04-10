<template lang="html">
  <v-card flat>
    <v-toolbar color="grey lighten-3" dense>
      <!-- <v-toolbar-title> -->
        Pre-Check Report: {{fixDate(startDate)}} -- {{fixDate(endDate)}}
      <!-- </v-toolbar-title> -->
    </v-toolbar>
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    endDate   : String,
    startDate : String
  },
  data(){
    return {

    }
  },
  methods: {
    fixDate(str){
      let date = str.split('-')
      return `${date[1]}/${date[2]}/${date[0]}`
    }
  }
}
</script>

<style lang="css" scoped>
</style>
