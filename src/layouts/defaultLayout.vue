<template lang="html">
  <div>
    <appHeader></appHeader>
    <v-container fluid>
      <v-row>
        <v-col xs="12" sm="10" offset-sm="1">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
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
