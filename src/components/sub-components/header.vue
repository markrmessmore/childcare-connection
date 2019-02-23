<template lang="html">
  <div class="">
    <v-toolbar dense color="primary" dark>
      <img src="@/assets/ccc-logo.png" height="42px" width="auto"></img>
      <v-toolbar-title>
        Mercer Co. Subsidy Mgt. System
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="white" outline to="/dashboard">
        <!-- <v-icon left>Sign In</v-icon> -->
        Sign In
      </v-btn>
    </v-toolbar>
    <v-toolbar flat dense color="primary lighten-1">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat color="white" v-for="item in getNav" :key="item.item" :to="item.link">{{item.item}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {

  },
  computed: {
    getNav(){
      return this.$store.getters.getNav
    }
  }
};
</script>

<style lang="css"></style>

<!-- CHANGE BUTTON LANGUAGE BASED ON WHETHER A USER IS SIGNED IN
ADD APPROPRIATE ICON
POTENTIAL: CHANGE ICON BASED ON LOGIN STATUS -->
