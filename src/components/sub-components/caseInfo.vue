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
        <v-layout align-center row>
          <v-flex xs2>
            <v-btn color="secondary" dark @click="statusModal = true" small outline round>
              <v-icon left>track_changes</v-icon>
              Set Case Status
            </v-btn>
          </v-flex>
          <v-flex xs2 offset-xs5 >
            <v-text-field
              label="Eligibility Start:"
              readonly
              v-model="this.selectedCase.activeDate"
              mask="##/##/####"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 offset-xs1>
            <v-text-field
              label="Eligibility End:"
              readonly
              v-model="this.selectedCase.endDate"
              mask="##/##/####"
            ></v-text-field>
          </v-flex>
          <!-- <v-btn outline color="red darken-4" dark v-if="getUserRole == 'admin'" small>
            <v-icon left>delete</v-icon>
            Delete Case
          </v-btn> -->
        </v-layout>
        <!-- STATUS MODAL -->
        <v-dialog
          v-model="statusModal"
          persistent :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar color="primary" dark dense>
              <v-toolbar-title>Select Current Case Status</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" small outline icon @click="statusModal = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs11>
                  <v-select
                    :items="statusList"
                    v-model="selectedStatus"
                    label="Case Status"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout
                row wrap
                v-if="
                selectedStatus == 'Approved' ||
                selectedStatus == 'Approved with Conditions' ||
                selectedStatus == 'Reactivated'"
              >
                <v-flex xs5>
                  <v-text-field
                    label="Eligibility Start:"
                    mask="##/##/####"
                    v-model="selectedCase.activeDate"
                  ></v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-text-field
                    label="Eligibility End:"
                    mask="##/##/####"
                    v-model="selectedCase.endDate"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-right">
                  <v-btn color="primary" @click="saveStatus()" round small outline>
                    <v-icon left>check_circle_outline</v-icon>
                    Set Status
                  </v-btn>
                </v-flex>
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
              Letters/Reports
            </v-tab>
            <v-tab class="subheading">
              Notes
            </v-tab>
            <!-- BEGIN TAB COMPONENTS -->
            <v-tab-item>
              <familyInfo :familyData="getFamilyData()"></familyInfo>
            </v-tab-item>
            <v-tab-item>
              <providerInfo :caseInfo="selectedCase"></providerInfo>
            </v-tab-item>
            <v-tab-item>
              <attendanceLog :caseData="selectedCase"></attendanceLog>
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
        <v-btn color="primary" @click="saveCase()" round outline>
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
      statusList: ['Approved','Approved with Conditions', 'Reactivated','Pending', 'Inactive', 'Ineligible', 'Waiting List', 'Received, Not Reviewed'],
      statusModal: false
    }
  },
  mounted(){
    document.body.addEventListener('keyup', e => {
      if (e.keyCode == 81 && e.ctrlKey) {
        this.saveCase()
      }
    })
  },
  methods: {
    getFamilyData(){
      return this.selectedCase.familyInfo
    },
    getAttendance(){
      if (this.selectedCase.attendance){
        return this.selectedCase.attendance
      }
      else {
        return []
      }
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
      this.saveCase()
    },
    saveCase(){
      this.$store.dispatch('saveCase', this.selectedCase)
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
    },
    getUserRole(){
      return this.$store.getters.getUserRole
    }
  }
}
</script>

<style lang="css">
</style>
