<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap align-center>
      <v-flex xs3>
        <v-img :src="require('@/assets/mercerBW.png')" height="100px" width="auto" contain></v-img>
      </v-flex>
      <v-flex class="subheading text-xs-center">
        MERCER COUNTY CHILD CARE VOUCHER PROGRAM
        <br>
        {{subtitle}}
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs3 class="body-1">
        Child Care Connection<br>
        1001 Spruce Street, Suite 201<br>
        Trenton, NJ 08638<br>
        609-989-7889
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs3 class="subheading">
        Dear {{familyInfo.applicant.firstName}} {{familyInfo.applicant.lastName}},
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    caseData: Object,
    printType: String
  },
  data(){
    return{
      subtitle  : "",
      date      : "",
      Nware     : "",
      familyInfo: this.caseData.familyInfo

    }
  },
  methods: {
    triggerData(){
      console.log(this.caseData)
      if (this.printType.startsWith('letter')){
        let now = new Date().toString().split(" ")
        this.subtitle = "Letter"
        this.date = `${now[1]}/${now[2]}/${now[3]}`
        this.Nware = "TBD"
        return "Subtitle"
      }
      else {
        return "other"
      }
    },
    getName(){

    }
  },
  // computed: {
  //
  // }
}
</script>

<style lang="css">
</style>
