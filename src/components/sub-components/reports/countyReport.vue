<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-layout row wrap align-center justify-center>
        <v-flex xs3>
          <v-img :src="require('@/assets/ccc-logo-black.png')" height="100px" width="auto" contain></v-img>
        </v-flex>
        <v-flex xs9>
          <v-layout row wrap class="subheading">
            <v-flex xs12 class="text-xs-center">
              Mercer County Child Care Voucher Program
            </v-flex>
            <v-flex xs2>
              Report Prepared By:
            </v-flex>
            <v-flex xs3>
              <input type="text" class="formbox">
            </v-flex>
            <v-flex xs2 offset-xs1 class="text-xs-right">
              Title:
            </v-flex>
            <v-flex xs3>
              <input type="text" class="formbox">
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
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
