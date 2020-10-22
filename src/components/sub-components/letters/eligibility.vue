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
          ELIGIBILITY NOTIFICATION
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs4 class="body-1">
          Child Care Connection<br>
          1001 Spruce Street, Suite 201<br>
          Trenton, NJ 08638<br>
          609-989-7889
        </v-flex>
        <v-flex xs3 offset-xs1 class="text-xs-left">
          <v-text-field
            prefix="Date:  "
            v-model="getDate"
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
            v-if="getStatus !== 'ACCEPTED'"
            prefix="Nware:"
            value=""
          ></v-text-field>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 class="subheading">
          Dear {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}},
          <br>
          <br>
          A review of your recent application for the <b><i>Mercer County Voucher Program</i></b> has been completed.  Your application is: <b>{{getStatus}}</b>
          <br>
          <br>
        </v-flex>
        <!-- ACCEPTED -->
        <v-flex xs12 v-if="getStatus == 'ACCEPTED'" class="subheading">
          Your application has been approved for the receipt of a subsidy through the Mercer County Child Care Voucher Program. The eligibility period for this program is for one year only beginning on <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/> and ending on <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/> as long as funding continues to be available.
          <br>
          <br>
          Please select your child care provider. Both you and your child care provider must complete and sign the attached PARENT/APPLICANT/PROVIDER AGREEMENT(s) (PAPAs). The completed PAPA form(s) must be received by Child Care Connection by
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/> in order for payment to begin on
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/>.
          <br>
          <br>
          Failure to return the PARENT/APPLICANT/PROVIDER AGREEMENT(s) (PAPAs) by <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/> will result in termination of your case.
        </v-flex>
        <!-- PENDING -->
        <v-flex xs12 v-if="getStatus == 'PENDING'">
          <div class="pl-1 subheading">
            The final determination of your application is being held in pending status because the following were not submitted:
          </div>
          <table valign="middle" class="body-1">
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                <u>Original</u> pay stubs for four consecutive weeks.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                <v-layout row wrap>
                  <v-flex xs12>
                    Verification of training or education program (<b>original</b> school schedule or <b>original</b> letter signed/dated by school official stating hours per week and or credit hours.)
                  </v-flex>
                </v-layout>
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Copy of the first page of the most recent Federal Tax Form 1040.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                <v-layout row align-center>
                  <v-flex xs3>
                    Birth Certificate for:
                  </v-flex>
                  <v-flex xs3 offset-xs1>
                    <v-checkbox label="Parent" value=""></v-checkbox>
                  </v-flex>
                  <v-flex xs3 offset-xs1>
                    <v-checkbox label="Child(ren)" value=""></v-checkbox>
                  </v-flex>
                </v-layout>
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td>
                <v-text-field prefix="Other:" class="pl-1 body-1"></v-text-field>
              </td>
            </tr>
          </table>
          <br>
          These materials must be submitted to Child Care Connection by <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/>. If these materials are not received by this date, and you have not contacted the agency for an extension, your application will be invalid.
        </v-flex>
        <!-- WAITING LIST -->
        <v-flex xs12 v-if="getStatus == 'WAITING LIST'" class="subheading">
          At this time, funding for this program is not available.  You will be placed on a waiting list and you will be contacted when additional funding becomes available.  Please contact Child Care Connection to update your application if your status changes in any way (ie:  address, home phone number, employment, family size, income).
        </v-flex>
        <!-- INELIGIBLE -->
        <v-flex xs12 v-if="getStatus == 'INELIGIBLE'" class="subheading">
          Your application has been determined ineligible for the following reason(s):
          <br>
          <br>
          <table valign="middle" class="subheading">
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Family income does not meet the annual income range for eligibility. The annual income range for eligibility is from: <input size="15" value="" type="text" class="myInput"></input> to: <input size="15" value="" type="text" class="myInput"></input>. Your calculated annual income is:  $<input size="15" :value="getTotal" type="text" class="myInput"></input>
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Applicant is unemployed.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Co-applicant is unemployed.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Family does not reside in Mercer County.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td class="pl-1">
                Child is over eligible age.
              </td>
            </tr>
            <tr>
              <td width="5%">
                <v-checkbox value=""></v-checkbox>
              </td>
              <td>
                <v-text-field prefix="Other:" class="pl-1"></v-text-field>
              </td>
            </tr>
          </table>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row>
        <v-flex xs12 class="subheading">
          You may contact Child Care Connection at (609) 989-7889 for further information.
          <br>
          <br>
          Sincerely,
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs7 class="title">
          Child Care Connection Subsidy Unit
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="getStatus == 'PENDING'">
        <v-flex xs5 offset-xs7>
          <v-card color="secondary" dark text>
            <v-card-text class="body-1">
              Please return a copy of this page with all required documentas and communication you submit regarding your application.
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    caseData: Object,
    printType: String
  },
  data(){
    return{
      acceptedDueDate: "",
      checkboxes: [],
      date      : "",
      familyInfo: this.caseData.familyInfo,
      Nware     : "",
      subtitle  : "",

    }
  },
  methods: {
  },
  computed: {
    getDate(){
      return moment().format('MM/DD/YYYY')
    },
    getStatus(){
      let status = this.printType.split("-")[1]
      if (status == "accepted"){
        return "ACCEPTED"
      }
      else if (status == "pending"){
        return "PENDING"
      }
      else if (status == "ineligible"){
        return "INELIGIBLE"
      }
      else if (status == "waiting"){
        return "WAITING LIST"
      }
    },
    getTotal(){
      let grandTotal = 0
      let app = this.familyInfo.applicant.income
      let coapp = this.familyInfo.coapplicant.income
      if (app){
        app.forEach(item => {
          grandTotal = grandTotal + Number(item.total)
        })
      }
      if (coapp){
        coapp.forEach(item => {
          grandTotal = grandTotal + Number(item.total)
        })
      }
      return grandTotal.toFixed(2)
    }
  }
}
</script>

<style lang="css" scoped>

  table {
    border-collapse: collapse;
  }

  table, th, td {
    border: 1px solid black;
    line-height: normal;
  }

  .mycheckboxes{
    display: inline-block;
  }

  .myInput {
    border: 0;
    outline: 0;
    border-bottom: 1px solid black;
  }
</style>
