<template lang="html">
  <div>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" large @click="openPrintDialog('papa-letter')">
            <v-icon left>note</v-icon>
            PAPA Letter
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('papa-form')">
            <v-icon left>description</v-icon>
            PAPA
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('termination')">
            <v-icon left>close</v-icon>
            Termination Letter
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('attendance')">
            <v-icon left>date_range</v-icon>
            Attendance Voucher
          </v-btn>
        </v-layout>
        <br>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
              Eligibility Notification Letters
          </v-flex>
        </v-layout>
        <v-divider inset></v-divider>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" large @click="openPrintDialog('letter-accepted')">
            <v-icon left>check</v-icon>
            Accepted
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('letter-waiting')">
            <v-icon left>access_time</v-icon>
            Waiting List
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('letter-pending')">
            <v-icon left>hourglass_empty</v-icon>
            Pending
          </v-btn>
          <v-btn outline color="primary" large @click="openPrintDialog('letter-ineligible')">
            <v-icon left>not_interested</v-icon>
            Ineligible
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-container
      transition="dialog-transition"
      v-if="printDialog"
    >
    <v-card>
      <v-toolbar color="info" dense>
        <v-btn outline @click="downloadForm()" small>
          <v-icon left>cloud_download</v-icon>
          Download Form
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon outline @click="printDialog = false" small>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <eligibility
          v-if="printType.startsWith('letter')"
          id="letter"
          :printType="printType"
          :caseData="caseInfo"
        ></eligibility>
        <attendance
          v-if="printType == 'attendance'"
          id="attendance"
        ></attendance>
        <papa
          v-if="printType == 'papa-form'"
          :caseData="caseInfo"
          id="papa-form"
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
        <v-toolbar color="info" dense>
          <v-btn outline @click="downloadForm()" small>
            <v-icon left>cloud_download</v-icon>
            Download Form
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon outline @click="printDialog = false" small>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
const   mercerLogo  = require('@/assets/mercerLogo.json')
import  attendance from '@/components/sub-components/letters/attendance.vue'
import  eligibility from '@/components/sub-components/letters/eligibility.vue'
import  papaLetter from '@/components/sub-components/letters/papaLetter.vue'
import  papa from '@/components/sub-components/letters/papa.vue'
import  termination from '@/components/sub-components/letters/termination.vue'
import  html2pdf    from 'html2pdf.js'
import  moment from 'moment'
export  default {
  props: {
    caseInfo: Object
  },
  components: {
    attendance, eligibility, papa, papaLetter, termination
  },
  data(){
    return{
      printDialog: false,
      printType: ""
    }
  },
  methods: {
    openPrintDialog(id){
      // LETTERS:
      // * papa
      // * attendance voucher
      this.printType    = id
      this.printDialog  = true
    },
    downloadForm(){
      let toPrint;
      if (this.printType.startsWith('letter')){
        toPrint = document.getElementById('letter')
      }
      else {
        toPrint = document.getElementById(this.printType)
      }

      let options = {
        margin: .5,
        filename: this.getFileName,
        jsPDF : { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf(toPrint, options)
    }
  },
  computed: {
    getFileName(){
      let appData = this.caseInfo.familyInfo.applicant
      return `${appData.firstName}_${appData.lastName}_${this.printType}_${moment().format('MM/DD/YYYY')}`
    }
  }
}
</script>

<style lang="css">
</style>

<!-- ADD BUTTONS FOR THE FOLLOWING LETTERS:
* When clicked generate a PDF based on the record info (and provided letters) that can be printed
-->
