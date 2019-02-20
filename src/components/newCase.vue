<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>add_box</v-icon>
        Create New Case
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="secondary" @click="closePage()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-card>
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
      caseTitle: ""
    };
  },
  methods: {
    closePage(){
      this.$emit('closePage')
    }
  }
};
</script>

<style lang="css"></style>
