<template lang="html">
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-right" @click="addRecord()">
        <v-btn color="primary" outline small>
          <v-icon left>add_circle</v-icon>
          Add Attendance Record
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-card v-for="(attRec, index) in attendanceRecords" :key="index" :color="setCardColor(index)">
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-right">
            <v-btn color="primary" icon outline small @click="confirmDelete(index)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                :items="kidList"
                v-model="attRec.child"
                label="Select Child"
              ></v-select>
            </v-flex>
            <v-flex xs6 offset-xs1>
              <v-select
                :items="providerList(attRec.child)"
                v-model="attRec.facility"
                label="Select Facility"
              ></v-select>
            </v-flex>
            <v-flex xs2>
              <v-select
                :items="months"
                v-model="attRec.month"
                label="Select Month"
              ></v-select>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                label="Enter Year"
                v-model="attRec.year"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-select
                :items="yesNo"
                v-model="attRec.attendance"
                label="Over 50% Attendance?"
                @blur="(attRec.attendance == 'Yes') ? (attRec.amount = getPapaAmt(attRec)) : (attRec.amount = null)"
              ></v-select>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-text-field
                readonly
                label="Monthly Amount:"
                v-if="attRec.attendance == 'Yes'"
                :value="getPapaAmt(attRec)"
                prepend-icon="fas fa-dollar-sign"
              ></v-text-field>
              <v-text-field
                v-else
                label="Monthly Amount:"
                v-model="attRec.amount"
                prepend-icon="fas fa-dollar-sign"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-alert color="red darken-4" :value="!getDates(attRec)" outline icon="warning">
            "There is no record on the PROVIDER INFORMATION tab which matches this child, provider and within the specified dates"
          </v-alert>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-dialog
      v-model="deleteDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dark dense>
          <v-toolbar-title>Delete this Attendance Record?</v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap justify-space-around>
          <v-btn color="primary" @click="deleteRecord()">
            <v-icon left>check</v-icon>
            Yes
          </v-btn>
          <v-btn color="red darken-4" dark @click="deleteDialog = false">
            <v-icon left>close</v-icon>
            No
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    caseData: Object
  },
  data(){
    return{
      attendanceRecords : this.caseData.attendance,
      blankAttRecord    :
      {
        child             : "",
        facility          : "",
        month             : "",
        attendance        : null,
        amount            : null,
      },
      deleteDialog        : false,
      months              : ['01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun', '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'],
      recordToDelete      : null,
      yesNo               : ['No', 'Yes']
    }
  },
  methods: {
    addRecord(){
      let add = {
        child             : "",
        facility          : "",
        month             : "",
        attendance        : null,
        amount            : null,
      }
      this.attendanceRecords.unshift(add)
    },
    confirmDelete(i){
      this.recordToDelete = i
      this.deleteDialog = true
    },
    deleteRecord(){
      this.attendanceRecords.splice(this.recordToDelete, 1)
      this.deleteDialog = false
    },
    getDates(rec){
      let providerRecords = this.caseData.providers
      for (let i=0; i < providerRecords.length; i++){
        let start = moment(providerRecords[i].papaStart, "MMDDYYYY")
        let end   = moment(providerRecords[i].papaEnd, "MMDDYYYY")
        let recordDate = moment(`${rec.month.slice(0,2)}28${rec.year}`, "MMDDYYYY")
        if (moment(recordDate).isBetween(start, end)) {
          if (rec.child == providerRecords[i].forChild && rec.facility == providerRecords[i].name) {
            return true
          }
        }
        else {
          return false
        }
      }
    },
    getPapaAmt(record){
      if (this.getDates(record) == true) {
        let correctRecord = this.caseData.providers.filter(rec => {
          return (rec.forChild == record.child && rec.name == record.facility)
        })
        return correctRecord[0].monthlyAmt
      }
      else {
        return false
      }
    },
    providerList(kid){
      let facilities = []
      this.caseData.providers.forEach(place => {
        if (place.forChild.includes(kid)){
          facilities.push(`${place.name}`)
        }
      })
      return facilities
    },
    setCardColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-2"
      }
    }
  },
  computed: {
    kidList(){
      let children = []
      this.caseData.familyInfo.children.forEach(kid => {
        children.push(`${kid.firstName} ${kid.lastName}`)
      })
      return children
    },
  }
}
</script>

<style lang="css">
</style>

<!--
* ADD PROP TO RECEIVE ATTENDANCE LOG (AS AN OBJECT)
* Add input for the attendance log (see Mark for the appropriate report)
-->
