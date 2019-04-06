<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>view_carousel</v-icon>
        Reports
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap align-center justify-space-around>
        <v-btn color="primary" outline round @click="generateReport('quick')">text</v-btn>
      </v-layout>
      <br>
      <v-card v-if="reportSelected" flat>
        <quick>
          <template v-slot:download>
            <download @close="closeReport()" @download="downloadReport()"></download>
          </template>
        </quick>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import download from '@/components/sub-components/reports/downloadBar.vue'
import quick from '@/components/sub-components/reports/quick.vue'
export default {
  components: {
    download, quick
  },
  data(){
    return{
      reportSelected: false,
    }
  },
  methods: {
    closeReport(){
      this.reportSelected = false
    },
    downloadReport(){
      console.log('download')
    },
    generateReport(type){
      this.reportSelected = true
    }
  },
  computed: {

  }
}
</script>

<style lang="css">
</style>

<!--
* Create report list
* Add ability to select a report to run
* Add ability to set a date range for a report.
* Add functionality to send pre-set report to PDF including specified options.
-->
