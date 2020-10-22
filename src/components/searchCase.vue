<template lang="html">
  <v-card>
    <v-toolbar text>
      <v-toolbar-title>
        <v-icon left>fas fa-search</v-icon>
        Case Search:
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items> -->
        <v-btn color="accent2" dark small @click="confirmReset()" rounded outlined>
          <v-icon left small>fas fa-undo</v-icon>
          Reset Search
        </v-btn>
      <!-- </v-toolbar-items> -->
    </v-toolbar>
    <v-card-text>
      <editSelected v-if="caseEdit" :selectedCase="selectedCase" ref="editCase"></editSelected>
      <div v-else>
        <v-card text >
          <v-toolbar color="secondary" text dense dark class="subheading">
            Search By:
          </v-toolbar>
          <v-card-text>
            <p class="subheading">
              Enter any pieces of information and click the search button.
            </p>
            <v-layout row wrap>
              <v-flex xs5>
                <v-text-field filled label="Case ID" v-model="search.caseId"></v-text-field>
              </v-flex>
              <v-flex xs6 offset-xs1>
                <v-text-field filled label="Applicant Last Name" v-model="search.applicantLastName"></v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-text-field filled label="Co-Applicant Last Name" v-model="search.coApplicantLastName"></v-text-field>
              </v-flex>
              <v-flex xs6 offset-xs1>
                <v-text-field filled label="Child's Last Name" v-model="search.childLastName"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-end>
              <v-btn color="primary" @click="searchCases()" rounded outlined small>
                <v-icon left small>fas fa-search</v-icon>
                Search
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card text>
          <v-toolbar color="secondary" text dense dark class="subheading">
            Search Results:
          </v-toolbar>
          <v-data-table
            :headers="tableHeaders"
            :items="searchResults"
            pagination.sync="pagination"
            item-key="id"
            :footer-props="{
              options: {
                itemsPerPage: rowsPerPageItems
              }
            }"
          >
            <template v-slot:no-data>
              <v-alert :value="true" color="secondary" outlined icon="fas fa-search">
                Please enter search criteria and search for a case.
              </v-alert>
            </template>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left body-1" width="5%">{{props.item.caseId}}</td>
              <td class="text-xs-left subheading" width="30%">
                {{props.item.familyInfo.applicant.lastName}}, {{props.item.familyInfo.applicant.firstName}}
              </td>
              <td width="20%" class="text-xs-center">
                {{props.item.caseStatus[props.item.caseStatus.length - 1].status}}
              </td>
              <td width="15%">
                <v-text-field class="body-1" v-model="props.item.activeDate" mask="##/##/####"></v-text-field>
              </td>
              <td width="15%">
                <v-text-field class="body-1" v-model="props.item.endDate" mask="##/##/####"></v-text-field>
              </td>
              <td width="10%" class="pa-0 ma-0 text-xs-center">
                <v-btn color="primary" @click="selectCase(props.item)" icon rounded outlined small>
                  <v-icon small>fas fa-pen</v-icon>
                </v-btn>
              </td>
              <td width="10%" class="pa-0 ma-0 text-xs-center" v-if="getUserRole == 'admin'">
                <v-btn color="red darken-3" small icon @click="confirmDel(props.item)" outlined>
                  <v-icon small>fas fa-trash</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-card-text>
    <v-dialog
      v-model="caseRemoveDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card text>
        <v-toolbar color="primary" dark dense text>
          <v-toolbar-title>
           <v-icon left>fas fa-check-circle</v-icon>
            Confirm Removal of Case:{{caseRemove.caseId}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 class="subheading">
              Are you sure you want to delete {{caseRemove.caseId}}?
            </v-flex>
          </v-layout>
          <br>
          <v-layout row wrap justify-space-around>
            <v-btn color="primary" @click="delCase()" rounded outlined>
              <v-icon left>fas fa-check</v-icon>
              Yes
            </v-btn>
            <v-btn color="red darken-4" @click="caseRemoveDialog = false" dark rounded outlined>
              <v-icon left>fas fa-times</v-icon>
              No
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>`
    </v-dialog>
    <v-dialog
      v-model="confirmLeave"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <confirmLeave @leave="leave()" @cancel="cancel()"></confirmLeave>
    </v-dialog>
  </v-card>
</template>

<script>
import editSelected from "@/components/sub-components/editCase.vue";
import confirmLeave from '@/components/sub-components/confirmLeave.vue'
export default {
  components: {
    editSelected, confirmLeave
  },
  data(){
    return{
      caseEdit: false,
      caseRemove: {},
      caseRemoveDialog: false,
      confirmLeave: false,
      nextRoute: null,
      rowsPerPageItems: [25,50,100],
      search: {
        applicantLastName: "",
        coApplicantLastName: "",
        childLastName: "",
        caseId: ""
      },
      selectedCase: {},
      searchResults: [],
      tableHeaders: [
        {
          text: 'Case ID',
          align: 'left',
          sortable: false,
          value: 'caseId',
          class: "body-1"
        },
        {
          text: 'Applicant Name',
          align: 'left',
          sortable: false,
          value: 'applicantLastName',
          class: "body-1"
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
          class: "body-1"
        },
        {
          text: 'Start Date',
          align: 'center',
          sortable: false,
          value: 'activeDate',
          class: "body-1"
        },
        {
          text: 'End Date',
          align: 'center',
          sortable: false,
          value: 'endDate',
          class: "body-1"
        },
        {
          sortable: false,
          align: 'right',
        }
      ]
    }
  },
  methods: {
    cancel(){
      this.confirmLeave = false
      this.nextRoute    = null
    },
    confirmDel(caseData){
      this.caseRemove       = caseData
      this.caseRemoveDialog = true
    },
    confirmReset(){
      if (this.selectedCase.caseId == undefined){
        this.resetSearch()
      }
      else {
        this.confirmLeave = true
        this.nextRoute = "reset"
      }
    },
    delCase(){
      this.$store.dispatch('removeCase', this.caseRemove)
      this.resetSearch()
      this.caseRemoveDialog = false
    },
    leave(){
      this.confirmLeave = false
      if (this.nextRoute == 'reset'){
        this.resetSearch()
      }
      else {
        this.nextRoute()
      }
    },
    reload(){
      this.$router.go()
    },
    resetSearch(){
      this.search = {
        applicantLastName: "",
        coApplicantLastName: "",
        childLastName: "",
        caseId: ""
      }
      this.searchResults = []
      this.caseEdit = false
    },
    searchCases(){
      if (
        this.search.caseId == "" &&
        this.search.applicantLastName == "" &&
        this.search.coApplicantLastName == "" &&
        this.search.childLastName == ""
      ){
        this.searchResults = this.getCases.sort((caseA, caseB) => {
          if (caseA.caseId > caseB.caseId){
            return 1
          }
          else {
            return -1
          }
        })
      }
      else {
        let filteredCases = []
        if (this.search.caseId !== "") {
          this.getCases.forEach(record => {
            if (record.caseId.toString().includes(this.search.caseId)) {
              filteredCases.push(record)
            }
          })
        }
        if (this.search.applicantLastName !== "") {
          this.getCases.forEach(record => {
            if (record.familyInfo.applicant.lastName.toString().includes(this.search.applicantLastName)) {
              filteredCases.push(record)
            }
          })
        }
        if (this.search.coApplicantLastName !== "") {
          this.getCases.forEach(record => {
            if (record.familyInfo.coapplicant.lastName.toString().includes(this.search.coApplicantLastName)) {
              filteredCases.push(record)
            }
          })
        }
        if (this.search.childLastName !== "") {
          this.getCases.forEach(record => {
            if (record.familyInfo.children){
              record.familyInfo.children.forEach(kid => {
                filteredCases.push(record)
              })
            }
          })
        }
        this.searchResults = filteredCases.sort((caseA, caseB) =>{
          if (caseA.caseId > caseB.caseId){
            return 1
          }
          else {
            return -1
          }
        })

      }
    },
    selectCase(selected){
      this.selectedCase = selected
      this.caseEdit     = true
    }
  },
  computed: {
    getCases(){
      let cases = []
      Object.entries(this.$store.getters.getCases).forEach(c => {
        cases.push(c[1])
      })
      return cases
    },
    getUserRole(){
      return this.$store.getters.getUserRole
    }
  },
  beforeRouteLeave(to, from, next){
    if (this.caseEdit == true){
      this.confirmLeave = true
      this.nextRoute = next
    }
    else {
      next()
    }
  },
};
</script>

<style lang="css">

</style>
