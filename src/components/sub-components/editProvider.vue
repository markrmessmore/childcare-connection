<template lang="html">
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{facility.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" icon small @click="close()" outline>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs7>
          <v-text-field
            name="name"
            label="Name"
            v-model="facility.name"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <v-text-field
            name="federalId"
            label="Federal ID"
            v-model="facility.federalId"
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
      <v-btn color="primary" outline @click="saveProvider()">
        <v-icon left>save</v-icon>
        Save Provider
      </v-btn>
      <v-btn color="red darken-4" dark @click="close()">
        <v-icon left>close</v-icon>
        Cancel
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    editType: String,
    providerData: Object
  },
  data(){
    return {
      careTypes: ['After School', 'Before School', 'Full Day', 'Summer Camp'],
      facility: this.providerData,
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
