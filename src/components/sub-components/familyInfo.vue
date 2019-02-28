<template lang="html">
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex xs5>
          <v-text-field
            name="Applicant Name"
            label="Applicant Name"
            v-model="applicantName"
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs1>
          <v-text-field
            name="Co-applicant Name"
            label="Co-applicant Name"
            v-model="coapplicantName"
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="password"
            label="password"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 offset-xs10>
          <v-btn color="primary" @click="saveData()">Save</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      applicantName: "",
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
      },
      show1: false,
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* ADD PROP TO RECEIVE DATA (AS AN OBJECT) REGARDING FAMILY INFORMATION
* ADD PERTINENT FIELDS INCLUDING THE ABILITY TO ADD CHILDREN AS NEEDED
-->
