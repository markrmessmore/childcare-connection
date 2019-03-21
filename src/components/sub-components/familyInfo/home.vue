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
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 class="grey lighten-4 pa-1">
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                :items="phoneTypes"
                v-model="familyInfo.phone1.type"
                label="Primary Phone Type:"
              ></v-select>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-text-field
                label="Primary Phone Number"
                mask="phone"
                v-model="familyInfo.phone1.num"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6 class="pa-1 num-box">
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                :items="phoneTypes"
                v-model="familyInfo.phone2.type"
                label="Secondary Phone Type:"
              ></v-select>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-text-field
                label="Secondary Phone Number"
                mask="phone"
                v-model="familyInfo.phone2.num"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs1>
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
      familyInfo: this.familyData,
      phoneTypes: ['Applicant Cell', 'Co-Applicant Cell', 'Home Phone']
    }
  },
  computed: {
    calcFamily(){
      return Number(this.familyInfo.numAdults) + Number(this.familyInfo.numKids)
    }
  }
}
</script>

<style lang="css" scoped>
.num-box {
  border: 1px solid grey;
}
</style>
