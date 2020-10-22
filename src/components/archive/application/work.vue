<template lang="html">
  <v-card text>
    <hr>
    <v-card-title primary-title class="title">
      Employment/School/Training Information
    </v-card-title>
    <hr>
    <v-card-text>
      <v-card>
        <v-toolbar color="secondary" dark dense text>
          <v-toolbar-title>
            Primary Applicant
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-toolbar dense text color="primary lighten-2" class="subheading">Primary Employment/School/Training Location</v-toolbar>
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
          <v-toolbar color="primary lighten-2" class="subheading" dense text>Secondary Employment/School/Training Location (if applicable)</v-toolbar>
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
      <br>
      <v-card color="grey lighten-3" v-if="coapplicant.firstName">
        <v-toolbar color="secondary" dark dense text>
          <v-toolbar-title>
            Co-applicant
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-toolbar dense text color="primary lighten-2" class="subheading">Primary Employment/School/Training Location (if applicable)</v-toolbar>
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
          <v-toolbar color="primary lighten-2" class="subheading" dense text>Secondary Employment/School/Training Location (if applicable)</v-toolbar>
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
    </v-card-text>
    <hr>
    <v-layout row wrap>
      <v-flex xs1>
        <slot name="prev"></slot>
      </v-flex>
      <v-flex xs1 offset-xs8>
        <slot name="skip"></slot>
      </v-flex>
      <v-flex xs1 offset-xs1>
        <slot name="next"></slot>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    applicantData: Object,
    coapplicantData: Object,
  },
  data() {
    return {
      applicant: this.applicantData,
      coapplicant: this.coapplicantData,
    };
  },
  methods: {
    next() {
      this.$emit("next");
    },
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

<style lang="css" scoped>
</style>
