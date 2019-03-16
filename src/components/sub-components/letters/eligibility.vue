<template lang="html">
  <v-container fluid>
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
          prefix="Date:"
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
      <v-flex xs12>
        Dear {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}},
        <br>
        <br>
        A review of your recent application for the <b><i>Mercer County Voucher Program</i></b> has been completed.  Your application is: <b>{{getStatus}}</b>
        <br>
        <br>
      </v-flex>
      <v-flex xs12 v-if="getStatus == 'WAITING LIST'">
        At this time, funding for this program is not available.  You will be placed on a waiting list and you will be contacted when additional funding becomes available.  Please contact Child Care Connection to update your application if your status changes in any way (ie:  address, home phone number, employment, family size, income).
      </v-flex>
      <v-flex xs12 v-if="getStatus == 'PENDING'">
        Your application has been determined ineligible for the following reason(s):
        <br>
        <br>
        <table>
          <tr valign="middle">
            <td width="5%"><v-checkbox value=""></v-checkbox></td>
            <td>Family income does not meet the annual income range for eligibility. The annual income range for eligibility is:<br>
              from: <input value="" type="text"></input></td>
          </tr>
        </table>
        Family income does not meet the annual income range for eligibility. The annual income range for eligibility is from"

        The annual income range for eligibility is fromto      
Your calculated annual income is:      

  Applicant is unemployed

  Co-applicant is unemployed

  Family does not reside in Mercer County

  Child is over eligible age

  Other:       
      </v-flex>
    </v-layout>
  </v-container>
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
    }
  }
}
</script>

<style lang="css">
</style>
