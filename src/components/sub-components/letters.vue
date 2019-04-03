<template lang="html">
  <div>
    <v-card flat>
      <v-card-text>
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
        <br>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
              PAPA Forms
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" @click="openPrintDialog('papa-letter')" round outline>
            <v-icon left>fas fa-envelope-open-text</v-icon>
            PAPA Letter
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('papa-form')" disabled round outline>
            <v-icon left>description</v-icon>
            Pre-PAPA
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('papa-final')" disabled round outline>
            <v-icon left>fas fa-file-contract</v-icon>
            Finalized PAPA
          </v-btn>
        </v-layout>
        <br>
        <v-layout class="secondary white--text">
          <v-flex xs6 class="subheading ma-1">
            Other Forms
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap justify-space-around>
          <v-btn outline color="primary" @click="openPrintDialog('termination')" round outline>
            <v-icon left>close</v-icon>
            Termination Letter
          </v-btn>
          <v-btn outline color="primary" @click="openPrintDialog('attendance')" round outline>
            <v-icon left>date_range</v-icon>
            Attendance Voucher
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-container
      transition="dialog-transition"
      v-if="printDialog"
    >
    <!-- SETTINGS FOR FINALAIZED PAPA FORM -->
    <v-card color="info" v-if="printType == 'papa-final'" flat>
      <v-toolbar color="secondary" dark dense flat>
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
          <v-btn color="secondary" outline small round @click="reset()">
            <v-icon left small>fas fa-times</v-icon>
            Reset
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <br>
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
        <papa
          v-if="printType == 'papa-final' && selectedChild != '' && selectedProvider != ''"
          :caseData="caseInfo"
          :providerData="getProviderData[0]"
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
import  html2pdf    from 'html2pdf.js'
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
      printType: "",
      selectedChild: "",
      selectedProvider: ""
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
    formatDate(dateStr){
      let month = dateStr.slice(0,2)
      let day   = dateStr.slice(2,4)
      let year  = dateStr.slice(4,8)
      return `${month}/${day}/${year}`
    },
    openPrintDialog(id){
      this.printType    = id
      this.printDialog  = true
    },
    reset(){
      this.selectedChild    = ""
      this.selectedProvider =""
    }
  },
  computed: {
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
