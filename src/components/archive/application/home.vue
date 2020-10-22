<template lang="html">
  <v-card text>
    <hr>
    <v-card-title primary-title class="title">
      Family Information
    </v-card-title>
    <hr>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Address"
            v-model="family.address"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Address 2"
            v-model="family.address2"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            label="City"
            v-model="family.city"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-text-field
            label="State"
            v-model="family.state"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
            label="Zip"
            mask="#####"
            v-model="family.zip"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 class="grey lighten-1 pa-1">
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                :items="phoneTypes"
                v-model="family.phone1.type"
                label="Primary Phone Type:"
              ></v-select>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-text-field
                label="Primary Phone Number"
                mask="phone"
                v-model="family.phone1.num"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6 class="pa-1 num-box">
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                :items="phoneTypes"
                v-model="family.phone2.type"
                label="Secondary Phone Type:"
              ></v-select>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-text-field
                label="Secondary Phone Number"
                mask="phone"
                v-model="family.phone2.num"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs3>
          <v-text-field
            label="# of Adults in the Home"
            v-model="family.numAdults"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
            label="# of Kids in the Home"
            v-model="family.numKids"
          ></v-text-field>
        </v-flex>
        <v-flex xs3 offset-xs1>
          <v-text-field
          label="Total # in Home"
          readonly
          v-model="calcFamily"
          ></v-text-field>
        </v-flex>
      </v-layout>
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
    familyInfo: Object,
  },
  data(){
    return{
      family: this.familyInfo
    }
  },
  methods: {
    next(){
      this.$emit('next')
    }
  },
  computed: {
    calcFamily(){
        return Number(this.familyInfo.numAdults || 0) + Number(this.familyInfo.numKids || 0)
    },
    phoneTypes(){
      return this.$store.getters.getPhoneTypes
    }
  }
}
</script>

<style lang="css" scoped>
</style>
