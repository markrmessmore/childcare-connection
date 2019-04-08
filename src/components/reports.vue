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
          <v-layout row wrap v-if="reportType == 'attendance'">
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs5>
                  <v-layout row wrap class="secondary white--text pl-1">
                    Begin Date:
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs3>
                      <v-autocomplete
                        :items="months"
                        v-model="startDate.month"
                        label="Month"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      <v-autocomplete
                        :items="getDays"
                        v-model="startDate.day"
                        label="Day"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs3 offset-xs1>
                      <v-autocomplete
                        :items="years"
                        v-model="startDate.year"
                        label="Year"
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6 offset-xs1>
                  <v-layout row wrap class="secondary white--text pl-1">
                    End Date:
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs3>
                      <v-autocomplete
                        :items="months"
                        v-model="endDate.month"
                        label="Month"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      <v-autocomplete
                        :items="getDays"
                        v-model="endDate.day"
                        label="Day"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs3 offset-xs1>
                      <v-autocomplete
                        :items="years"
                        v-model="endDate.year"
                        label="Year"
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <current v-if="reportType == 'current'" id="current" :allCases="getCases"></current>
          <attendance v-if="reportType == 'attendance' && switchDate('start').length == 10 && switchDate('end').length == 10" :endDate="switchDate('end')" :startDate="switchDate('start')" id="attendance" :allCases="getCases"></attendance>
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
      endDate: {
        month: "",
        day: "",
        year: ""
      },
      months: ['01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun', '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'],
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
      reportType    : "",
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
    },
    switchDate(type){
      if (type == 'start'){
        return `${this.startDate.year}-${this.startDate.month.slice(0,2)}-${this.startDate.day}`
      }
      if (type == 'end') {
        return `${this.endDate.year}-${this.endDate.month.slice(0,2)}-${this.endDate.day}`
      }
    }
  },
  computed: {
    getCases(){
      return this.$store.getters.getCases
    },
    getDays(){
      let month = this.startDate.month
      if (month.startsWith('02')) {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
      }
      else if (month.startsWith('04') || month.startsWith('06') || month.startsWith('09') || month.startsWith('11')){
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
      }
      else {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
      }
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
