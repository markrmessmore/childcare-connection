<template lang="html">
  <v-card>
    <v-card-text>
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-img :src="require('@/assets/mercerBW.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
        <v-flex xs9 class="text-xs-center title">
          MERCER COUNTY CHILD CARE VOUCHER PROGRAM
          <br>
          <span class="subheading">PARENT/APPLICANT/PROVIDER AGREEMENT (PAPA)</span>
          <br>
        </v-flex>
        <v-flex xs9 offset-xs3 class="secondary white--text title text-xs-center">
          RETURN ON OR BY:
            <input size="2" :value="day" type="text" class="myInput pl-1 pr-1 text-xs-right" autocomplete="off"></input>
            /15/
            <input size="4" :value="year" type="text" class="myInput pl-1 pr-1" autocomplete="off"></input>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4 class="body-1">
          <b>RETURN TO:</b><br>
          Child Care Connection<br>
          1001 Spruce Street, Suite 201<br>
          Trenton, NJ 08638<br>
          609-989-7889
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12>
          I <u> {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}} </u>, hereby agree to receive a subsidy for child care services under the Mercer County Child Care Voucher Program.  I authorize the agency indicated above to make child care payments for child care services rendered to the child named below in this document.  These payments will be made upon receipt of completed attendance vouchers at the end of each quarter directly to the child care provider
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12>
          ELIGIBILITY PERIOD:  From:___________ To:__________________
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 class="subheading text-xs-center">PART A -	CHILD CARE PROVIDER INFORMATION</v-flex>
        <br>
        <br>
        <v-flex xs6>
          <v-text-field label="Provider Name:" ></v-text-field>
          <v-text-field label="Address Line 1:" ></v-text-field>
          <v-text-field label="Address Line 2:" ></v-text-field>
          <v-text-field label="City/State/Zip:" ></v-text-field>
          </v-flex>
        <v-flex xs6>
          Federal ID/Social Security #:  __ __ __ - __ __ - __ __ __ __<br>
          License/Registration #:  _______________________________<br>
          Telephone#:  _______________________________<br>
        </v-flex>
      </v-layout>
      <v-layout>


      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    caseData: Object,
  },
  data(){
    return {
      familyInfo: this.caseData.familyInfo,
      day: "",
      year: ""
    }
  }
}
</script>

<style lang="css">
</style>
