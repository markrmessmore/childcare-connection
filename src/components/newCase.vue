<template lang="html">
  <v-container class="elevation-1">
    <v-toolbar dense dark flat color="secondary">
      <v-toolbar-title>
        <v-icon left>fas fa-plus-circle</v-icon>
        Create a New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <application ref="caseInfo"></application>
      </v-col>
      <!-- <editCase :selectedCase="getBlankCase"></editCase> -->
    </v-row>
    <v-dialog
      v-model="confirmLeave"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <confirmLeave @leave="leave()" @cancel="cancel()"></confirmLeave>
    </v-dialog>
  </v-container>
</template>

<script>
  import application  from '@/components/application.vue'
  import confirmLeave from '@/components/sub-components/confirmLeave.vue'
  import editCase     from '@/components/sub-components/editCase.vue'
  export default {
    components: {
      application,confirmLeave, editCase
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
    computed: {
      getBlankCase(){
        return this.$store.getters.getBlankCase
      }
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
