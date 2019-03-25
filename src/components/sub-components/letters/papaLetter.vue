<template lang="html">
  <v-card>
    <v-card-text class="body-1">
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-img :src="require('@/assets/mercerBW.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs4 class="body-1">
          Child Care Connection<br>
          1001 Spruce Street, Suite 201<br>
          Trenton, NJ 08638<br>
          (609) 989-7889
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs4 class="body-1">
          {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}}<br>
          {{familyInfo.address}}<br>
          <span v-if="familyInfo.address2">{{familyInfo.address2}}<br></span>
          {{familyInfo.city}}, NJ {{familyInfo.zip}}<br>
          {{getPhone}}
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12>
          <p>
            Dear {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}}:
          </p>
          <p>
            Enclosed you will find the final Parent/Applicant/Provider Agreement(s) (PAPA) for your child(ren). The PAPAs are the first step in moving forward with payment to your chosen child care provider.
          </p>
          <p>
            A copy of each PAPA has been forwarded to your provider(s) and our fiscal unit. The staff of the fiscal unit will prepare and mail a monthly attendance voucher to your child care provider. In order for Child Care Connection to issue payment, the attendance voucher must be completed, signed and dated by your provider.
          </p>
          <p>
            Once that is done, you must sign and date the voucher certifying that the attendance is correct and authorizing Child Care Connection to make payment on your behalf for the services that have been provided. The completed and
            signed attendance voucher must be submitted for payment by the 15 th day of the month in order for payment to be issued by Child Care Connection.
          </p>
          <p>
            We are happy to have this opportunity to provide these services to you and other eligible families in Mercer County. Should you have any questions or require further assistance regarding the Mercer County Child Care Voucher Program,
            please feel free to call us at (609) 989-7889.
          </p>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs6>
          <p>
            Sincerely,
          </p>
          <br>
          <p class="subheading">
            Child Care Voucher Subsidy Programs
          </p>
          <br>
          <p>
            Cc:
          </p>
        </v-flex>
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
    }
  },
  computed: {
    getPhone(){
      let phone = this.familyInfo.phone1.num
      let areaCode  = phone.slice(0,3)
      let nxx       = phone.slice(3,6)
      let ext       = phone.slice(-4)
      return `(${areaCode}) ${nxx}-${ext}`
    }
  }
}
</script>

<style lang="css">
</style>
