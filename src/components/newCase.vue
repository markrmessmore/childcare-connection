<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>add_circle</v-icon>
        Create a New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text v-if="!createNewCase">
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-right">
          <v-btn color="primary" @click="createNewCase = true" large outline>
            <v-icon left>add</v-icon>
            Click to Create a New Case
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text v-else>
      <caseInfo :caseData="blankCase" ref="caseInfo"></caseInfo>
    </v-card-text>
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
import caseInfo from '@/components/sub-components/caseInfo.vue'
import confirmLeave from '@/components/sub-components/confirmLeave.vue'
export default {
  components: {
    caseInfo,confirmLeave
  },
  data() {
    return {
      blankCase: {
        caseId      : null,
        caseStatus  : [
          {
            status  : "TBD",
            date    : ""
          }
        ],
        activeDate  : "",
        endDate     : "",
        familyInfo  : {
          address     : "",
          address2    : "",
          city        : "",
          state       : "NJ",
          zip         : "",
          phone1      : {
            type                  : "",
            num                   : ""
          },
          phone2      : {
            type                  : "",
            num                   : ""
          },
          cellphone   : "",
          numAdults   : null,
          numKids     : null,
          applicant   : {
            firstName             : "",
            midInitial            : "",
            lastName              : "",
            ssn                   : "",
            appRelation           : "",
            income    : [],
            primaryWork : {
              locationName        : "",
              type                : "",
              address             : "",
              city                : "",
              state               : "",
              zip                 : "",
              phone               : "",
              phoneext            : "",
              startDate           : "",
              status              : "",
              hoursPerWeek        : null,
              monthsPerYear       : null,
            },
            secondaryWork : {
              locationName        : "",
              type                : "",
              address             : "",
              city                : "",
              state               : "",
              zip                 : "",
              phone               : "",
              phoneext            : "",
              startDate           : "",
              status              : "",
              hoursPerWeek        : null,
              monthsPerYear       : null,
            }
          },
          coapplicant   : {
            firstName             : "",
            midInitial            : "",
            lastName              : "",
            ssn                   : "",
            appRelation           : "",
            income    : [],
            primaryWork  : {
              locationName        : "",
              type                : "",
              address             : "",
              city                : "",
              state               : "",
              zip                 : "",
              phone               : "",
              phoneext            : "",
              startDate           : "",
              status              : "",
              hoursPerWeek        : null,
              monthsPerYear       : null,
            },
            secondaryWork : {
              locationName        : "",
              type                : "",
              address             : "",
              city                : "",
              state               : "",
              zip                 : "",
              phone               : "",
              phoneext            : "",
              startDate           : "",
              status              : "",
              hoursPerWeek        : null,
              monthsPerYear       : null,
            }
          },
          children    : [],
        },
        notes: [
          {
            date            : "",
            text            : ""
          }
        ],
        providers: [],
        attendance: []
      },
      confirmLeave: false,
      createNewCase: false,
      nextRoute: null
    }
  },
  methods: {
    cancel(){
      this.confirmLeave = false
      this.nextRoute    = null
    },
    leave(){
      this.confirmLeave = false
      this.nextRoute()
    },
  },
  beforeRouteLeave(to, from, next){
    if (this.createNewCase == true){
      this.confirmLeave = true
      this.nextRoute = next
    }
    else {
      next()
    }
  }
};
</script>

<style lang="css"></style>

<!--
* see caseInfo.vue and listed sub-components for changes
* add data for a new record with all pertinent areas being blank. Send data to caseinfo
-->
