<template lang="html">
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{facility.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" icon small @click="close()" outline>
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs2>
          <v-text-field
            name="name"
            label="Name"
            v-model="facility.name"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <span class="grey--text">Type of Prov. ID:</span>
          <v-radio-group v-model="facility.provIdType" row class="ma-0">
            <v-radio
              label="Fed. ID"
              value="fedId"
            ></v-radio>
            <v-radio
              label="SSN"
              value="ssn"
            ></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-tooltip top v-if="facility.provIdType == 'ssn'">
            <template v-slot:activator="{ on }">
              <v-text-field
                type="password"
                label="Social Sec Num"
                v-model="facility.federalId"
                v-on="on"
              ></v-text-field>
            </template>
            <span>SSN ending in :  {{facility.federalId.slice(-4)}}</span>
          </v-tooltip>
          <v-text-field
            v-else
            label="Federal ID"
            v-model="facility.federalId"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            label="CCC Account #"
            v-model="facility.cccId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            name="address"
            label="Address"
            v-model="facility.address"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            name="address2"
            label="Address 2"
            v-model="facility.address2"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="city"
            label="City"
            v-model="facility.city"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            name="state"
            label="State"
            v-model="facility.state"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
            name="zip"
            mask="#####"
            label="Zip"
            v-model="facility.zip"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            :items="providerTypes"
            v-model="facility.typeOfProvider"
            label="Provider Type"
            multiple
          ></v-select>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="licenseNum"
            label="License Number"
            v-model="facility.licenseNum"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs1>
          <v-text-field
            mask="phone"
            label="Phone"
            v-model="facility.phone"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-layout row wrap justify-space-around align-center>
      <v-btn color="primary" outline @click="saveProvider()" round outline small>
        <v-icon left>fas fa-save</v-icon>
        Save Provider
      </v-btn>
      <v-btn color="red darken-4" dark @click="close()" round outline small>
        <v-icon left>fas fa-times</v-icon>
        Cancel
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  props: {
    editType: String,
    providerData: Object
  },
  data(){
    return {
      careTypes: ['After School', 'Before School', 'Full Day', 'Summer Camp'],
      facility: this.providerData,
      provIdType: 1,
      providerTypes: ['Camp','Licensed Center', 'Registered Family Child Care'],
    }
  },
  methods: {
    close(){
      this.$emit('close')
    },
    saveProvider(){
      if (this.editType == 'new'){
        this.$store.dispatch('addProvider', this.facility)
        this.$emit('close')
      }
      else {
        this.$store.dispatch('updateProvider', this.facility)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="css">
</style>
