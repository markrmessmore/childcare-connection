<template lang="html">
  <v-card flat>
    <hr>
    <v-card-title primary-title class="title">
      Applicant Information
    </v-card-title>
    <hr>
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
          <v-text-field
            label="Applicant Social Security Number"
            v-model="applicant.ssn"
            mask="social"
            type="password"
          >
          </v-text-field>
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
    <hr>
    <v-layout row wrap>
      <v-flex xs1>
        <slot name="prev"></slot>
      </v-flex>
      <v-flex xs1 offset-xs8>
        <slot name="skip"></slot>
      </v-flex>
      <v-flex xs1 offset-xs1>
        <slot name="next"></slot>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    applicantInfo: Object,
    relationshipItems: Array
  },
  data(){
    return{
      applicant: this.applicantInfo
    }
  }
}
</script>

<style lang="css" scoped>
</style>
