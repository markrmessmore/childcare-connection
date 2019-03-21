<template lang="html">
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-right">
        <v-btn color="primary" outline small @click="addProvider()">
          <v-icon left>add_circle</v-icon>
          Add Provider Info
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card-text>
      <template v-for="(facility, index) in providers" >
        <v-card :key="index" :color="setCardColor(index)">
          <v-card-title class="title">
            {{facility.name}}
            <v-spacer></v-spacer>
            <v-btn color="primary" icon outline small @click="confirmRemoval(index)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider inset></v-divider>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs2 offset-xs1>
                <v-text-field
                  name="monthlyAmt"
                  label="Monthly Amount"
                  v-model="facility.monthlyAmt"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <v-text-field
                  name="papaStart"
                  label="PAPA Start"
                  v-model="facility.papaStart"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <v-text-field
                  name="papaEnd"
                  label="PAPA End"
                  v-model="facility.papaEnd"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </template>
    </v-card-text>
    <v-dialog
      v-model="confirmRemoveProvider"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Remove this Provider from this Case?</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-space-around>
            <v-btn color="primary" @click="deleteProvider()">
              <v-icon left>check</v-icon>
              Yes
            </v-btn>
            <v-btn color="red darken-4" outline @click="confirmRemoveProvider = false">
              <v-icon left>close</v-icon>
              No
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    providerInfo: Array
  },
  data(){
    return{
      careTypes: ['After School', 'Before School', 'Full Day', 'Summer Camp'],
      providers: this.providerInfo,
      providerToRemove: null,
      providerTypes: ['Camp','Licensed Center', 'Registered Family Child Care'],
      confirmRemoveProvider: false
    }
  },
  methods: {
    addProvider(){
      let blankProvider= {
        name              : "New Provider Facility",
        federalId         : "",
        licenseNum        : "",
        typeOfProvider    : "",
        typeOfCare        : "",
        address           : "",
        address2          : "",
        city              : "",
        state             : "NJ",
        zip               : "",
        phone             : "",
        papaStart         : "",
        papaEnd           : "",
        monthlyAmt        : null,
      }
      this.providers.unshift(blankProvider)
    },
    confirmRemoval(index){
      this.providerToRemove = index
      this.confirmRemoveProvider = true
    },
    deleteProvider(){
      this.providers.splice(this.providerToRemove, 1)
      this.confirmRemoveProvider = false
    },
    setCardColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-2"
      }
    },
  }
}
</script>

<style lang="css">
</style>
