<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Address"
              v-model="familyInfo.address"
              :rules="[checkField.required, checkField.length]"
              @change="checkReady()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Address 2"
              v-model="familyInfo.address2"
              @change="checkReady()"
            ></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              label="City"
              v-model="familyInfo.city"
              :rules="[checkField.required, checkField.length]"
              @change="checkReady()"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 offset-xs1>
            <v-text-field
              label="State"
              v-model="familyInfo.state"
              :rules="[checkField.required]"
              @change="checkReady()"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field
              label="Zip"
              mask="#####"
              v-model="familyInfo.zip"
              :rules="[checkField.required, checkField.zip]"
              validate-on-blur
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 class="grey lighten-3 pa-1">
            <v-layout row wrap>
              <v-flex xs5>
                <v-select
                  :items="phoneTypes"
                  v-model="familyInfo.phone1.type"
                  label="Primary Phone Type:"
                  :rules="[checkField.required]"
                  @change="checkReady()"
                ></v-select>
              </v-flex>
              <v-flex xs5 offset-xs1>
                <v-text-field
                  label="Primary Phone Number"
                  mask="phone"
                  v-model="familyInfo.phone1.num"
                  @change="checkReady()"
                  :rules="[checkField.required, checkField.phone]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="pa-1 num-box">
            <v-layout row wrap>
              <v-flex xs5>
                <v-select
                  :items="phoneTypes"
                  v-model="familyInfo.phone2.type"
                  label="Secondary Phone Type:"
                  @change="checkReady()"
                ></v-select>
              </v-flex>
              <v-flex xs5 offset-xs1>
                <v-text-field
                  label="Secondary Phone Number"
                  mask="phone"
                  v-model="familyInfo.phone2.num"
                  @change="checkReady()"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field
              type="number"
              label="# of Adults in the Home"
              v-model="familyInfo.numAdults"
              :rules="[checkField.required, checkField.isNum]"
              @change="checkReady()"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field
              type="number"
              label="# of Kids in the Home"
              v-model="familyInfo.numKids"
              :rules="[checkField.required, checkField.isNum]"
              @change="checkReady()"
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
        <v-layout row wrap>
          <v-flex xs1>
            <slot name="prev"></slot>
          </v-flex>
          <v-flex xs2 offset-xs9 class="text-xs-right">
            <slot name="next" v-bind:checkActive="readyToSubmit"></slot>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    familyData: Object
  },
  data(){
    return{
      familyInfo    : this.familyData,
      readyToSubmit : false
    }
  },
  methods: {
    checkReady(){
      this.readyToSubmit = this.$refs.form.validate()
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
.num-box {
  border: 1px solid grey;
}
</style>
