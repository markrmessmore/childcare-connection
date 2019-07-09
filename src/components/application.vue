<template lang="html">
  <v-card>
    <v-toolbar flat color="" v-if="!getUser">
      <v-icon left>fab fa-wpforms</v-icon>
      <v-toolbar-title>Mercer Co. Subsidy Mgt. Online Application</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-text-field
          :placeholder="getBarText"
          loading
          readonly
        >
          <template v-slot:progress>
            <v-progress-linear :value="getProgress" height="10"></v-progress-linear>
          </template>

        </v-text-field>
      </v-flex>
      <v-flex xs10 offset-xs1>
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-tabs
        v-model="activeTab"
        color="info"
        slider-color="primary"
        grow
      >
        <v-tab>
          Applicant Info
        </v-tab>
        <v-tab>
          Co-Applicant Info
        </v-tab>
        <v-tab>
          Family Info
        </v-tab>
        <v-tab>
          Work Info
        </v-tab>
        <v-tab>
          Financial Info
        </v-tab>
        <v-tab>
          Child Info
        </v-tab>
        <v-tab-item>
          <applicant :applicantInfo="caseInfo.familyInfo.applicant" :relationshipItems="relationshipItems" @next="nextTab()">
            <template v-slot:next>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </applicant>
        </v-tab-item>
        <v-tab-item>
          <coapplicant :coapplicantInfo="caseInfo.familyInfo.coapplicant" :relationshipItems="relationshipItems" @next="nextTab()">
            <template v-slot:prev>
              <v-btn color="primary" @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template v-slot:skip>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-forward</v-icon>
                Skip
              </v-btn>
            </template>
            <template v-slot:next>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </coapplicant>
        </v-tab-item>
        <v-tab-item>
          <family :familyInfo="caseInfo.familyInfo" @next="nextTab()">
            <template v-slot:prev>
              <v-btn color="primary" @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template v-slot:next>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </family>
        </v-tab-item>
        <v-tab-item>
          <work :applicantData="caseInfo.familyInfo.applicant" :coapplicantData="caseInfo.familyInfo.coapplicant" @next="nextTab()">
            <template v-slot:prev>
              <v-btn color="primary" @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template v-slot:next>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </work>
        </v-tab-item>
        <v-tab-item>
          <finances :appIncome="caseInfo.familyInfo.applicant" :coAppIncome="caseInfo.familyInfo.coapplicant" @next="nextTab()">
            <template v-slot:prev>
              <v-btn color="primary" @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template v-slot:next>
              <v-btn color="primary" @click="nextTab()" round>
                <v-icon left>fas fa-caret-right</v-icon>
                Next
              </v-btn>
            </template>
          </finances>
        </v-tab-item>
        <v-tab-item>
          <children :kidInfo="caseInfo.familyInfo.children">
            <template v-slot:prev>
              <v-btn color="primary" @click="prevTab()" round>
                <v-icon left>fas fa-caret-left</v-icon>
                Previous
              </v-btn>
            </template>
            <template v-slot:next>
              <v-btn color="primary" @click="submit()" round>
                <v-icon left>fas fa-share-square</v-icon>
                Submit
              </v-btn>
            </template>
          </children>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
import applicant    from '@/components/sub-components/application/applicant'
import children     from '@/components/sub-components/application/children'
import coapplicant  from '@/components/sub-components/application/coapplicant'
import family       from '@/components/sub-components/application/home'
import finances     from '@/components/sub-components/application/finances'
import work         from '@/components/sub-components/application/work'
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
      activeTab: null,
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
      return this.$store.getters.getBlankCase
    },
    getProgress(){
      let n = this.activeTab
      return ((n/6) * 100)
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
