<template>
  <v-toolbar color="secondary" dense flat dark>
    <v-btn small round outline @click="download()">
      <v-icon left small>fas fa-file-download</v-icon>
        Download Report
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn small icon outline @click="closeReport()">
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
