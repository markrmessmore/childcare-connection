<template>
  <v-card height="500px">
    <v-toolbar color="secondary" dark flat>
      <v-toolbar-title>
        <v-icon>home</v-icon>
        Welcome
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="title">
      <p>Please sign in to access the Mercer County Subsidy Management System.</p>
      <br>
      <p>Unauthorized access to this database is prohibited!</p>
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
