<template lang="html">
  <v-card flat>
    <!-- HEADINGS -->
    <v-layout class="text-xs-left secondary white--text">
      <v-flex xs1 class="pl-1">
        Case ID
      </v-flex>
      <v-flex xs3>
        Applicant
      </v-flex>
      <v-flex xs2>
        Elig. Start
      </v-flex>
      <v-flex xs2>
        Elig. End
      </v-flex>
      <v-flex xs2>
        Phone
      </v-flex>
      <v-flex xs2 class="text-xs-center">
        Current Status
      </v-flex>
    </v-layout>
    <!-- CASES -->
    <v-layout row wrap v-for="(selected, i) in getCases" class="text-xs-left" :class="getColor(i)" :key="i">
      <v-flex xs1 class="pl-1">
        {{selected.caseId}}
      </v-flex>
      <v-flex xs3>
        {{selected.familyInfo.applicant.lastName}}, {{selected.familyInfo.applicant.firstName}}
      </v-flex>
      <v-flex xs2>
        {{formatDate(selected.activeDate)}}
      </v-flex>
      <v-flex xs2>
        {{formatDate(selected.endDate)}}
      </v-flex>
      <v-flex xs2>
        {{formatPhone(selected.familyInfo.phone1.num)}}
      </v-flex>
      <v-flex xs2 class="text-xs-center">
        {{selected.caseStatus[selected.caseStatus.length - 1].status}}
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    allCases: Array
  },
  methods: {
    formatDate(dateStr){
      let month = dateStr.slice(0,2)
      let day   = dateStr.slice(2,4)
      let year  = dateStr.slice(4,8)
      return `${month}/${day}/${year}`
    },
    formatPhone(str){
      let area = str.slice(0,3)
      let nxx  = str.slice(3,6)
      let ext  = str.slice(6)
      return `(${area}) ${nxx}-${ext}`
    },
    getColor(i){
      if (i%2 == 0){
        return
      }
      else {
        return "grey lighten-3"
      }
    }
  },
  computed: {
    getCases(){
      return this.allCases.filter(currentCase => {
        return currentCase.caseStatus[currentCase.caseStatus.length - 1].status != "Inactive"
      })
    }
  }
}
</script>

<style lang="css">
</style>
