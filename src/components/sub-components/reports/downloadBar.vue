<template>
  <v-toolbar color="info" dense flat>
    <v-btn color="secondary" round outline @click="download()">
      <v-icon left>fas fa-file-download</v-icon>
        Download Report
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="secondary" icon outline @click="closeReport()">
      <v-icon>close</v-icon>
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
