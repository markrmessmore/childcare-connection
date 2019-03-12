<template lang="html">
  <div class="">
    <editSelected v-if="caseEdit" :selectedCase="selectedCase" ref="editCase"></editSelected>
    <v-card v-else>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon>search</v-icon>
          Search for an existing case
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card flat color="">
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
            <v-layout row justify-space-around>
              <!-- <v-flex xs10 offset-xs1 justify-space-between> -->
                <v-btn color="accent2" outline dark large @click="resetSearch()">
                  <v-icon left>undo</v-icon>
                  Reset Search
                </v-btn>
                <v-btn large color="primary" @click="searchCases()">
                  <v-icon left>search</v-icon>
                  Search
                </v-btn>
              <!-- </v-flex> -->
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
    },
    searchCases(){
    let filteredCases = []
      if (this.search.caseId) {
        let filteredByCase = this.getCases.filter(record => record.caseId.toString().includes(this.search.caseId))
        filteredCases.push(filteredByCase)
      }
      if (this.search.applicantLastName) {
        let filteredByAppLastName = this.getCases.filter(record => record.familyInfo.applicant.lastName.toLowerCase().includes(this.search.applicantLastName.toLowerCase()))
        filteredCases.push(filtedByAppLastName)
      }
      if (this.search.coApplicantLastName) {
        let filteredByCoAppLastName = this.getCases.filter(record => record.familyInfo.coapplicant.lastName.toLowerCase().includes(this.search.coApplicantLastName.toLowerCase()))
        filteredCases.push(filtedByCoAppLastName)
      }
      if (this.search.childLastName) {
        let filteredByChildLastName = this.getCases.filter(record => {
          return record.familyInfo.children.some(child => {
            return child.lastName.toLowerCase().includes(this.search.childName.toLowerCase())
          })
        })
        filteredCases.push(filteredByChildLastName)
      }
      this.searchResults = filteredCases
    },
    selectCase(selected){
      this.selectedCase = selected
      this.caseEdit     = true
    }
  },
  computed: {
    getCases(){
      return this.$store.getters.getCases
    }
  },
  // beforeRouteLeave: function(to, from, next){
  //   // this.$refs.editCase.confirmLeave()
  //   next()
  // }
};
</script>

<style lang="css"></style>

<!--
* Add ability to search for last name (parent or child), or case ID
display search results (names & case IDs)
* select a case and open it in the editCase component
-->
