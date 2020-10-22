<template lang="html">
  <v-card text>
    <!-- REPORT HEADER -->
      <v-layout row wrap align-center justify-center>
        <v-flex xs2>
          <v-img :src="require('@/assets/ccc-logo-black.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
        <v-flex xs8>
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center title">
              Mercer County Child Care Voucher Program
            </v-flex>
            <v-flex xs12 class="body-1 text-xs-center grey lighten-3">
              <b>Report Date:</b> {{reportDate()}}
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center class="body-1">
            <v-flex xs3>
              Report Prepared By:
            </v-flex>
            <v-flex xs3>
              <input type="text" class="formbox pl-1">
            </v-flex>
            <v-flex xs2 class="text-xs-right">
              Title:
            </v-flex>
            <v-flex xs4>
              <input type="text" class="formbox pl-1">
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3>
              Period Covered:
            </v-flex>
            <v-flex xs3>
              <input type="text" class="formbox pl-1" value="">
            </v-flex>
            <v-flex xs2 class="text-xs-right">
              Agency:
            </v-flex>
            <v-flex xs4>
              <input type="text" class="formbox pl-1" value="Child Care Connection">
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <v-img :src="require('@/assets/mercerBW.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
      </v-layout>
      <!-- BEGIN REPORT BODY -->
      <v-layout row wrap>
        <v-flex xs2>

        </v-flex>
        <v-flex xs8>
          <v-layout row wrap>
            <v-flex xs1>
              Jan
            </v-flex>
            <v-flex xs1>
              Jan
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>

        </v-flex>
      </v-layout>
      {{parseCases}}
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {

  },
  methods: {
    reportDate(){
      return moment().format('MM/DD/YYYY')
    }
  },
  computed: {
    parseCases(){
      let allCases = this.$store.getters.getCases
      allCases.forEach(rec => {
        rec.caseStatus.forEach(stat => {
          console.log(stat)
        })
      })
      return 1
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
</style>
