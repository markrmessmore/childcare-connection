<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              label="Applicant First Name"
              v-model="applicant.firstName"
              :rules="[checkField.required, checkField.length]"
              @blur="checkReady()"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs1 offset-xs1>
            <v-text-field
              label="Mid. Init."
              v-model="applicant.midInitial"
              :rules="[checkField.required]"
              @blur="checkReady()"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-text-field
              label="Applicant Last Name"
              v-model="applicant.lastName"
              :rules="[checkField.required, checkField.length]"
              @blur="checkReady()"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs5>
            <!-- IF THE CASE IS NEW IT WILL HAVE THE ID OF 1111 OTHERWISE IT WILL NOT. THIS IMPACTS IF THE SSN IS DISPLAYABLE OR JUST CAN BE REFERENCED BY THE LAST FOUR -->
            <v-text-field
              v-if="caseId == 1111"
              label="Applicant Social Security Number"
              v-model="applicant.ssn"
              mask="social"
              :type="showAppSsn? 'password' : 'text'"
              :rules="[checkField.required, checkField.ssn]"
              :append-icon="showAppSsn ? 'far fa-eye-slash' : 'far fa-eye'"
              @click:append="showAppSsn = !showAppSsn"
              @blur="checkReady()"
            >
            </v-text-field>
            <!-- THIS IS FOR VIEWING/EDITING A CASE -->
            <v-tooltip top v-else>
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Applicant Social Security Number"
                  v-model="applicant.ssn"
                  mask="social"
                  type="password"
                  :rules="[checkField.required, checkField.ssn]"
                  v-on="on"
                  @blur="checkReady()"
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
              :rules="[checkField.required]"
              @change="checkReady()"
            >
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2 offset-xs10 class="text-xs-right">
            <slot name="next" v-bind:checkActive="readyToSubmit"></slot>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions }      from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    caseId            : Number,
    applicantData     : Object,
    relationshipItems : Array
  },
  data(){
    return{
      applicant     : this.applicantData,
      readyToSubmit : false,
      showAppSsn    : true
    }
  },
  methods: {
    checkReady(){
      this.readyToSubmit = this.$refs.form.validate()
    }
  }
}
</script>

<style lang="css">
</style>
