<template lang="html">
  <div class="">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon>search</v-icon>
          Case Search:
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="accent2" outline dark small @click="resetSearch()">
            <v-icon left>undo</v-icon>
            Reset Search
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <editSelected v-if="caseEdit" :selectedCase="selectedCase" ref="editCase"></editSelected>
        <div v-else>
          <v-card flat >
            <v-toolbar color="secondary" flat dense dark class="subheading">
              Search By:
            </v-toolbar>
            <v-card-text>
              <p class="subheading">
                Enter any pieces of information and click the search button.
              </p>
              <v-layout row wrap>
                <v-flex xs5>
                  <v-text-field box label="Case ID" v-model="search.caseId"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
                  <v-text-field box label="Applicant Last Name" v-model="search.applicantLastName"></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-text-field box label="Co-Applicant Last Name" v-model="search.coApplicantLastName"></v-text-field>
                </v-flex>
                <v-flex xs6 offset-xs1>
                  <v-text-field box label="Child's Last Name" v-model="search.childLastName"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-end>
                <v-btn large color="primary" @click="searchCases()">
                  <v-icon left>search</v-icon>
                  Search
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card flat>
            <v-toolbar color="secondary" flat dense dark class="subheading">
              Search Results:
            </v-toolbar>
            <v-data-table
              :headers="tableHeaders"
              :items="searchResults"
              pagination.sync="pagination"
              item-key="id"
              :rows-per-page-items="rowsPerPageItems"
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="secondary" outline icon="search">
                  Please enter search criteria and search for a case.
                </v-alert>
              </template>
              <template slot="items" slot-scope="props">
                <td class="text-xs-left subheading">{{props.item.caseId}}</td>
                <td class="text-xs-left subheading">
                  {{props.item.familyInfo.applicant.lastName}}, {{props.item.familyInfo.applicant.firstName}}
                </td>
                <td class="text-xs-left subheading">{{props.item.activeDate}}</td>
                <td class="text-xs-left subheading">{{props.item.endDate}}</td>
                <td class="text-xs-right">
                  <v-btn color="primary" @click="selectCase(props.item)">
                    <v-icon small left>edit</v-icon>
                    Select
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </div>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import editSelected from "@/components/sub-components/editCase.vue";
export default {
  components: {
    editSelected
  },
  data(){
    return{
      caseEdit: false,
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
          class: "subheading"
        },
        {
          text: 'Applicant Name',
          align: 'left',
          sortable: false,
          value: 'applicantLastName',
          class: "subheading"
        },
        {
          text: 'Start Date',
          align: 'left',
          sortable: false,
          value: 'activeDate',
          class: "subheading"
        },
        {
          text: 'End Date',
          align: 'left',
          sortable: false,
          value: 'endDate',
          class: "subheading"
        },
        {
          sortable: false,
          align: 'right',
        }
      ]
    }
  },
  methods: {
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
        this.searchResults = this.getCases
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
        this.searchResults = filteredCases
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
    }
  }
};
</script>

<style lang="css"></style>

<!--
* Add ability to search for last name (parent or child), or case ID
display search results (names & case IDs)
* select a case and open it in the editCase component
-->
