<template lang="html">
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 class="ma-1">
          <v-text-field
            label="Co-applicant First Name"
            v-model="coapplicant.firstName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs1 class="ma-1">
          <v-text-field
            label="Mid. Init."
            v-model="coapplicant.midInitial">
          </v-text-field>
        </v-flex>
        <v-flex xs6 class="ma-1">
          <v-text-field
            label="Co-applicant Last Name"
            v-model="coapplicant.lastName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs5 class="ma-1">
          <v-text-field
            label="Co-applicant Social Security Number"
            v-model="coapplicant.ssn"
            mask="social"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs6 class="ma-1">
          <v-select
            label="Relationship to Child(ren)"
            :items="relationshipItems"
            v-model="coapplicant.appRelation"
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
    coapplicantData: Object,
    relationshipItems: Array
  },
  data(){
    return{
      coapplicant: this.coapplicantData
    }
  }
}
</script>

<style lang="css">
</style>
