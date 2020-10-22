<template lang="html">
  <div>
    <v-card text>
      <v-card-text>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
              Eligibility Notification Letters
          </v-flex>
        </v-layout>
        <v-divider inset></v-divider>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn color="primary" @click="openPrintDialog('letter-accepted')" rounded small outlined>
            <v-icon left small>fas fa-check</v-icon>
            Accepted
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('letter-waiting')" rounded small outlined>
            <v-icon left small>far fa-clock</v-icon>
            Waiting List
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('letter-pending')" rounded small outlined>
            <v-icon left small>far fa-hourglass</v-icon>
            Pending
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('letter-ineligible')" rounded small outlined>
            <v-icon left small>fas fa-ban</v-icon>
            Ineligible
          </v-btn>
        </v-layout>
        <br>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
              PAPA Forms
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn color="primary" @click="openPrintDialog('papa-letter')" rounded small outlined>
            <v-icon left small>fas fa-envelope-open-text</v-icon>
            PAPA Letter
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('papa-form')" rounded small outlined>
            <v-icon left small>fas fa-file-alt</v-icon>
            Pre-PAPA
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('papa-final')" rounded small outlined>
            <v-icon left small>fas fa-file-contract</v-icon>
            Finalized PAPA
          </v-btn>
        </v-layout>
        <br>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
            Other Forms & Reports
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn color="primary" @click="openPrintDialog('attendance')" rounded small outlined>
            <v-icon left small>fas fa-calendar-week</v-icon>
            Attendance Voucher
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('case-report')" rounded small outlined>
            <v-icon left small>fas fa-file-alt</v-icon>
            Full Case Report
          </v-btn>
          <v-btn color="primary" @click="openPrintDialog('termination')" rounded small outlined>
            <v-icon left small>fas fa-times</v-icon>
            Termination Letter
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-container
      transition="dialog-transition"
      v-if="printDialog"
    >
    <!-- SETTINGS FOR FINALAIZED PAPA FORM -->
    <v-card color="info" v-if="printType == 'papa-final'" text>
      <v-toolbar color="secondary" dark dense text>
        <v-toolbar-title>Please select the appropriate child/provider</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            class="pl-1"
            :items="getKids"
            v-model="selectedChild"
            label="Select Child:"
          ></v-select>
        </v-flex>
        <v-flex xs5 offset-xs1>
          <v-select
            class="pr-1"
            :disabled="selectedChild == ''"
            :items="getProviderNames"
            v-model="selectedProvider"
            label="Select Provider:"
          ></v-select>
        </v-flex>
        <v-flex xs12 class="text-xs-right pr-1">
          <v-btn color="secondary" outline small rounded @click="reset()">
            <v-icon left small>fas fa-times</v-icon>
            Reset
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <br>
    <v-card>
      <v-toolbar color="info" dense>
        <v-btn outlined @click="downloadForm()" small rounded>
          <v-icon left>fas fa-cloud-download-alt</v-icon>
          Download Form
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon outlined @click="printDialog = false" small>
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-toolbar>
        <eligibility
          v-if="printType.startsWith('letter')"
          id="letter"
          :printType="printType"
          :caseData="caseInfo"
        ></eligibility>
        <v-card-text v-if="printType == 'attendance'">
          <dateSelect @reportStart="setDateStart" @reportEnd="setDateEnd">
            <template v-slot:alert>
              <i>
                NOTE: The dates set here are <b>ONLY</b> for generating the report's calendar and <b>DO NOT</b> filter based on elibitility dates.
              </i>
            </template>
          </dateSelect>
        </v-card-text>
        <attendance
          v-if="printType == 'attendance' &&
          switchDate('start').length == 10 &&
          switchDate('end').length == 10"
          :endDate="switchDate('end')"
          :startDate="switchDate('start')"
          id="attendance"
          :allCases="getCases">
        </attendance>
        <blankPapa
          v-if="printType == 'papa-form'"
          :caseData="caseInfo"
          id="papa-form"
        ></blankPapa>
        <papa
          v-if="printType == 'papa-final' && selectedChild != '' && selectedProvider != ''"
          :caseData="caseInfo"
          :providerData="getProviderData"
          id="papa-final"
        ></papa>
        <papaLetter
          v-if="printType == 'papa-letter'"
          :caseData="caseInfo"
          id="papa-letter"
        ></papaLetter>
        <termination
          v-if="printType == 'termination'"
          :caseData="caseInfo"
          id="termination"
        ></termination>
        <caseReport
          v-if="printType == 'case-report'"
          :caseInfo="caseInfo"
          id="case-report"
        >
        </caseReport>
        <v-toolbar color="info" dense>
          <v-btn outlined @click="downloadForm()" small rounded>
            <v-icon left>fas fa-cloud-download-alt</v-icon>
            Download Form
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon outlined @click="printDialog = false" small>
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
const   mercerLogo  = require('@/assets/mercerLogo.json')
import  attendance  from '@/components/sub-components/reports/attendanceVoucher.vue'
import  blankPapa   from '@/components/sub-components/letters/blankPapa.vue'
import  caseReport  from '@/components/sub-components/letters/caseReport.vue'
import  dateSelect  from '@/components/sub-components/dateSelect.vue'
import  eligibility from '@/components/sub-components/letters/eligibility.vue'
import  papaLetter  from '@/components/sub-components/letters/papaLetter.vue'
import  papa        from '@/components/sub-components/letters/papa.vue'
import  termination from '@/components/sub-components/letters/termination.vue'
import  html2pdf    from 'html2pdf.js'
import  moment      from 'moment'
export  default {
  mixins: [sharedFunctions],
  props: {
    caseInfo: Object
  },
  components: {
    attendance, blankPapa, caseReport, dateSelect, eligibility, papa, papaLetter, termination
  },
  data(){
    return{
      endDate: {
        month: "",
        day: "",
        year: ""
      },
      printDialog: false,
      printType: "",
      selectedChild: "",
      selectedProvider: "",
      startDate: {
        month: "",
        day: "",
        year: ""
      },
    }
  },
  methods: {
    downloadForm(){
      let toPrint
      let opt = {
        margin:       .5,
        filename:     this.getFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    {mode: 'legacy'}
      }
      if (this.printType.startsWith('letter')){
        toPrint = document.getElementById('letter')
      }
      else {
        toPrint = document.getElementById(this.printType)
      }
      html2pdf().set(opt).from(toPrint).save();
    },
    openPrintDialog(id){
      this.printType    = id
      this.printDialog  = true
    },
    reset(){
      this.selectedChild    = ""
      this.selectedProvider =""
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
      let sel = []
      sel.push(this.caseInfo)
      return sel
    },
    getFileName(){
      let appData = this.caseInfo.familyInfo.applicant
      return `${appData.firstName}_${appData.lastName}_${this.printType}_${moment().format('MM/DD/YYYY')}`
    },
    getDates(){
      if (this.selectedChild == '' || this.selectedProvider == '') {
        return
      }
      else {
        let dates = []
        this.caseInfo.providers.forEach(prov => {
          if (prov.forChild == this.selectedChild && prov.name == this.selectedProvider) {
            let start = this.formatDate(prov.papaStart)
            let end   = this.formatDate(prov.papaEnd)
            dates.push(`${start} - ${end}`)
          }
        })
        return dates.sort()
      }
    },
    getKids(){
      let kids = []
      this.caseInfo.providers.forEach(prov => {
        kids.push(prov.forChild)
      })
      return kids
    },
    getProviderData(){
      let prov = this.caseInfo.providers.find(provider => {
        return provider.forChild == this.selectedChild && provider.name == this.selectedProvider
      })
      return prov
    },
    getProviderNames(){
      let caseProviders = this.caseInfo.providers
      let childProviders = []
      caseProviders.forEach(prov => {
        if (prov.forChild == this.selectedChild) {
          childProviders.push(prov.name)
        }
      })
      return childProviders
    }
  }
}
</script>

<style lang="css">

</style>
