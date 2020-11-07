<template lang="html">
  <v-container class="elevation-1" fluid>
    <v-toolbar flat color="secondary" dense dark>
      <v-toolbar-title>
        <v-icon left>fas fa-columns</v-icon>
        Dashboard
      </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card
            flat
            ripple width="100%"
            max-width="150px"
            max-height="150px"
            :color="navItem.color"
            :dark="navItem.dark"
            :to="navItem.link"
            class="ma-2"
            v-for="navItem in getDashboard"
            :key="navItem.item"
          >
            <v-card-text>
              <v-row class="text-center">
                <v-col cols="12">
                  <v-icon>{{navItem.icon}}</v-icon>
                </v-col>
                <br>
                <v-col cols="12" class="title">
                  {{navItem.item}}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
