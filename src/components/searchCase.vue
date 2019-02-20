<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>search</v-icon>
        Case Search
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="secondary" @click="closePage()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm6 class="text-xs-left">
          <v-text-field
            label="Search Case Number:"
            v-model="search"
            clearable
            box
          ></v-text-field>
        </v-flex>
        <v-flex class="text-xs-center text-sm-right">
          <v-btn large color="primary" @click="searchCase()">
            <v-icon left>search</v-icon>
            Search
          </v-btn>
          <v-btn large color="primary" @click="clearSearch()">
            <v-icon left>undo</v-icon>
            Reset Search
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <br />
      <v-card v-if="showCase">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            {{ caseTitle }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-tabs
            v-model="activeTab"
            color="info"
            centered
            grow
            slider-color="secondary"
          >
            <v-tab>
              Basic
            </v-tab>
            <v-tab>
              Subsidy
            </v-tab>
            <v-tab>
              Item 3
            </v-tab>
            <v-tab>
              Follow-up
            </v-tab>
            <v-tab-item>
              Basic Info
            </v-tab-item>
            <v-tab-item>
              Subsidy Information
            </v-tab-item>
            <v-tab-item>
              Item 3
            </v-tab-item>
            <v-tab-item>
              Follow-up
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "",
      caseTitle: "",
      showCase: false,
      search: ""
    };
  },
  methods: {
    clearSearch() {
      this.search = "";
      this.showCase = false;
    },
    searchCase() {
      this.showCase = true;
      this.caseTitle = `Case ID: ${this.search}`;
      console.log(this.search);
    },
    closePage(){
      this.$emit('closePage')
    }
  }
};
</script>

<style lang="css"></style>
