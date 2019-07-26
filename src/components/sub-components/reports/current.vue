<template lang="html">
  <v-card flat>
    <v-alert color="accent2" :value="true" outline class="text-xs-center">
      <slot name="alert"></slot>
    </v-alert>
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
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    allCases: Array
  },
  methods: {
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
      let activeCases = this.allCases.filter(currentCase => {
        return currentCase.caseStatus[currentCase.caseStatus.length - 1].status != "Inactive"
      })
      console.log(activeCases)
      return activeCases.sort((caseA, caseB) => {
        if (caseA.caseId > caseB.caseId) {
          return 1
        }
        else {
          return -1
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
