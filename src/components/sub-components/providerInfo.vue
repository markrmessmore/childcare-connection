<template lang="html">
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-right">
        <v-btn color="primary" outline small @click="addProvider()" round outline>
          <v-icon left>fas fa-plus-circle</v-icon>
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
              <v-icon>fas fa-times</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider inset></v-divider>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-select
                  :items="getKids"
                  v-model="facility.forChild"
                  label="For Child:"
                ></v-select>
              </v-flex>
              <v-flex xs5 offset-xs1>
                <v-autocomplete
                  clearable
                  :items="getProviders"
                  v-model="facility.name"
                  label="Provider:"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="getCareTypes"
                  v-model="facility.typeOfCare"
                  label="Type of Care:"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                name="papaStart"
                label="PAPA Start"
                v-model="facility.papaStart"
                mask="##/##/####"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <v-text-field
                name="papaEnd"
                label="PAPA End"
                v-model="facility.papaEnd"
                mask="##/##/####"
                @blur="getDefaultVal(facility)"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  name="monthlyAmt"
                  label="Monthly Amount"
                  v-model="facility.monthlyAmt"
                  prepend-icon="fas fa-dollar-sign"
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
        <v-toolbar color="primary" dark dense>
          <v-icon>fas fa-question-circle</v-icon>
          <v-toolbar-title>Remove this Provider Record from this Case?</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-space-around>
            <v-btn color="primary" @click="deleteProvider()" outline round>
              <v-icon left>fas fa-check</v-icon>
              Yes
            </v-btn>
            <v-btn color="red darken-4" outline @click="confirmRemoveProvider = false" round>
              <v-icon left>fas fa-times</v-icon>
              No
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    caseInfo: Object
  },
  data(){
    return{
      careTypes: ['After School', 'Before School', 'Full Day', 'Summer Camp'],
      providers: this.caseInfo.providers,
      providerToRemove: null,
      providerTypes: ['Camp','Licensed Center', 'Registered Family Child Care'],
      confirmRemoveProvider: false
    }
  },
  methods: {
    addProvider(){
      let blankProvider= {
        forChild          : "",
        name              : "",
        typeOfCare        : "",
        papaStart         : "",
        papaEnd           : "",
        monthlyAmt        : null
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
    getDefaultVal(facInfo){
      let values    = this.getValues
      let selected  = values[facInfo.typeOfCare]
      // console.log(moment(selected.changeDate).isBetween(moment(facInfo.papaStart), moment(facInfo.papaEnd)))
      // if (selected.changeDate){
      //   let changeDate  = moment(selected.changeDate)
      //   let papaStart   = moment(facInfo.papaStart)
      //   let papaEnd     = moment(facInfo.papaEnd)
      //   console.log
      // }
      // else {
      //   return selected.currentAmt
      // }
    },
    setCardColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-2"
      }
    }
  },
  computed: {
    getCareTypes(){
      return this.$store.getters.getCareTypes
    },
    getKids(){
      let children = this.caseInfo.familyInfo.children
      let kids = []
      children.forEach(child => {
        let name = `${child.firstName} ${child.lastName}`
        kids.push(name)
      })
      return kids
    },
    getProviders(){
      let list = []
      let providerList = this.$store.getters.getProviders
      providerList.forEach(prov => {
        list.push(prov.name)
      })
      return list.sort()
    },
    getValues(){
      let values = this.$store.getters.getDbVariables[0].paymentAmts
      return values
    }
  }
}
</script>

<style lang="css">
</style>
