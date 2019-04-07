<template lang="html">
  <v-card flat>
    <v-card-text v-for="(record, i) in getCases" :key="i">
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-img :src="require('@/assets/mercerBW.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
        <v-flex xs9 class="text-xs-center title">
          MERCER COUNTY CHILD CARE VOUCHER PROGRAM
          <br>
          <span class="subheading">ATTENDANCE VOUCHER</span>
        </v-flex>
        <v-flex xs4 offset-xs2 class="body-2 text-xs-right grey lighten-3">
          NOT VALID IF RECEIVED AFTER:
        </v-flex>
        <v-flex xs2 class="grey lighten-3">
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111" v-model="dueDate" />
        </v-flex>
        <v-flex xs2 class="body-2 text-xs-right grey lighten-3">
          DATE ISSUED:
        </v-flex>
        <v-flex xs2 class="grey lighten-3">
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111" v-model="issuedDate" />
        </v-flex>
      </v-layout>
      <div class="num-box mt-1">
        <v-layout row wrap align-center>
          <v-flex xs4 class="body-1">
            <label class="body-2">Parent Name: </label>
            <u>{{record.familyInfo.applicant.firstName}} {{record.familyInfo.applicant.lastName}}</u>
          </v-flex>
          <v-flex xs4 class="body-1">
            <label class="body-2">Child Name: </label>
            <u>{{record.provider.forChild}}</u>
          </v-flex>
          <v-flex xs2 class="body-1">
            <label class="body-2">Case Id: </label>
            <u>{{record.caseId}}</u>
          </v-flex>
          <v-flex xs2 class="body-1">
            <label class="body-2">Child Id: </label>
            <u>{{getChildId(record.familyInfo.children, record.provider.forChild)}}</u>
          </v-flex>
        </v-layout>
        <v-layout row align-center class="body-1">
          <v-flex xs12>
            <v-layout row wrap align-center>
              <label class="pr-2 body-2">Program Component:</label>
              Full-Day:
              <v-checkbox :input-value="checkPos('Full Day', record.provider.typeOfCare)"></v-checkbox>
              Before School:
              <v-checkbox :input-value="checkPos('Before School', record.provider.typeOfCare)"></v-checkbox>
              After School:
              <v-checkbox :input-value="checkPos('After School', record.provider.typeOfCare)"></v-checkbox>
              Summer Camp:
              <v-checkbox :input-value="checkPos('Summer Camp', record.provider.typeOfCare)"></v-checkbox>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2>
            <v-layout column class="body-2">
              Provider Name:<br>
              Provider Address:<br>
              <br v-if="getProviderData(record.provider.name)[0].address2 ? getProviderData(record.provider.name)[0].address2 : ''">
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-layout column class="body-1">
              {{getProviderData(record.provider.name)[0].name}}<br>
              {{getProviderData(record.provider.name)[0].address}}<br>
              {{getProviderData(record.provider.name)[0].address2 ? getProviderData(record.provider.name)[0].address2 : ""}}
              <br v-if="getProviderData(record.provider.name)[0].address2 ? getProviderData(record.provider.name)[0].address2 : ''">
              {{getProviderData(record.provider.name)[0].city}}, NJ {{getProviderData(record.provider.name)[0].zip}}<br>
            </v-layout>
          </v-flex>
          <v-flex xs2 class="body-2">
            <v-layout column>
              Provider Phone:<br>
              Provider Number:
            </v-layout>
          </v-flex>
          <v-flex xs2 class="body-1">
            <v-layout column>
              {{formatPhone(getProviderData(record.provider.name)[0].phone)}}<br>
              {{getProviderData(record.provider.name)[0].licenseNum}}<br>
            </v-layout>
          </v-flex>
          <v-flex xs3 class="grey">
            <v-layout column class="body-2">
              Period of Service:
              <br>
              From: <span style="display: inline">{{formatDate(record.provider.papaStart)}}</span>
              <br>
              To: {{formatDate(record.provider.papaEnd)}}
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    allCases: Array
  },
  data(){
    return{
      dueDate   : "",
      issuedDate: ""
    }
  },
  methods: {
    checkPos(type, prov){
      if (prov.includes(type)){
        return true
      }
      else {
        return false
      }
    },
    getChildId(kids, selectedKid){
      let kidData = kids.filter(child => {
        let name = `${child.firstName} ${child.lastName}`
        return name == selectedKid
      })
      return kidData[0].childId
    },
    getProviderData(provName){
      let allProv = this.$store.getters.getProviders
      return allProv.filter(prov => {
        return prov.name == provName
      })
    }
  },
  computed: {
    getCases(){
      let vouchers = []
      let activeCases = this.allCases.filter(selected => {
        return selected.caseStatus[selected.caseStatus.length - 1].status == 'Approved' ||
               selected.caseStatus[selected.caseStatus.length - 1].status == 'Approved with Conditions' ||
               selected.caseStatus[selected.caseStatus.length - 1].status == 'Reactivated'
      })
      activeCases.forEach(act => {
        act.providers.forEach(prov => {
          let reportData = {
            activeDate  : act.activeDate,
            caseId      : act.caseId,
            endDate     : act.endDate,
            familyInfo  : act.familyInfo,
            provider    : prov
          }
          vouchers.push(reportData)
        })
      })
      return vouchers
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
