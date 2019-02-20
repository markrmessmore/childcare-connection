<template lang="html">
  <v-app>
    <appHeader></appHeader>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <defaultView v-if="!getLoginState"></defaultView>
            <router-view v-else></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <appFooter></appFooter>
  </v-app>
</template>

<script>
import appHeader from "@/components/Header.vue";
import appFooter from "@/components/Footer.vue";
import defaultView from "@/components/Default.vue";
export default {
  data() {
    return {};
  },
  components: {
    appHeader,
    appFooter,
    defaultView
  },
  computed: {
    getLoginState() {
      return this.$store.getters.getLoginState;
    }
  }
};
</script>

<style lang="css"></style>

<!-- TO DO
* Add Icon to Login
* Retrieve Login status from state regarding whether user is logged in or not.
* Add login modal with username and password fields
-->
