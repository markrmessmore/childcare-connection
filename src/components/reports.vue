<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>view_carousel</v-icon>
        Reports
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <!-- BUTTON LIST GENERATED FROM REPORTLIST BELOW -->
      <v-layout row wrap align-center>
        <v-tooltip top v-for="report in reportList" :key="report.btnText">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outline round small @click="generateReport(report.shortCode)" v-on="on">
              <v-icon left small>{{report.icon}}</v-icon>
              {{report.btnText}}
            </v-btn>
          </template>
          <span>{{report.tooltip}}</span>
        </v-tooltip>
      </v-layout>
      <br>
      <v-card v-if="reportSelected" flat>
        <download @close="closeReport()" @download="downloadReport()"></download>
        <v-card-text>
          <v-toolbar color="info" dense flat>
            <v-toolbar-title>
              <v-icon left>{{getTitle[0].icon}}</v-icon>
              {{getTitle[0].btnText}}
            </v-toolbar-title>
          </v-toolbar>
          <br>
          <!-- IMPORTED REPORTS BASED ON WHAT WAS SELECTED ABOVE -->
          <current v-if="reportType == 'current'" id="current" :allCases="getCases"></current>
          <attendance v-if="reportType == 'attendance'" id="attendance" :allCases="getCases"></attendance>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import attendance from '@/components/sub-components/reports/attendanceVoucher.vue'
import current    from '@/components/sub-components/reports/current.vue'
import download   from '@/components/sub-components/reports/downloadBar.vue'
import html2pdf   from 'html2pdf.js'
import moment     from 'moment'
export default {
  components: {
    attendance, current, download
  },
  data(){
    return{
      reportList: [
        {
          btnText   : "Current Cases",
          icon      : "fas fa-list",
          shortCode : "current",
          tooltip   : "A list of all cases NOT marked 'inactive' or 'ineligible'."
        },
        {
          btnText   : "Attendance Vouchers",
          icon      : "fas fa-calendar",
          shortCode : "attendance",
          tooltip   : "Generates an example, all active cases are then generated upon download."
        }
      ],
      reportSelected: false,
      reportType    : ""
    }
  },
  methods: {
    closeReport(){
      this.reportSelected = false
    },
    downloadReport(){
      let toPrint
      let opt = {
        margin:       .5,
        filename:     this.getFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    {mode: 'legacy'}
      }
      toPrint = document.getElementById(this.reportType)
      html2pdf().set(opt).from(toPrint).save();
    },
    generateReport(type){
      this.reportType     = type
      this.reportSelected = true
    }
  },
  computed: {
    getCases(){
      return this.$store.getters.getCases
    },
    getFileName(){
      return `${this.getTitle[0].btnText}_${moment().format('MM/DD/YYYY')}`
    },
    getTitle(){
      return this.reportList.filter(rep => {
        return rep.shortCode == this.reportType
      })
    }
  }
}
</script>

<style lang="css">
</style>
