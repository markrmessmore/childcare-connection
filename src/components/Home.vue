<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap v-if="activePage == ''">
      <v-flex xs6 class="text-xs-center">
        <v-btn color="primary" large class="title" @click="activatePage('add')">
          <v-icon left>add_circle</v-icon>
          Create New Case
        </v-btn>
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <v-btn color="secondary" large class="title" @click="activatePage('search')">
          <v-icon left>search</v-icon>
          Search for Existing Case
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="activePage == 'add'">
      <v-flex xs12>
        <newCase @closePage="closePage()"></newCase>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="activePage == 'search'">
      <v-flex xs12>
        <searchCase @closePage="closePage()"></searchCase>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import searchCase from "@/components/searchCase";
import newCase from "@/components/newCase";
export default {
  data() {
    return {
      activePage: ""
    };
  },
  methods: {
    activatePage(pg){
      this.activePage = pg
    },
    closePage(){
      this.activePage = ""
    }
  },
  components: {
    searchCase,
    newCase
  }
};
</script>

<style lang="css"></style>
