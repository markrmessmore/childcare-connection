<template lang="html">
  <v-container>
    <v-card>
      <v-toolbar color="info" dense text>
        <v-icon left>fas fa-file-invoice-dollar</v-icon>
        <v-toolbar-title>Set Program Values</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-tooltip v-model="justTheTip" left>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" icon small outlined @click="justTheTip = !justTheTip">
                <v-icon small>fas fa-question</v-icon>
              </v-btn>
            </template>
            <v-card width="300px" height="auto" color="white">
              <v-card-text class="body-1">
                <v-layout class="subheading" align-center>
                  <v-flex xs10>
                    What is happening here?
                  </v-flex>
                  <v-flex xs2>
                    <v-btn color="secondary" outlined small icon @click="justTheTip = !justTheTip">
                      <v-icon small>fas fa-times</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                The system will use values based on their active date. This will allow you to operate with both current and future amounts without issue.
              </v-card-text>
            </v-card>
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap class="subheading secondary white--text" align-center>
          <v-flex xs3 class="pl-1">
            Type of Care
          </v-flex>
          <v-flex xs2 offset-xs1 class="text-xs-center">
            Current Amount
          </v-flex>
          <v-flex xs2 offset-xs1 class="text-xs-center">
            New Amount
          </v-flex>
          <v-flex xs2 offset-xs1 class="text-xs-center">
            New Amount Starting Date
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap v-for="(amt, title, i) in amounts" :key="i" :class="getColor(i)">
          <!-- Loop through an object -->
          <v-flex xs3>
            {{title}}
          </v-flex>
          <v-flex xs2 offset-xs1 class="text-xs-center">
            <input v-model="amt.currentAmt" class="formbox text-xs-center">
          </v-flex>
          <v-flex xs2 offset-xs1 class="text-xs-center">
            <input v-model="amt.newAmt" class="formbox text-xs-center">
          </v-flex>
          <v-flex xs2 offset-xs1>
            <maskedInput
              v-model="amt.changeDate"
              class="formbox text-xs-center" mask="11 / 11 / 1111">
            </maskedInput>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-right">
          <v-btn color="primary" outlined rounded @click="saveValues()">
            <v-icon left small>fas fa-save</v-icon>
            Save Values
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { sharedFunctions }  from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    programAmts: Object
  },
  data(){
    return {
      amounts: this.programAmts,
      justTheTip: false
    }
  },
  methods: {
    getColor(i){
      if (i%2 == 0){
        return 'grey lighten-3 subheading pa-2'
      }
      else {
        return "subheading pa-2"
      }
    },
    saveValues(){
      this.$store.dispatch('saveVariables', this.amounts)
    }
  },
  computed: {

  }
}
</script>

<style lang="css" scoped>
.formbox {
  width: 100%;
  border-style: solid;
  border-color: #BDBDBD;
  border-width: 0px 0px 1px 0px;
}
</style>
