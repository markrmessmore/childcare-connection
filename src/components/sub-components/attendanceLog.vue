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
                box
                :items="kidList"
                v-model="attRec.child"
                label="Select Child"
              ></v-select>
            </v-flex>
            <v-flex xs6 offset-xs1>
              <v-select
                box
                :items="providerList"
                v-model="attRec.facility"
                label="Select Facility"
              ></v-select>
            </v-flex>
            <v-flex xs2>
              <v-select
                box
                :items="months"
                v-model="attRec.month"
                label="Select Month"
              ></v-select>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                box
                label="Enter Year"
                v-model="attRec.year"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                box
                label="Enter Days Present"
                v-model="attRec.attendance"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
              box
              label="Enter Amount"
              v-model="attRec.amount"
              ></v-text-field>
            </v-flex>
          </v-layout>
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
        <v-toolbar color="primary" dark>
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
export default {
  props: {
    recordedAtt : Array,
    kids        : Array,
    providers   : Array
  },
  data(){
    return{
      attendanceRecords : this.recordedAtt,
      blankAttRecord    :
      {
        child             : "",
        facility          : "",
        month             : "",
        attendance        : null,
        amount            : null,
      },
      deleteDialog        : false,
      kidList             : this.getKidList(),
      months              : ['01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun', '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'],
      providerList        : this.getProviderList(),
      recordToDelete      : null,
    }
  },
  methods: {
    addRecord(){
      let add = this.blankAttRecord
      this.attendanceRecords.push(add)
    },
    confirmDelete(i){
      this.recordToDelete = i
      this.deleteDialog = true
    },
    deleteRecord(){
      this.attendanceRecords.splice(this.recordToDelete, 1)
      this.deleteDialog = false
    },
    getKidList(){
      let children = []
      this.kids.forEach(child => {
        children.push(child.firstName)
      })
      return children
    },
    getProviderList(){
      let list = []
      this.providers.forEach(prov => {
        list.push(prov.name)
      })
      return list
    },
    setCardColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-4"
      }
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* ADD PROP TO RECEIVE ATTENDANCE LOG (AS AN OBJECT)
* Add input for the attendance log (see Mark for the appropriate report)
-->
