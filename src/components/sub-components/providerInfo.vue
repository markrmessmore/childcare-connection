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
      <v-card v-for="(facility, index) in providers" :key="index" :color="setCardColor(index)">
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
            <v-flex xs7>
              <v-text-field
                name="name"
                label="Name"
                v-model="facility.name"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-text-field
                name="federalId"
                label="Federal ID"
                v-model="facility.federalId"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="address"
                label="Address"
                v-model="facility.address"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="address2"
                label="Address 2"
                v-model="facility.address2"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs5>
              <v-text-field
                name="city"
                label="City"
                v-model="facility.city"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                name="state"
                label="State"
                v-model="facility.state"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-text-field
                name="zip"
                label="Zip"
                v-model="facility.zip"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="providerTypes"
                v-model="facility.typeOfProvider"
                label="Provider Type"
                box
              ></v-select>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-text-field
                name="licenseNum"
                label="License Number"
                v-model="facility.licenseNum"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-select
                :items="careTypes"
                v-model="facility.typeOfCare"
                label="Care Type"
                box
              ></v-select>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                name="phone"
                mask="phone"
                label="Phone"
                v-model="facility.phone"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                name="monthlyAmt"
                label="Monthly Amount"
                v-model="facility.monthlyAmt"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                name="papaStart"
                label="papaStart"
                v-model="facility.papaStart"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                name="papaEnd"
                label="papaEnd"
                v-model="facility.papaEnd"
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
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
      blankProvider: {
        name              : "",
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
      },
      careTypes: ['After School', 'Before School', 'Full Day', 'Summer Camp'],
      providers: this.providerInfo,
      providerToRemove: null,
      providerTypes: ['Licensed Center', 'Registered Family Child Care'],
      confirmRemoveProvider: false
    }
  },
  methods: {
    addProvider(){
      this.providers.push(this.blankProvider)
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
        return "grey lighten-4"
      }
    }
  }
}
</script>

<style lang="css">
</style>
