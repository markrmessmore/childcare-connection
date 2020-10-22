<template>
  <v-toolbar color="secondary" dense text dark>
    <v-btn small rounded outlined @click="download()">
      <v-icon left small>fas fa-file-download</v-icon>
        Download Report
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn small icon outlined @click="closeReport()">
      <v-icon>fas fa-times</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    closeReport(){
      this.$emit('close')
    },
    download(){
      this.$emit('download')
    }
  }
}
</script>
