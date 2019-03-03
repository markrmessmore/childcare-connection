<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>add_circle</v-icon>
        Create a New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <caseInfo :caseData="blankCase"></caseInfo>
    </v-card-text>
  </v-card>
</template>

<script>
import caseInfo from '@/components/sub-components/caseInfo.vue'
export default {
  components: {
    caseInfo
  },
  data() {
    return {
      blankCase: {
        caseId      : 0,
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
          homephone   : "",
          cellphone   : "",
          numAdults   : null,
          numKids     : null,
          applicant   : {
            firstName             : "",
            midInitial            : "",
            lastName              : "",
            ssn                   : "",
            appRelation           : "",
            income    : [
              {
                title   : "Wages & Salary",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title: "Pension/Retirement/Supplemental/Social Security",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Unemployment/Worker's Comp.",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Public Assistance/TANF",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Child Support/Alimony",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Other Income",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              }
            ],
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
            income    : [
              {
                title   : "Wages & Salary",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title: "Pension/Retirement/Supplemental/Social Security",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Unemployment/Worker's Comp.",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Public Assistance/TANF",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Child Support/Alimony",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              },
              {
                title   : "Other Income",
                weekly  : 0,
                biWeekly: 0,
                monthly : 0,
                annually: 0,
                total   : 0
              }
            ],
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
      }
    };
  },
  methods: {}
};
</script>

<style lang="css"></style>

<!--
* see caseInfo.vue and listed sub-components for changes
* add data for a new record with all pertinent areas being blank. Send data to caseinfo
-->
