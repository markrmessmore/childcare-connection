<template lang="html">
  <v-card text>
    <hr>
    <v-card-title primary-title class="title">
      Co-Applicant Information
      <br>
      <div class="body-1">(if applicable)</div>
    </v-card-title>
    <hr>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field
            label="Co-Applicant First Name"
            v-model="coapplicant.firstName"
            >
          </v-text-field>
        </v-flex>
        <v-flex xs1 offset-xs1>
          <v-text-field
            label="Mid. Init."
            v-model="coapplicant.midInitial">
          </v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs1>
          <v-text-field
            label="Co-Applicant Last Name"
            v-model="coapplicant.lastName"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            label="Co-Applicant Social Security Number"
            v-model="coapplicant.ssn"
            mask="social"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs1>
          <v-select
            label="Co-Relationship to Child(ren)"
            :items="relationshipItems"
            v-model="coapplicant.appRelation"
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
    coapplicantInfo: Object,
    relationshipItems: Array
  },
  data(){
    return{
      coapplicant: this.coapplicantInfo
    }
  },
  methods: {
    next(){
      this.$emit('next')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
