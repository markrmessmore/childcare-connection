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
      <v-layout row wrap align-center class="subheading grey lighten-3">
        <v-flex xs3 class="pl-1">
          ELIGIBILITY PERIOD:
        </v-flex>
        <v-flex xs2 offset-xs1 class="pb-1">
          <label class="body-1">From:</label>
          <input class="formbox text-xs-right" :value="formatDate(caseData.endDate)" readonly>
        </v-flex>
        <v-flex xs2 offset-xs1 class="pb-1">
          <label class="body-1">To:</label>
          <input class="formbox text-xs-right" :value="formatDate(caseData.endDate)" readonly>
        </v-flex>
        <v-flex xs2 offset-xs1 class="pb-1">
          <label class="body-1">Case ID:</label>
          <input class="formbox text-xs-right" v-model="caseData.caseId" readonly>
        </v-flex>
      </v-layout>
      <br>
      <v-card flat class="subheading">
        <v-layout row wrap class="secondary white--text subheading text-xs-center pl-1">
          PART A -	CHILD CARE PROVIDER INFORMATION
        </v-layout>
        <v-layout row wrap>
          <v-flex xs7>
            <label class="body-1">Provider Name:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.name" readonly>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <label class="body-1">Phone Number:</label>
            <input type="text" class="formbox pa-1 ma-0" :value="formatPhone(getProviderInfo.phone)" readonly>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="grey lighten-3">
          <v-flex xs7>
            <label class="body-1">Address Line 1:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.address" readonly>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <label class="body-1">City:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.city" readonly>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs7>
            <label class="body-1">Address Line 2:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.address2" readonly>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <label class="body-1">Zip:</label>
            <input class="formbox pa-1 ma-0" :value="getProviderInfo.zip" readonly>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="grey lighten-3">
          <v-flex xs6>
            <label class="body-1">Federal ID / Social Security Num:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.federalId" readonly>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <label class="body-1">License / Registration Num:</label>
            <input type="text" class="pa-1 ma-0 formbox" :value="getProviderInfo.licenseNum" readonly>
          </v-flex>
        </v-layout>
        <br>
        <div class="num-box">
          <v-layout row>
            <v-flex xs12>
              TYPE OF PROVIDER:
            </v-flex>
          </v-layout>
          <v-layout row align-center class="body-1">
            <v-flex xs1>
              <v-checkbox :input-value="provType('Licensed Center')"></v-checkbox>
            </v-flex>
            <v-flex xs3>
              Licenced Center
            </v-flex>
            <v-flex xs1>
              <v-checkbox :input-value="provType('Registered Family Child Care')"></v-checkbox>
            </v-flex>
            <v-flex xs3>
              Registered Family Child Care
            </v-flex>
            <v-flex xs1 offset-xs1>
              <v-checkbox :input-value="provType('Camp')"></v-checkbox>
            </v-flex>
            <v-flex xs2>
              Camp
            </v-flex>
          </v-layout>
        </v-layout>
        </div>
        <br>
        <v-layout row wrap class="num-box">
          <v-flex xs12>
            TYPE OF CARE (check all that apply):
          </v-flex>
          <v-divider inset></v-divider>
          <v-flex xs12 class="body-1">
            <v-layout row wrap>
              <v-flex xs1>
                <v-checkbox class="pa-0 ma-0" :input-value="careType('Full Day')"></v-checkbox>
              </v-flex>
              <v-flex xs11>
                Full-day Care @ 30 or more hours/week(maximum payment @ $200/month)
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1>
                <v-checkbox class="pa-0 ma-0" :input-value="careType('Before School')"></v-checkbox>
              </v-flex>
              <v-flex xs11>
                Before-School Care (maximum payment @ $75/month)
              </v-flex>
            </v-layout>
            <v-layout row class="pa-0 ma-0">
              <v-flex xs1>
                <v-checkbox class="pa-0 ma-0" :input-value="careType('After School')"></v-checkbox>
              </v-flex>
              <v-flex xs11>
                After-School Care (maximum payment @ $75/month)
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1>
                <v-checkbox class="pa-0 ma-0" :input-value="careType('Summer Camp')"></v-checkbox>
              </v-flex>
              <v-flex xs11>
                Summer Camp<br>(maximum payment @ $500/8 week session.  Payment is prorated @ $62.50/week for less than 8 weeks of camp.)
              </v-flex>
            </v-layout>
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
          <v-flex xs4>
            <label class="body-1">First Name:</label>
            <input type="text" class="pa-0 ma-0 formbox" readonly :value="getChildInfo.firstName">
          </v-flex>
          <v-flex xs2 offset-xs1>
            <label class="body-1">Middle Initial:</label>
            <input type="text" class="pa-0 ma-0 formbox" readonly :value="getChildInfo.midInitial">
          </v-flex>
          <v-flex xs4 offset-xs1>
            <label class="body-1">Last Name:</label>
            <input type="text" class="pa-0 ma-0 formbox" readonly :value="getChildInfo.firstName">
          </v-flex>
          <v-flex xs4>
            <label class="body-1">Date of Birth:</label>
            <input class="formbox text-xs-right" readonly :value="formatDate(getChildInfo.dob)" />
          </v-flex>
          <v-flex xs7 offset-xs1>
            <label class="body-1">Social Security Num:</label>
            <input class="formbox text-xs-right" readonly :value="formatSsn(getChildInfo.ssn)">
          </v-flex>
        </v-layout>
        <br>
        <div class="num-box">
          <v-layout column>
            <v-layout row wrap align-center class="grey lighten-3">
              <v-flex xs5>
                Period of Service:<br>
                <i class="body-1">(Not to exceed eligibility period)</i>
              </v-flex>
              <v-flex xs6 class="pl-3">
                Select One:
              </v-flex>
            </v-layout>
            <v-divider inset></v-divider>
            <v-layout row wrap align-center v-for="(prov, index) in getPos" :key="index" :class="getColor(index)">
              <v-flex xs2 class="pl-1">
                <label class="body-1">From:</label>
                <input class="formbox text-xs-right" :value="formatDate(prov.papaStart)" readonly>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <label class="body-1">To:</label>
                <input class="formbox text-xs-right" :value="formatDate(prov.papaEnd)" readonly>
              </v-flex>
              <v-flex xs6 class="body-1">
                <v-layout row align-center>
                  <v-checkbox class="pl-3" :input-value="checkPos('Full Day', prov.typeOfCare)"></v-checkbox>
                  <label class="body-1">Full-Day:</label>
                  <v-checkbox class="pl-3" :input-value="checkPos('Before School', prov.typeOfCare)"></v-checkbox>
                  <label class="body-1">Before School:</label>
                  <v-checkbox class="pl-3" :input-value="checkPos('After School', prov.typeOfCare)"></v-checkbox>
                  <label class="body-1">After School:</label>
                  <v-checkbox class="pl-3" :input-value="checkPos('Summer Camp', prov.typeOfCare)"></v-checkbox>
                  <label class="body-1">Summer Camp:</label>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-layout>
        </div>
        <br>
        <v-layout row wrap class="secondary white--text subheading pl-1">
          <v-flex xs12>
            CHILD CARE CONNECTION AUTORIZATION ONLY
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap>
          <v-flex xs4>
            <input type="text" class="pa-0 ma-0 formbox">
            <label class="body-1">Signature of CCC Staff:</label>
          </v-flex>
          <v-flex xs4 offset-xs1>
            <input type="text" class="pa-0 ma-0 formbox">
            <label class="body-1">Title:</label>
          </v-flex>
          <v-flex xs2 offset-xs1>
            <maskedInput class="formbox text-xs-right" mask="11 / 11 / 1111"/>
            <label class="body-1">Date:</label>
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap class="grey lighten-3 body-1 pl-1" align-center>
          <v-flex xs5>
            <u>Original</u>: Child Care Connection - Case File.
          </v-flex>
          <v-flex xs6 offset-xs1>
            <v-layout row wrap align-center class="text-xs-center">
              <v-flex xs2>
                <u>Copies</u>:
              </v-flex>
              <v-flex xs2 offset-xs1>
                <input type="text" class="pa-0 ma-0 formbox text-xs-center">
                <label class="body-1">Parent</label>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <input type="text" class="pa-0 ma-0 formbox text-xs-center">
                <label class="body-1">Provider</label>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <input type="text" class="pa-0 ma-0 formbox text-xs-center">
                <label class="body-1">Fiscal</label>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap class="secondary white--text subheading pl-1">
          <v-flex xs12>
            PART C - PARENT CERTIFICATION
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="body-1">
            <p>
              I understand that the subsidy I am eligible to receive is based on my income, family size, and the type of child care I select for my child.
            </p>
            <p>
              I understand that I must notify Child Care Connection of any change in family circumstances immediately but no later than ten (10) calendar days from the occurrence.
            </p>
            <p>
              I understand that I must notify Child Care Connection within 10 days of the child’s termination from our services.
            </p>
            <p>
              I understand that the subsidy amount is based on the current maximum monthly rates established by the Mercer County Department of Human Services for the Mercer County Child Care Voucher Program.
            </p>
            <p>
              I understand that the subsidy is available for a maximum of one year only and is strictly contingent upon continued availability of County funding.
            </p>
            <p>
              I understand that Child Care Connection is authorized to issue payment to only one child care provider each month and that payment is issued to providers on a quarterly basis.  I agree to complete the necessary documents on a timely basis, to ensure that the provider may receive payment.
            </p>
            <p>
              I agree to submit proof of continued eligibility when requested and to notify my child care provider and Child Care Connection of any changes in my child care arrangements.
            </p>
            <p>
              I understand that my period of service for this program will begin with the completion of this agreement by Child Care Connection on the date indicated in Part B and shall not exceed the end of my family’s eligibility period.
            </p>
            <p>
              I certify that I am not receiving any other public subsidy for the provision of child care services.
            </p>
            <p>
              I understand that I am responsible for all child care costs incurred which exceed the subsidized amount.
            </p>
            <span class="html2pdf__page-break" />
            <p>
              I have read this Agreement for receipt of a child care subsidy and understand that failure to comply with the terms of this Agreement may result in the termination of my subsidy.  I have received a copy of this Agreement and I understand that the authorized/executed PAPA constitutes the full terms of this agreement.  I have been informed of my rights to file a complaint and/or request an administrative review by the Child Care Connection or with the Mercer County Department of Human Services.
            </p>
            <v-layout row wrap>
              <v-flex xs4>
                <input type="text" class="pa-0 ma-0 formbox">
                <label class="body-1">Parent/Applicant Name (Print):</label>
              </v-flex>
              <v-flex xs4 offset-xs1>
                <input type="text" class="pa-0 ma-0 formbox">
                <label class="body-1">Parent/Applicant Signature:</label>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <maskedInput class="formbox text-xs-right" mask="11 / 11 / 1111"/>
                <label class="body-1">Date:</label>
              </v-flex>
            </v-layout>
            <br>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="secondary white--text subheading pl-1">
          <v-flex xs12>
            PART D - PROVIDER CERTIFICATION
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="body-1">
            <p>
              I hereby certify and agree to accept the above named child for whom Child Care Connection will pay a subsidy for child care services based upon the current maximum monthly rates established by the Mercer County Department of Human Services for the Mercer County Child Care Voucher Program.
            </p>
            <p>
              I certify that I have informed the parent of my policy to ensure parental access while the eligible child is in my care.
            </p>
            <p>
              I certify that I am not receiving any other public subsidy for the provision of child care services to the named child.
            </p>
            <p>
              I understand the payment will be made quarterly and that I am responsible for the timely submittal of quarterly attendance vouchers which shall serve as a bill for service and document attendance for the child care services rendered.  I agree that the vouchers will be submitted to Child Care Connection by the 15th day of the month following the end of the quarter to be paid.
            </p>
            <p>
              I understand that the child care costs incurred which exceed the subsidized amount are the responsibility of the applicant(s) and are to be paid directly to me.
            </p>
            <p>
              I understand that I must notify Child Care Connection within 10 days of the child’s termination from our services.
            </p>
            <p>
              In accepting County funds, I agree to comply with the Americans with Disabilities Act (ADA) and the New Jersey Law against Discrimination (LAD).
            </p>
            <p>
              I understand that failure to comply with the laws, rules and regulations above shall be grounds for Termination of this Agreement for cause.
            </p>
            <p>
              I have read the Agreement and understand and accept the terms stated.  I understand that failure to comply with the terms of this Agreement may result in delayed payment or nonpayment for services rendered.
            </p>
          </v-flex>
          <v-layout row wrap align-center>
            <v-flex xs4>
              <input type="text" class="pa-0 ma-0 formbox">
              <label class="body-1">Name of Provider/Care Center (Print):</label>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <input type="text" class="pa-0 ma-0 formbox">
              <label class="body-1">Provider/Authorized Staff (Signature):</label>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <maskedInput class="formbox text-xs-right" mask="11 / 11 / 1111"/>
              <label class="body-1">Date: </label>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    caseData    : Object,
    providerData: Object,
    eligDates   : String,
  },
  data(){
    return {
      familyInfo: this.caseData.familyInfo,
      day: "",
      year: ""
    }
  },
  methods: {
    careType(val){
      if (this.providerData.typeOfCare.includes(val)) {
        return true
      }
      else {
        return false
      }
    },
    checkPos(cur, prov){
      if (prov.includes(cur)){
        return true
      }
      else {
        return false
      }
    },
    getColor(i){
      if (i%2 == 0){
        return
      }
      else {
        return 'grey lighten-3'
      }
    },
    provType(val){
      if (this.getProviderInfo.typeOfProvider.includes(val)) {
        return true
      }
      else {
        return false
      }
    }
  },
  computed: {
    getChildInfo(){
      return this.familyInfo.children.find(kid => {
        let name = kid.firstName + " " + kid.lastName
        return name == this.providerData.forChild
      })
    },
    getPos(){
      return this.caseData.providers.filter(prov => {
        let name = this.getChildInfo.firstName + " " + this.getChildInfo.lastName
        return prov.forChild == name && prov.name == this.getProviderInfo.name
      })
    },
    getProviderInfo(){
      return this.$store.getters.getProviders.find(prov => {
        return prov.name == this.providerData.name
      })
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
</style>
