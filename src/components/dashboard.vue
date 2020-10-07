<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon left>fas fa-columns</v-icon>
        Dashboard
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap align-center justify-space-around>
        <v-card
          ripple width="100%"
          max-width="200px"
          max-height="200px"
          :color="navItem.color"
          :dark="navItem.dark"
          :to="navItem.link"
          class="elevation-5 ma-2"
          v-for="navItem in getDashboard"
          :key="navItem.item"
        >
          <v-card-text>
            <v-container>
              <v-layout column align-center>
                <v-icon>{{navItem.icon}}</v-icon>
              </v-layout>
              <br>
              <v-layout column align-center class="title text-xs-center">
                {{navItem.item}}
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
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
