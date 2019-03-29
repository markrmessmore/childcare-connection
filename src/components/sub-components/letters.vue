<template lang="html">
  <div>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" @click="openPrintDialog('papa-letter')" round outline>
            <v-icon left>note</v-icon>
            PAPA Letter
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('papa-form')" round outline>
            <v-icon left>description</v-icon>
            Pre-PAPA
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('termination')" round outline>
            <v-icon left>close</v-icon>
            Termination Letter
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('attendance')" round outline>
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
          <v-btn outline color="primary" @click="openPrintDialog('letter-accepted')" round outline>
            <v-icon left>check</v-icon>
            Accepted
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('letter-waiting')" round outline>
            <v-icon left>access_time</v-icon>
            Waiting List
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('letter-pending')" round outline>
            <v-icon left>hourglass_empty</v-icon>
            Pending
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('letter-ineligible')" round outline>
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
        <v-btn outline @click="downloadForm()" small round>
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
          <v-btn outline @click="downloadForm()" small round>
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
import  attendance  from '@/components/sub-components/letters/attendance.vue'
import  eligibility from '@/components/sub-components/letters/eligibility.vue'
import  papaLetter  from '@/components/sub-components/letters/papaLetter.vue'
import  papa        from '@/components/sub-components/letters/papa.vue'
import  termination from '@/components/sub-components/letters/termination.vue'
import  html2canvas from 'html2canvas'
import  jsPDF       from 'jspdf'
// import  html2pdf    from 'html2pdf.js'
import  moment      from 'moment'
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
      this.printType    = id
      this.printDialog  = true
    },
    downloadForm(){
      let html2canvasOptions = {
        letterRendering: true,
        fixLigatures: true
      }
      let toPrint
      if (this.printType.startsWith('letter')){
        toPrint = document.getElementById('letter')
      }
      else {
        toPrint = document.getElementById(this.printType)
      }
  		html2canvas(toPrint, html2canvasOptions).then(canvas => {
        let url     = canvas.toDataURL("image/png")
        let newDoc  = window.open()
        newDoc.document.write('<img src="'+url+'"/>');
  			// let pdf = new jsPDF('p', 'mm', 'a4');
  			// pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
  			// pdf.save(this.getFileName);
  		});
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
