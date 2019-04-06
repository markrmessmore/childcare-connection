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
      <v-layout row wrap class="num-box mt-1 pa-1" align-center>
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
        <v-flex xs12>
          <v-layout row align-center justify-center class="body-2">
            Program Component:
            <v-flex xs1>
              <v-checkbox class="alterbox" :input-value="checkPos('Full Day', record.provider.typeOfCare)"></v-checkbox>
            </v-flex>
            <v-flex xs1>
              <label class="body-1">Full-Day:</label>
            </v-flex>
            <label >Before School:</label>
            <v-checkbox class="pa-0" :input-value="checkPos('Before School', record.provider.typeOfCare)"></v-checkbox>
            <label class="body-1">After School:</label>
            <v-checkbox class="pa-0" :input-value="checkPos('After School', record.provider.typeOfCare)"></v-checkbox>
            <label class="body-1">Summer Camp:</label>
            <v-checkbox class="pa-0" :input-value="checkPos('Summer Camp', record.provider.typeOfCare)"></v-checkbox>
          </v-layout>
        </v-flex>
        <v-flex xs5>
          <label class="body-2">Period of Service: </label>
          <v-layout row class="body-1">
            <v-flex xs5>
              From: <u>{{formatDate(record.provider.papaStart)}}</u>
            </v-flex>
            <v-flex xs6>
              To: <u>{{formatDate(record.provider.papaEnd)}}</u>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
    formatDate(dateStr){
      let month = dateStr.slice(0,2)
      let day   = dateStr.slice(2,4)
      let year  = dateStr.slice(4,8)
      return `${month}/${day}/${year}`
    },
    getChildId(kids, selectedKid){
      let kidData = kids.filter(child => {
        let name = `${child.firstName} ${child.lastName}`
        return name == selectedKid
      })
      return kidData[0].childId
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
.alterbox {
  padding: 0 0 -10px 0;
}
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
