<template lang="html">
  <v-card>
    <v-data-table
      :headers="tableHeaders"
      :items="getCases"
      class="elevation-1"
      pagination.sync="pagination"
      item-key="id"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.caseId}}</td>
        <td class="text-xs-left">{{props.item.familyInfo.applicant.name}}</td>
        <td class="text-xs-left">{{props.item.activeDate}}</td>
        <td class="text-xs-left">{{props.item.endDate}}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      tableHeaders: [
        {
          text: 'Case ID',
          align: 'left',
          sortable: 'false',
          value: 'caseId'
        },
        {
          text: 'Applicant Name',
          align: 'left',
          sortable: 'false',
          value: 'appName'
        },
        {
          text: 'Start Date',
          align: 'left',
          sortable: 'false',
          value: 'activeDate'
        },
        {
          text: 'End Date',
          align: 'left',
          sortable: 'false',
          value: 'endDate'
        }
      ]
    }
  },
  computed: {
    getCases(){
      return this.$store.getters.getCases
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
