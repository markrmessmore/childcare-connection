<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>dashboard</v-icon>
        Dashboard
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap align-center justify-space-between>
        <!-- <v-flex xs1 v-for="navItem in getDashboard" class="mb-1" :key="navItem.item"> -->
          <v-card
            ripple width="100%"
            max-width="150px"
            max-height="150px"
            :color="navItem.color"
            :dark="navItem.dark"
            :to="navItem.link"
            class="elevation-5 mb-1"
            v-for="navItem in getDashboard"
            :key="navItem.item"
          >
            <v-card-text>
              <v-container>
                <v-layout column align-center>
                  <v-icon large>{{navItem.icon}}</v-icon>
                </v-layout>
                <br>
                <v-layout column align-center class="title text-xs-center">
                  {{navItem.item}}
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        <!-- </v-flex> -->
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    getDashboard(){
      return this.$store.getters.getNav
    }
  }
};
</script>

<style lang="css"></style>

<!--
* Assure only logged-in users can access this page
* Assure navbar is working correctly based on user access level.
-->
