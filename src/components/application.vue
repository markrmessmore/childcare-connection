<template lang="html">
  <v-container :class="!getUser ? 'elevation-1' : ''">
    <v-toolbar flat dark dense v-if="!getUser" color="secondary">
      <v-icon left>fab fa-wpforms</v-icon>
      <v-toolbar-title>Mercer Co. Subsidy Mgt. Online Application</v-toolbar-title>
    </v-toolbar>
      <v-tabs
        v-model="activeTab"
        color="info"
        slider-color="primary"
        grow
      >
        <v-tab disabled>
          Step 1
        </v-tab>
        <v-tab disabled>
          Step 2
        </v-tab>
        <v-tab disabled>
          Step 3
        </v-tab>
        <v-tab disabled>
          Step 4
        </v-tab>
        <v-tab disabled>
          Step 5
        </v-tab>
        <v-tab disabled>
          Step 6
        </v-tab>
        <!-- APPLICANT -->
        <v-tab-item v-model="activeTab">
          <v-layout row class="pa-3">
            <v-flex xs12 class="title">APPLICANT INFORMATION</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <applicant :applicantData="caseInfo.familyInfo.applicant" :relationshipItems="relationshipItems" :caseId="caseInfo.caseId" @next="nextTab()">
            <template #next=" { checkActive }">
              <v-btn color="primary" outlined @click="nextTab()" rounded :disabled="!checkActive">
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </applicant>
        </v-tab-item>
        <!-- CO-APPLICANT -->
        <v-tab-item>
          <v-layout row wrap class="pa-3">
            <v-flex xs12 class="title pb-3">CO-APPLICANT INFORMATION (if applicable)</v-flex>
            <v-flex xs12 class="body-1">If you are applying as a solo caretaker feel free to skip.</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <coapplicant :coapplicantData="caseInfo.familyInfo.coapplicant" :relationshipItems="relationshipItems" @next="nextTab()">
            <template #prev>
              <v-btn color="primary" outlined @click="prevTab()" rounded>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template #skip>
              <v-btn color="primary" outlined @click="nextTab()" rounded>
                <v-icon left>fas fa-forward</v-icon>
                Skip
              </v-btn>
            </template>
            <template #next="{ checkActive }">
              <v-btn color="primary" outlined @click="nextTab()" rounded :disabled="!checkActive">
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </coapplicant>
        </v-tab-item>
        <!-- FAMILY INFO -->
        <v-tab-item>
          <v-layout row wrap class="pa-3">
            <v-flex xs12 class="title">FAMILY INFORMATION</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <family :familyData="caseInfo.familyInfo" @next="nextTab()">
            <template #prev>
              <v-btn color="primary" outlined @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template #next="{ checkActive }">
              <v-btn color="primary" outlined  @click="nextTab()" rounded :disabled="!checkActive">
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </family>
        </v-tab-item>
        <!-- WORK INFO -->
        <v-tab-item>
          <v-layout row wrap class="pa-3">
            <v-flex xs12 class="title">WORK INFORMATION</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <work :applicantData="caseInfo.familyInfo.applicant" :coapplicantData="caseInfo.familyInfo.coapplicant" @next="nextTab()">
            <template #prev>
              <v-btn color="primary" outlined @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template #next="{ checkActive }">
              <v-btn color="primary" outlined @click="nextTab()" rounded :disabled="!checkActive">
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </work>
        </v-tab-item>
        <!-- FINANCES -->
        <v-tab-item>
          <v-layout row wrap class="pa-3">
            <v-flex xs12 class="title">FINANCIAL INFORMATION</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <finances :appIncome="caseInfo.familyInfo.applicant" :coAppIncome="caseInfo.familyInfo.coapplicant" @next="nextTab()">
            <template #prev>
              <v-btn color="primary" outlined @click="prevTab()" rounded>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template #next="{ checkActive }">
              <v-btn color="primary"outlined @click="nextTab()" rounded :disabled="!checkActive">
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </finances>
        </v-tab-item>
        <!-- CHILDREN -->
        <v-tab-item>
           <v-layout row wrap class="pa-3">
            <v-flex xs12 class="title">CHILD INFORMATION</v-flex>
          </v-layout>
          <v-divider inset></v-divider>
          <children :kidInfo="caseInfo.familyInfo.children" :caseId="caseInfo.caseId">
            <template #prev>
              <v-btn color="primary" outlined @click="prevTab()" rounded>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template #next="{ checkActive }">
              <v-btn color="primary" outlined @click="submit()" rounded :disabled="!checkActive">
                <v-icon small left>fas fa-share-square</v-icon>
                Submit
              </v-btn>
            </template>
          </children>
        </v-tab-item>
      </v-tabs>
  </v-container>
</template>

<script>
import applicant    from '@/components/sub-components/familyInfo/applicant'
import children     from '@/components/sub-components/familyInfo/children'
import coapplicant  from '@/components/sub-components/familyInfo/coapplicant'
import family       from '@/components/sub-components/familyInfo/homeInfo'
import finances     from '@/components/sub-components/familyInfo/income'
import moment       from 'moment'
import work         from '@/components/sub-components/familyInfo/workInfo'
export default {
  components: {
    applicant,
    children,
    coapplicant,
    family,
    finances,
    work
  },
  data(){
    return{
      activeTab: 0,
      caseInfo: {}
    }
  },
  created(){
    this.caseInfo = this.getBlankCase
  },
  methods: {
    nextTab() {
      const active = parseInt(this.activeTab)
      this.activeTab = (active < 6 ? active + 1 : 0)
    },
    prevTab() {
      const active = parseInt(this.activeTab)
      this.activeTab = (active < 6 ? active - 1 : 0)
    },
    submit(){
      this.$store.dispatch('saveCase', this.caseInfo)
      if (this.getUser){
        this.$router.push('/dashboard')
      }
      else {
        this.$router.push('/')
      }
      this.caseInfo = this.getBlankCase
    }
  },
  computed: {
    getBarText(){
      return `Application Progress: Page ${this.activeTab + 1} of 6.`
    },
    getBlankCase(){
      let blankCase = this.$store.getters.getBlankCase
      let now = moment().format()
      blankCase.notes[0].date = now
      return blankCase
    },
    getUser(){
      return this.$store.getters.getUser
    },
    relationshipItems(){
      return this.$store.getters.getRelationships
    }
  }
}
</script>

<style lang="css" scoped>
</style>
