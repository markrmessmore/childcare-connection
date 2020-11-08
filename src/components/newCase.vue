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
        <application></application>
      </v-col>
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
  export default {
    components: {
      application,confirmLeave
    },
    data() {
      return {
        confirmLeave: false,
        nextRoute   : null
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
        this.clear()
        this.confirmLeave = true
        this.nextRoute    = next
    }
  };
</script>

<style lang="css"></style>
