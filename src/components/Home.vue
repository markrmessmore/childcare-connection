<template lang="html">
  <v-tabs
    v-model="activePage"
    color="secondary"
    dark
    grow
    centered
    icons-and-text
    slider-color="info"
  >
    <v-tab>
      Create New Case
      <v-icon>add_box</v-icon>
    </v-tab>
    <v-tab>
      Search for Case
      <v-icon>search</v-icon>
    </v-tab>
    <v-tab-item>
      <newCase></newCase>
    </v-tab-item>
    <v-tab-item>
      <caseSearch></caseSearch>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import caseSearch from "@/components/caseSearch";
import newCase from "@/components/newCase";
export default {
  data() {
    return {
      activePage: ""
    };
  },
  components: {
    caseSearch,
    newCase
  }
};
</script>

<style lang="css"></style>
