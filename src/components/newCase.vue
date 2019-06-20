<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon left>add_circle</v-icon>
        Create a New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <application ref="caseInfo"></application>
    </v-card-text>
    <v-dialog
      v-model="confirmLeave"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <confirmLeave @leave="leave()" @cancel="cancel()"></confirmLeave>
    </v-dialog>
  </v-card>
</template>

<script>
import application from '@/components/application.vue'
import confirmLeave from '@/components/sub-components/confirmLeave.vue'
export default {
  components: {
    application,confirmLeave
  },
  data() {
    return {
      confirmLeave: false,
      createNewCase: false,
      nextRoute: null
    }
  },
  methods: {
    cancel(){
      this.confirmLeave = false
      this.nextRoute    = null
    },
    leave(){
      this.confirmLeave = false
      this.nextRoute()
    },
  },
  beforeRouteLeave(to, from, next){
    if (this.createNewCase == true){
      this.confirmLeave = true
      this.nextRoute = next
    }
    else {
      next()
    }
  }
};
</script>

<style lang="css"></style>
