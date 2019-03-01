<template lang="html">
  <div>
    <appHeader></appHeader>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <appFooter></appFooter>
  </div>
</template>

<script>
import appHeader from "@/components/sub-components/header.vue";
import appFooter from "@/components/sub-components/footer.vue";
export default {
  components: {appHeader, appFooter}
}
</script>

<style lang="css">
</style>
