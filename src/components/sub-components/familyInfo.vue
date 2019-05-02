<template lang="html">
  <div class="">
    <br>
    <!-- APPLICANT INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Applicant Information</div>
          <applicant :applicantData="familyInfo.applicant" :relationshipItems="relationshipItems"></applicant>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- CO-APPLICANT INFORMATION -->
      <br>
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="grey white--text elevation-3">
          <div class="subheading" slot="header">Co-applicant Information</div>
          <coapplicant :coapplicantData="familyInfo.coapplicant" :relationshipItems="relationshipItems"></coapplicant>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- HOME INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Home Information</div>
          <home :familyData="familyInfo"></home>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- FINANCIAL INFO: APPLICANT -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 grey white--text">
          <div class="subheading" slot="header">Family Income Information</div>
          <income
            :appIncome="familyInfo.applicant" :coAppIncome="familyInfo.coapplicant">
          </income>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- WORK/SCHOOL/TRAINING INFO -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Work/School/Training Information</div>
          <workInfo :applicantData="familyInfo.applicant" :coapplicantData="familyInfo.coapplicant"></workInfo>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- CHILD INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 grey white--text">
          <div class="subheading" slot="header">Child Information</div>
          <children :kidInfo="familyData.children"></children>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-layout>
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
import applicant from '@/components/sub-components/familyInfo/applicant.vue'
import children from '@/components/sub-components/familyInfo/children.vue'
import coapplicant from '@/components/sub-components/familyInfo/coapplicant.vue'
import home from '@/components/sub-components/familyInfo/home.vue'
import income from '@/components/sub-components/familyInfo/income.vue'
import workInfo from '@/components/sub-components/familyInfo/workInfo.vue'
export default {
  components: {
    applicant,
    children,
    coapplicant,
    home,
    income,
    workInfo,
  },
  props: {
    familyData: Object
  },
  data(){
    return {
      familyInfo: this.familyData,
    }
  },
  computed: {
    relationshipItems(){
      return this.$store.getters.getRelationships
    }
  }
}
</script>

<style lang="css">

</style>
