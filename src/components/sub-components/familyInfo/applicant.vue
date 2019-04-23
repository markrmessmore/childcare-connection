<template lang="html">
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field
            label="Applicant First Name"
            v-model="applicant.firstName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs1 offset-xs1>
          <v-text-field
            label="Mid. Init."
            v-model="applicant.midInitial">
          </v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs1>
          <v-text-field
            label="Applicant Last Name"
            v-model="applicant.lastName"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Applicant Social Security Number"
                v-model="applicant.ssn"
                mask="social"
                type="password"
                v-on="on"
              >
              </v-text-field>
            </template>
            <span>SSN ending in :  {{applicant.ssn.slice(-4)}}</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs6 offset-xs1>
          <v-select
            label="Relationship to Child(ren)"
            :items="relationshipItems"
            v-model="applicant.appRelation"
          >
          </v-select>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    applicantData: Object,
    relationshipItems: Array
  },
  data(){
    return{
      applicant: this.applicantData,
      showAppSsn: false
    }
  }
}
</script>

<style lang="css">
</style>
