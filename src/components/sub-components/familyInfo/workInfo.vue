<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-expansion-panel class="elevation-0">
        <!-- PRIMARY APPLICANT -->
        <v-expansion-panel-content lazy class="info">
          <div class="subheading" slot="header">PRIMARY APPLICANT</div>
          <v-card flat>
            <v-card-text>
              <v-toolbar dense flat color="primary" dark class="subheading">Primary Location</v-toolbar>
              <br>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Name of the Location"
                    v-model="applicant.primaryWork.locationName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-select
                    :items="locationItems"
                    v-model="applicant.primaryWork.type"
                    label="Type of Location"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    :items="locationStatus"
                    v-model="applicant.primaryWork.status"
                    label="Employment Status"
                  ></v-select>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Hours/Week"
                    v-model="applicant.primaryWork.hoursPerWeek"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Months/Year"
                    v-model="applicant.primaryWork.monthsPerYear"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Location Address"
                    v-model="applicant.primaryWork.address"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    label="City"
                    v-model="applicant.primaryWork.city"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="State"
                    v-model="applicant.primaryWork.state"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Zip"
                    v-model="applicant.primaryWork.zip"
                    mask="#####"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Phone"
                    v-model="applicant.primaryWork.phone"
                    mask="phone"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="Ext"
                    v-model="applicant.primaryWork.phoneext"
                    >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-toolbar color="primary" dark class="subheading" dense flat>Secondary Location</v-toolbar>
              <br>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Name of the Location"
                    v-model="applicant.secondaryWork.locationName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-select

                    :items="locationItems"
                    v-model="applicant.secondaryWork.type"
                    label="Type of Location"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-select

                    :items="locationStatus"
                    v-model="applicant.secondaryWork.status"
                    label="Employment Status"
                  ></v-select>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Hours/Week"
                    v-model="applicant.secondaryWork.hoursPerWeek"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Months/Year"
                    v-model="applicant.secondaryWork.monthsPerYear"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Location Address"
                    v-model="applicant.secondaryWork.address"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    label="City"
                    v-model="applicant.secondaryWork.city"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="State"
                    v-model="applicant.secondaryWork.state"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Zip"
                    v-model="applicant.secondaryWork.zip"
                    mask="#####"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Phone"
                    v-model="applicant.secondaryWork.phone"
                    mask="phone"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="Ext"
                    v-model="applicant.secondaryWork.phoneext"
                    >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- COAPPLICANT -->
      <v-expansion-panel class="elevation-0">
        <v-expansion-panel-content lazy class="info">
          <div class="subheading" slot="header">CO-APPLICANT</div>
          <v-card flat>
            <v-card-text>
              <v-toolbar dense flat dark color="primary" class="subheading">Primary Location</v-toolbar>
              <br>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Name of the Location"
                    v-model="coapplicant.primaryWork.locationName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-select

                    :items="locationItems"
                    v-model="coapplicant.primaryWork.type"
                    label="Type of Location"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-select

                    :items="locationStatus"
                    v-model="coapplicant.primaryWork.status"
                    label="Employment Status"
                  ></v-select>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Hours/Week"
                    v-model="coapplicant.primaryWork.hoursPerWeek"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Months/Year"
                    v-model="coapplicant.primaryWork.monthsPerYear"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Location Address"
                    v-model="coapplicant.primaryWork.address"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    label="City"
                    v-model="coapplicant.primaryWork.city"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="State"
                    v-model="coapplicant.primaryWork.state"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Zip"
                    v-model="coapplicant.primaryWork.zip"
                    mask="#####"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Phone"
                    v-model="coapplicant.primaryWork.phone"
                    mask="phone"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="Ext"
                    v-model="coapplicant.primaryWork.phoneext"
                    >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-toolbar color="primary" dark class="subheading" dense flat>Secondary Location</v-toolbar>
              <br>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Name of the Location"
                    v-model="coapplicant.secondaryWork.locationName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-select

                    :items="locationItems"
                    v-model="coapplicant.secondaryWork.type"
                    label="Type of Location"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-select

                    :items="locationStatus"
                    v-model="coapplicant.secondaryWork.status"
                    label="Employment Status"
                  ></v-select>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Hours/Week"
                    v-model="coapplicant.secondaryWork.hoursPerWeek"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                  <v-text-field
                    label="Months/Year"
                    v-model="coapplicant.secondaryWork.monthsPerYear"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Location Address"
                    v-model="coapplicant.secondaryWork.address"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    label="City"
                    v-model="coapplicant.secondaryWork.city"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="State"
                    v-model="coapplicant.secondaryWork.state"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Zip"
                    v-model="coapplicant.secondaryWork.zip"
                    mask="#####"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field
                    label="Phone"
                    v-model="coapplicant.secondaryWork.phone"
                    mask="phone"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 offset-xs1>
                  <v-text-field
                    label="Ext"
                    v-model="coapplicant.secondaryWork.phoneext"
                    >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-layout row wrap>
        <v-flex xs1>
          <slot name="prev"></slot>
        </v-flex>
        <v-flex xs2 offset-xs9 class="text-xs-right">
          <slot name="next" v-bind:checkActive="readyToSubmit"></slot>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    applicantData: Object,
    coapplicantData: Object,
  },
  data() {
    return {
      applicant     : this.applicantData,
      coapplicant   : this.coapplicantData,
      readyToSubmit : false
    };
  },
  methods: {
    checkReady(){
      this.readyToSubmit = this.$refs.form.validate()
    }
  },
  computed: {
    locationItems() {
      return this.$store.getters.getLocationItems;
    },
    locationStatus() {
      return this.$store.getters.getLocationStatus;
    },
  },
};
</script>

<style lang="css">
</style>
