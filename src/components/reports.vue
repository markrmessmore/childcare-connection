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
            <v-btn color="primary" :disabled="report.disabled" outline round @click="generateReport(report.shortCode)" v-on="on">
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
          <dateSelect
            v-if="reportType == 'attendance' || reportType == 'precheck'"
            @reportStart="setDateStart"
            @reportEnd="setDateEnd"
            :resetCode="resetCode"
            >
            <template v-slot:alert>
              <i v-if="reportType == 'attendance'">
                NOTE: The dates set here are <b>ONLY</b> for generating the report's calendar and <b>DO NOT</b> filter based on elibitility dates.
              </i>
              <i v-if="reportType == 'precheck'">
                Dates given will filter all attendance records and group by provider.
              </i>
            </template>
          </dateSelect>
          <attendance
            v-if="reportType == 'attendance' && switchDate('start').length == 10 && switchDate('end').length == 10"
            :endDate="switchDate('end')"
            :startDate="switchDate('start')"
            id="attendance"
            :allCases="getCases">
          </attendance>
          <countyReport v-if="reportType == 'county'" id="county" ></countyReport>
          <current v-if="reportType == 'current'" id="current" :allCases="getCases">
            <template v-slot:alert>
              <i>
                A quick run-down of all cases currently in the program (i.e. not inactive).
              </i>
            </template>
          </current>
          <precheck
            v-if="reportType == 'precheck' && switchDate('start').length == 10 && switchDate('end').length == 10"
            :endDate="switchDate('end')"
            :startDate="switchDate('start')"
            id="precheck"
            :allCases="getCases"
          ></precheck>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions }  from '@/assets/sharedFunctions.js'
import attendance           from '@/components/sub-components/reports/attendanceVoucher.vue'
import countyReport         from '@/components/sub-components/reports/countyReport.vue'
import current              from '@/components/sub-components/reports/current.vue'
import dateSelect           from '@/components/sub-components/dateSelect.vue'
import download             from '@/components/sub-components/reports/downloadBar.vue'
import html2pdf             from 'html2pdf.js'
import moment               from 'moment'
import precheck             from '@/components/sub-components/reports/precheck.vue'
export default {
  mixins: [sharedFunctions],
  components: {
    attendance, countyReport, current, dateSelect, download, precheck
  },
  data(){
    return{
      endDate: {
        month: "",
        day: "",
        year: ""
      },
      months: ['01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun', '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'],
      reportList: [
        {
          btnText   : "Attendance Vouchers",
          icon      : "fas fa-calendar",
          shortCode : "attendance",
          tooltip   : "Generates an example, all active cases are then generated upon download.",
          disabled  : false
        },
        {
          btnText   : "Current Cases",
          icon      : "fas fa-list",
          shortCode : "current",
          tooltip   : "A list of all cases NOT marked 'inactive' or 'ineligible'.",
          disabled  : false
        },
        {
          btnText   : "Mercer County Report",
          icon      : "far fa-calendar-alt",
          shortCode : "county",
          tooltip   : "A report submitted to Mercer County delineating totals for the program..",
          disabled  : true
        },
        {
          btnText   : "Pre-Check",
          icon      : "fas fa-money-check",
          shortCode : "precheck",
          tooltip   : "Generates a report of accounts to be paid based on attendance.",
          disabled  : false
        }
      ],
      reportSelected: false,
      reportType    : "",
      resetCode: "",
      startDate: {
        month: "",
        day: "",
        year: ""
      },
      years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    }
  },
  methods: {
    closeReport(){
      this.reportType     = ""
      this.reportSelected = false
    },
    downloadReport(){
      this.$store.dispatch('setLoading', true)
      let repOrientation = this.reportType == 'county' ? 'landscape' : 'portrait'
      let toPrint
      let opt = {
        margin:       .5,
        filename:     this.getFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: repOrientation },
        pagebreak:    {mode: 'legacy'}
      }
      toPrint = document.getElementById(this.reportType)
      html2pdf().set(opt).from(toPrint).save();
      this.$store.dispatch('setLoading', false)
    },
    generateReport(type){
      this.$store.dispatch('setLoading', true)
      this.resetCode      = Math.random().toString()
      this.reportType     = type
      this.reportSelected = true
      this.$store.dispatch('setLoading', false)
    },
    setDateEnd(dateObj){
      this.endDate = dateObj
      this.switchDate('end')
    },
    setDateStart(dateObj){
      this.startDate = dateObj
      this.switchDate('start')
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
