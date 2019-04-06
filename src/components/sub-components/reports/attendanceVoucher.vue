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
        <v-flex xs4 offset-xs2 class="text-xs-right grey lighten-3">
          NOT VALID IF RECEIVED AFTER:
        </v-flex>
        <v-flex xs2 class="grey lighten-3">
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/>
        </v-flex>
        <v-flex xs2 class="body-2 text-xs-right grey lighten-3">
          DATE ISSUED:
        </v-flex>
        <v-flex xs2 class="grey lighten-3">
          <maskedInput class="formbox text-xs-center" mask="11 / 11 / 1111"/>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="num-box mt-1 pa-1">
        {{record}}
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    allCases: Array
  },
  methods: {
  },
  computed: {
    getCases(){
      return this.allCases.filter(selected => {
        return selected.caseStatus[selected.caseStatus.length - 1].status == 'Approved' ||
               selected.caseStatus[selected.caseStatus.length - 1].status == 'Approved with Conditions' ||
               selected.caseStatus[selected.caseStatus.length - 1].status == 'Reactivated'
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
