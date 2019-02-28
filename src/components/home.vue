<template>
  <v-card height="500px">
    <v-toolbar color="secondary" dark flat>
      <v-toolbar-title>
        <v-icon>home</v-icon>
        Welcome
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="display-1">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12>
          <p>Please sign in to access the Mercer County Subsidy Management System.</p>
        </v-flex>
        <v-flex xs12>
          <p>Unauthorized access to this database is prohibited!</p>
        </v-flex>
      </v-layout>
      <v-layout row align-center justify-space-between>
        <v-img :src="require('@/assets/ccc-logo-original.jpg')" height="250px" width="auto" contain></v-img>
        <v-img :src="require('@/assets/mercerColor.png')" height="250px" width="auto" contain></v-img>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<!--
* ADAPT FOR ONE VIEW TO BE THE APP AND ANOTHER FOR PRINTED REPORTS/LETTERS (BLANK)
* ADD CCC & MERCER CO LOGOS TO CARD ON HOME PAGE
-->
