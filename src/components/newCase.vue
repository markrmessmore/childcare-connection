<template lang="html">
  <v-card>
    <caseInfo></caseInfo>
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

<!-- see caseInfo.vue and listed sub-components for changes -->
<!-- add data for a new record with all pertinent areas being blank. Send data to caseinfo -->
