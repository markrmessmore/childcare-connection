<template lang="html">
  <div>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" large @click="openPrintDialog('letter-papa')">
            <v-icon left>note</v-icon>
            PAPA Letter
          </v-btn>
          <v-btn outline color="primary" large>
            <v-icon left>description</v-icon>
            PAPA
          </v-btn>
          <v-btn outline color="primary" large>
            <v-icon left>close</v-icon>
            Termination Letter
          </v-btn>
          <v-btn outline color="primary" large>
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
    <v-dialog
      v-model="printDialog"
      scrollable
      width="720"
      height="auto"
      persistent
      transition="dialog-transition"
    >
    <v-card>
      <v-toolbar color="primary" dense>
        <v-btn color="white" outline @click="downloadForm()">
          <v-icon left>cloud_download</v-icon>
          Download Form
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" icon outline @click="printDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <eligibility
          id="printPDF"
          :printType="printType"
          :caseData="caseInfo"
        ></eligibility>
        <v-toolbar color="primary" dense>
          <v-btn color="white" outline @click="downloadForm()">
            <v-icon left>cloud_download</v-icon>
            Download Form
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" icon outline @click="printDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const   mercerLogo  = require('@/assets/mercerLogo.json')
import  eligibility from '@/components/sub-components/letters/eligibility.vue'
import  html2pdf    from 'html2pdf.js'
export  default {
  props: {
    caseInfo: Object
  },
  components: {
    eligibility
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
      // * letter-accept
      // * letter-term
      // * letter-wait
      // * letter-pend
      // * letter-inel
      // * letter-prepapa
      // * letter-papa
      this.printType    = id
      this.printDialog  = true
    },
    downloadForm(){
      let toPrint = document.getElementById('printPDF')
      let options = {
        margin: .5,
        jsPDF : { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf(toPrint, options)
    }
  },
  computed: {

  }
}
</script>

<style lang="css">
</style>

<!-- ADD BUTTONS FOR THE FOLLOWING LETTERS:
* When clicked generate a PDF based on the record info (and provided letters) that can be printed
-->
