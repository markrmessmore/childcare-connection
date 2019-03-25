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
        <v-flex xs4>
          Child Care Connection<br>
          1001 Spruce Street, Suite 201<br>
          Trenton, NJ 08638<br>
          (609) 989-7889
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs4>
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
            As of <v-text-field value="" class="myDateInput " mask="##/##/####"></v-text-field> the following action will occur for the child(ren) identified:
            <v-select :items="getKids" class="body-1"></v-select>
          </p>
          <p>
            Your subsidy case under Mercer County Child Care Voucher Program is terminated for the following reason(s):
            <br>
            <table valign="middle">
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td class="pl-1">
                  Your family’s current eligibility period expires on <v-text-field value="" class="myDateInput" mask="##/##/####"></v-text-field> You will be eligible to apply again on <v-text-field value="" class="myDateInput" mask="##/##/####"></v-text-field>.
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  Failure to submit required paperwork
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  Non-use of subsidy
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  No longer reside in Mercer County
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  Child(ren) beyond the age of eligibility
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  Your family is receiving other public subsidy
                </td>
              </tr>
              <tr>
                <td width="5%">
                  <v-checkbox value=""></v-checkbox>
                </td>
                <td>
                  <v-text-field value="" prefix="Other:"></v-text-field>
                </td>
              </tr>
            </table>
            <p>
              Additional Comments:
              <v-textarea value="" row-height="12" no-resize rows="2"></v-textarea>
            </p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          If you are not in agreement with the action (s) taken you have the right to request a review.  Should you have any questions or require further assistance regarding the Mercer County Child Care Voucher Program, please feel free to call us at 609-989-7889.
        </v-flex>
        <br>
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
            Cc: <b>Case File</b>
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
    getKids(){
      let kidList = []
      this.familyInfo.children.forEach(kid => {
        let name = `${kid.firstName} ${kid.lastName}`
        kidList.push(name)
      })
      return kidList
    },
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

table {
  border-collapse: collapse;
}

table tr td {
  line-height: 5px;
}

.myDateInput {
  display: inline-block;
  height: 15px
}
</style>
