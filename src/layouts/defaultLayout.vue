<template lang="html">
  <div>
    <appHeader></appHeader>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-xs1>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <appFooter></appFooter> -->
  </div>
</template>

<script>
import appHeader from "@/components/sub-components/header.vue";
export default {
  components: {appHeader}
}
</script>

<style lang="css">
</style>
