<template lang="html">
  <v-toolbar color="primary" dark dense>
    <v-toolbar-title>
      <v-tooltip bottom>
        <template slot="activator">
          <v-icon>dns</v-icon>
          Childcare Connection Mercer Co. SMS.
        </template>
        <span>CCC Mercer County Subsidy Management System</span>
      </v-tooltip>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn small color="white" outline @click="setLoginState()">
      <v-icon left>{{ btnIcon() }}</v-icon>
      {{ btnText() }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    btnIcon() {
      if (this.getLoginState == false) {
        return "account_box";
      } else {
        return "exit_to_app";
      }
    },
    btnText() {
      if (this.getLoginState == true) {
        return "Sign Out";
      } else {
        return "Sign In";
      }
    },
    setLoginState() {
      this.$store.dispatch("setLoginState", !this.getLoginState);
    }
  },
  computed: {
    getLoginState() {
      return this.$store.getters.getLoginState;
    }
  }
};
</script>

<style lang="css"></style>
