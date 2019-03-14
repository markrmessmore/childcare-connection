<template lang="html">
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 class="ma-1">
          <v-text-field
            label="Applicant First Name"
            v-model="applicant.firstName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs1 class="ma-1">
          <v-text-field
            label="Mid. Init."
            v-model="applicant.midInitial">
          </v-text-field>
        </v-flex>
        <v-flex xs6 class="ma-1">
          <v-text-field
            label="Applicant Last Name"
            v-model="applicant.lastName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs5 class="ma-1">
          <v-text-field
            label="Applicant Social Security Number"
            v-model="applicant.ssn"
            mask="social"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs6 class="ma-1">
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
      applicant: this.applicantData
    }
  }
}
</script>

<style lang="css">
</style>
