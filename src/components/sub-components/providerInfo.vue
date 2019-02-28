<template lang="html">
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex xs5>
          <v-text-field
            name="name"
            label="Name"
            v-model="name"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="address"
            label="Address"
            v-model="address"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="federalId"
            label="Federal ID"
            v-model="federalId"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5  offset-xs1>
          <v-text-field
            name="address2"
            label="Address 2"
            v-model="address2"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="licenseNum"
            label="License Number"
            v-model="licenseNum"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="city"
            label="City"
            v-model="city"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="typeOfProvider"
            label="Provider Type"
            v-model="typeOfProvider"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="state"
            label="State"
            v-model="state"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="typeOfCare"
            label="Care Type"
            v-model="typeOfCare"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="zip"
            label="Zip"
            v-model="zip"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="monthlyAmt"
            label="Monthly Amount"
            v-model="monthlyAmt"
            box
          ></v-text-field>
          </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="phone"
            label="Phone"
            v-model="phone"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5>
          <v-text-field
            name="papaStart"
            label="papaStart"
            v-model="papaStart"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs1>
          <v-text-field
            name="papaEnd"
            label="papaEnd"
            v-model="papaEnd"
            box
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="css">
</style>

<!--
Add ability to input multiple records capturing the following information:
* Provider Name
* Provider Address
* EIN
* provider phone number
* Child name (from family info) using this provider
* Amount designated

name              : "ABC Childcare",
federalId         : "11111-11",
licenseNum        : "11111111",
typeOfProvider    : "Licensed Center",    //COULD BE LICENSED CENTER OR REGISTERED FAMILY CHILD CARE
typeOfCare        : ["Full Day"],         //COULD SELECT MULTIPLE: FULL DAY, BEFORE SCHOOL, AFTER SCHOOL, SUMMER CAMP
address           : "987 6th St.",
address2          : "Suite 201",
city              : "Trenton",
state             : "NJ",
zip               : "08638",
phone             : "987-654-3210",
papaStart         : "2/1/2019",
papaEnd           : "1/31/2019",
monthlyAmt        : 300,

-->
