<template lang="html">
  <v-app>
    <appHeader></appHeader>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <appFooter></appFooter>
  </v-app>
</template>

<script>
import appHeader from "@/components/sub-components/header.vue";
import appFooter from "@/components/sub-components/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    appHeader, appFooter
  },
  computed: {

  }
};
</script>

<style lang="css"></style>

<!-- TO DO
* Add Icon to Login
* Retrieve Login status from state regarding whether user is logged in or not.
* Add login modal with username and password fields
* Change the navBar based on whether the user is an Admin, standard user or unauthenticated user.
-->
