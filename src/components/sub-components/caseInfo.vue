<template lang="html">
  <v-card>
    <v-card-text>
      <v-card>
        <v-toolbar color="primary" dark dense flat>
          <v-toolbar-title>
            Case ID: {{ selectedCase.caseId == 0 ? "TBD" : selectedCase.caseId }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-text-field
              solo label="Case Status"
              :value="getStatus"
              :background-color="statusColor"
              readonly flat>
            </v-text-field>
          </v-toolbar-items>
        </v-toolbar>
        <div class="text-xs-left">
          <v-btn color="secondary" dark @click="statusModal = true" small outline>
            <v-icon left>track_changes</v-icon>
            Set Case Status
          </v-btn>
        </div>
        <!-- STATUS MODAL -->
        <v-dialog
          v-model="statusModal"
          persistent :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Select Current Case Status</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" outline icon @click="statusModal = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-layout column>
                <v-select
                  :items="statusList"
                  v-model="selectedStatus"
                  label="Case Status"
                ></v-select>
                <v-btn color="primary" @click="saveStatus()">Set Status</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- TABS -->
        <v-card-text>
          <v-tabs
            v-model="activeTab"
            color="info"
            centered
            grow
            slider-color="secondary"
          >
            <v-tab class="subheading">
              Family Information
            </v-tab>
            <v-tab class="subheading">
              Provider Information
            </v-tab>
            <v-tab class="subheading">
              Attendance Log
            </v-tab>
            <v-tab class="subheading">
              Letters
            </v-tab>
            <v-tab class="subheading">
              Notes
            </v-tab>
            <!-- BEGIN TAB COMPONENTS -->
            <v-tab-item>
              <familyInfo :familyData="getFamilyData()"></familyInfo>
            </v-tab-item>
            <v-tab-item>
              <providerInfo :providerInfo="getProviderData()"></providerInfo>
            </v-tab-item>
            <v-tab-item>
              <attendanceLog
                :recordedAtt="getAttendance()"
                :kids="getFamilyData().children"
                :providers="getProviderData()"
              >
              </attendanceLog>
            </v-tab-item>
            <v-tab-item>
              <letters :caseInfo="selectedCase"></letters>
            </v-tab-item>
            <v-tab-item>
              <notes :caseNotes="getNotes()"></notes>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-right">
        <v-btn color="primary" @click="saveCase()">
          <v-icon left>save</v-icon>
          Save Case Information
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="confirmModal"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <confirmLeave return-value=""></confirmLeave>
    </v-dialog>
  </v-card>
</template>

<script>
import familyInfo from "@/components/sub-components/familyInfo.vue"
import providerInfo from "@/components/sub-components/providerInfo.vue"
import attendanceLog from "@/components/sub-components/attendanceLog.vue"
import letters from "@/components/sub-components/letters.vue"
import notes from "@/components/sub-components/notes.vue"
import confirmLeave from '@/components/sub-components/confirmLeave.vue'
export default {
  components: {
    familyInfo, providerInfo, attendanceLog, letters, notes, confirmLeave
  },
  props: {
    caseData: {}
  },
  data(){
    return{
      activeTab: "",
      confirmModal: false,
      selectedCase: this.caseData,
      selectedStatus: "",
      statusColor: "",
      statusList: ['Approved','Approved with Conditions', 'Reactivated','Pending', 'Ineligible', 'Waiting List', 'Received, Not Reviewed'],
      statusModal: false
    }
  },
  methods: {
    confirm(){
      // this.confirmModal = true
      // if (this.confirmResponse() == true){
      //   return true
      // }
      // else {
      //   return false
      // }
    },
    getFamilyData(){
      return this.selectedCase.familyInfo
    },
    getProviderData(){
      return this.selectedCase.providers
    },
    getAttendance(){
      return this.selectedCase.attendance
    },
    getNotes(){
      return this.selectedCase.notes
    },
    saveStatus(){
      let now = new Date().toString().split(" ")
      let statusSetDate = `${now[1]}/${now[2]}/${now[3]}`
      let statusUpdate  = {
        status  : this.selectedStatus,
        date    : statusSetDate
      }
      this.selectedCase.caseStatus.push(statusUpdate)
      this.statusModal = false
    },
    saveCase(){
      if (this.selectedCase.caseId === null){
        this.$store.dispatch('newCase', this.selectedCase)
      }
      else {
        this.$store.dispatch('saveCase', this.selectedCase)
      }
    }
  },
  computed: {
    getStatus(){
      let allStatusColors={
        'Approved'                  : "green darken-5",
        'Approved with Conditions'  : "orange darken-2",
        'Reactivated'               : "green lighten-2",
        'Pending'                   : "yellow darken-3",
        'Ineligible'                : "brown lighten-4",
        'Waiting List'              : "blue darken-5",
        'Received, Not Yet Reviewed': "grey darken-2"
      }
        let allStatus       = this.selectedCase.caseStatus
        let lastStatus      = (this.selectedCase.caseStatus.length - 1)
        let currentStatus   = allStatus[lastStatus].status
        this.statusColor    = allStatusColors[currentStatus]
        return currentStatus
    }
  }
}
</script>

<style lang="css">
</style>
