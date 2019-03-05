<template lang="html">
  <caseInfo :caseData="selectedCase" ref="caseInfo"></caseInfo>
</template>

<script>
import caseInfo from '@/components/sub-components/caseInfo.vue'
export default {
  props: {
    selectedCase: Object
  },
  components: {
    caseInfo
  },
  methods: {
    confirmLeave(){
      this.$refs.caseInfo.confirmLeave()
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* ADD AND INCLUDE CASEINFO COMPONENT
* ADD PROPS (AS OBJECTS) TO BE RECEIVED THEN SENT TO CASEINFO COMPONENT
-->
