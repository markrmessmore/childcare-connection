<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Address"
            v-model="familyInfo.address"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Address 2"
            v-model="familyInfo.address2"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            label="City"
            v-model="familyInfo.city"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            label="State"
            v-model="familyInfo.state"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
            label="Zip"
            mask="#####"
            v-model="familyInfo.zip"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field
            mask="phone"
            label="Home Phone"
            v-model="familyInfo.homephone"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            mask="phone"
            label="Cell Phone"
            v-model="familyInfo.cellphone"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 offset-xs1>
          <v-text-field
            label="# of Adults in the Home"
            v-model="familyInfo.numAdults"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 offset-xs1>
          <v-text-field
            label="# of Kids in the Home"
            v-model="familyInfo.numKids"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
          label="Total # in Home"
          readonly
          v-model="calcFamily"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    familyData: Object
  },
  data(){
    return{
      familyInfo: this.familyData
    }
  },
  computed: {
    calcFamily(){
      let kids = this.familyInfo.children.length
      let app  = this.familyInfo.applicant.firstName ? 1 : 0
      let coapp= this.familyInfo.coapplicant.firstName ? 1: 0
      return (kids + app + coapp)
    }
  }
}
</script>

<style lang="css">
</style>
