<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>add_box</v-icon>
        Create New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            {{ caseTitle }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-tabs
            v-model="activeTab"
            color="info"
            centered
            grow
            slider-color="secondary"
          >
            <v-tab>
              Family Information
            </v-tab>
            <v-tab>
              Provider Information
            </v-tab>
            <v-tab>
              Attendance Log
            </v-tab>
            <v-tab>
              Letters
            </v-tab>
            <v-tab>
              Notes
            </v-tab>
            <!-- BEGIN TAB COMPONENTS -->
            <v-tab-item>
              <familyInfo></familyInfo>
            </v-tab-item>
            <v-tab-item>
              <providerInfo></providerInfo>
            </v-tab-item>
            <v-tab-item>
              <attendanceLog></attendanceLog>
            </v-tab-item>
            <v-tab-item>
              <letters></letters>
            </v-tab-item>
            <v-tab-item>
              <notes></notes>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import familyInfo from "@/components/sub-components/familyInfo.vue"
import providerInfo from "@/components/sub-components/providerInfo.vue"
import attendanceLog from "@/components/sub-components/attendanceLog.vue"
import letters from "@/components/sub-components/letters.vue"
import notes from "@/components/sub-components/notes.vue"
export default {
  components: {
    familyInfo, providerInfo, attendanceLog, letters, notes
  },
  data(){
    return{
      activeTab: "",
      caseTitle: ""
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* ADD PROPS TO BE RECEIVED (AS OBJECTS) FOR EACH OF THE SUB-COMPONENTS.
* PASS THE DATA TO THESE SUB-COMPONENTS
* ADD SOME FORM OF INDICATION IN THE TOOLBAR TO SHOW THE STATUS OF THE CASE AT A GLANCE
-->
