<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>add_circle</v-icon>
        Create a New Case
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <!-- <caseInfo></caseInfo> -->
    </v-card-text>
  </v-card>
</template>

<script>
import caseInfo from '@/components/sub-components/caseInfo.vue'
export default {
  components: {
    caseInfo
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style lang="css"></style>

<!--
* see caseInfo.vue and listed sub-components for changes
* add data for a new record with all pertinent areas being blank. Send data to caseinfo
-->
