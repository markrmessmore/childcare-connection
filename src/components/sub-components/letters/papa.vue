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
      <v-layout row wrap align-center class="subheading">
        <v-flex xs1>
          ELIGIBILITY PERIOD:
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            prefix="From:"
            mask="##/##/####"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            prefix="To:"
            mask="##/##/####"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <v-text-field
            prefix="Case ID:  "
            readonly
            v-model="caseData.caseId"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-card flat class="subheading">
        <v-layout row wrap class="secondary white--text subheading text-xs-center pl-1">
          PART A -	CHILD CARE PROVIDER INFORMATION
        </v-layout>
        <br>
        <v-layout row wrap>
          <v-flex xs7>
            <label class="body-1">Provider Name:</label>
            <input type="text" class="pa-0 ma-0 formbox">
          </v-flex>
          <v-flex xs4 offset-xs1>
            <label class="body-1">Phone Number:</label>
            <input type="text" class="pa-0 ma-0 formbox" mask="phone">
            <!-- <v-text-field class="pa-0 ma-0" label="Phone:" mask="phone"></v-text-field> -->
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs7>
            <v-text-field label="Address Line 1:" class="pt-2"></v-text-field>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <v-text-field label="City:" class="pa-0 ma-0" ></v-text-field>
          </v-flex>
          <v-flex xs7>
            <v-text-field class="pa-0 ma-0" height="50%" label="Address Line 2:" ></v-text-field>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <v-text-field
              label="Zip"
              mask="#####"
              class="pa-0 ma-0"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field label="Federal ID/Social Security Num:" class="pa-0 ma-0"></v-text-field>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-text-field label="License/Registration #:" class="pa-0 ma-0"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="num-box">
          <v-flex xs12>
            TYPE OF PROVIDER:
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Licensed Center" class="pa-0 ma-0"></v-checkbox>
          </v-flex>
          <v-flex xs5>
            <v-checkbox label="Registered Family Child Care" class="pa-0 ma-0"></v-checkbox>
          </v-flex>
          <v-flex xs4>
            <v-checkbox label="Camp" class="pa-0 ma-0"></v-checkbox>
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap class="num-box">
          <v-flex xs12>
            TYPE OF CARE (check all that apply):
          </v-flex>
          <v-flex xs12>
            <v-checkbox label="Full-day Care @ 30 or more hours/week(maximum payment @ $200/month)" class="pa-0 ma-0"></v-checkbox>
            <v-checkbox label="Before-School Care (maximum payment @ $__________/month)" class="pa-0 ma-0"></v-checkbox>
            <v-checkbox label="After-School Care (maximum payment @ $__________/month)" class="pa-0 ma-0"></v-checkbox>
            <v-checkbox label="Summer Camp (maximum payment @ $__________/8 week session.  Payment is prorated @  				    $__________/week for less than 8 weeks of camp." class="pa-0 ma-0"></v-checkbox>
          </v-flex>
          </v-layout>
      </v-card>
      <br class="html2pdf__page-break">
      <v-card flat class="subheading">
        <v-layout row wrap class="secondary white--text subheading text-xs-center pl-1">
          PART B -	CHILD INFORMATION
        </v-layout>
        <br>
        <v-layout row wrap>
          <v-flex xs8>
            <v-text-field
              label="First Name:"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field
              label="Middle Initial"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>

        </v-layout>
      </v-card>
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

<style lang="css" scoped>

.formbox {
  width: 100%;
  border-style: solid;
  border-color: #BDBDBD;
  border-width: 0px 0px 1px 0px;
}
.num-box {
  border: 1px solid grey;
}
.fixfont {
  font-variant-ligatures: no-common-ligatures;
}
</style>
