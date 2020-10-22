<template lang="html">
  <v-card text>
    <v-card-text>
      <p class="subheading">
        Click into the appropriate cell. Calculations will be performed automatically.
      </p>
      <v-expansion-panel class="elevation-0">
        <v-expansion-panel-content lazy class="info">
          <div slot="header" class="subheading">PRIMARY APPLICANT</div>
          <v-card text>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="addIncome(true)" rounded outlined small>
                <v-icon left small>fas fa-plus-circle</v-icon>
                Add Applicant Income
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-card color="primary" v-if="this.applicant.income" text>
                <v-card-text>
                  <v-layout row wrap class="subheading text-xs-left">
                    <v-flex xs5>
                      Income Type
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      Frequency
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      Annual Total
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-card text v-for="(record, index) in this.applicant.income" text :key='index' :color="getCardColor(index)">
                <v-card-text>
                  <v-layout row wrap class="subheading">
                    <v-flex xs5>
                      {{record.type}}
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      {{record.frequency}}
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      ${{record.total}}
                    </v-flex>
                    <v-flex xs1 class="text-xs-right">
                      <v-btn color="primary" icon outline small @click="confirmDelete('app', index)">
                        <v-icon small>fas fa-trash</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
<!-- FINANCIAL INFO: CO-APPLICANT -->
    <v-expansion-panel class="elevation-0">
      <v-expansion-panel-content lazy class="info">
        <div slot="header" class="subheading">CO-APPLICANT</div>
          <v-card text>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" outline @click="addIncome(false)" rounded outlined small>
                <v-icon left>fas fa-plus-circle</v-icon>
                Add Applicant Income
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-card color="primary" v-if="this.coapplicant.income" text>
                <v-card-text>
                  <v-layout row wrap class="subheading text-xs-left">
                    <v-flex xs5>
                      Income Type
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      Frequency
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      Annual Total
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-card v-for="(record, index) in this.coapplicant.income" text :key='index' :color="getCardColor(index)">
                <v-card-text>
                  <v-layout row wrap class="subheading">
                    <v-flex xs5>
                      {{record.type}}
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      {{record.frequency}}
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                      ${{record.total}}
                    </v-flex>
                    <v-flex xs1 class="text-xs-right">
                      <v-btn color="primary" icon outline small @click="confirmDelete('coapp', index)">
                        <v-icon small>fas fa-trash</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
    </v-card-text>
      <v-layout row wrap>
        <v-flex xs1>
          <slot name="prev"></slot>
        </v-flex>
        <v-flex xs2 offset-xs9 class="text-xs-right">
          <slot name="next" v-bind:checkActive="checkReady()"></slot>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-toolbar color="info" dense v-if="this.applicant.income" text>
      <v-layout row wrap class="subheading">
        <v-flex xs10 class="text-xs-left pl-2">
          HOUSEHOLD TOTAL:
        </v-flex>
        <v-flex xs2 class="text-xs-right pr-2">
          ${{getTotal()}}
        </v-flex>
      </v-layout>
    </v-toolbar>
    <!-- ADD INCOME DIALOG -->
    <v-dialog
      v-model="addIncomeDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card text>
        <v-toolbar color="primary" dense dark text>
          <v-toolbar-title>Add Income for {{addIncomePerson ? "Applicant" : "Co-Applicant"}}:</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" outline icon small @click="addIncomeDialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :items="incomeType"
                v-model="tempIncome.type"
                label="Income Type:"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                :items="incomeFrequency"
                v-model="tempIncome.frequency"
                label="Frequency:"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout v-if="tempIncome.frequency">
            <v-flex xs2>
              <v-text-field
                label="Amount 1"
                v-model="tempIncome.amount1"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1 v-if="tempIncome.frequency != 'Monthly'">
              <v-text-field
                label="Amount 2"
                v-model="tempIncome.amount2"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1 v-if="tempIncome.frequency == 'Weekly'">
              <v-text-field
                label="Amount 3"
                v-model="tempIncome.amount3"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1 v-if="tempIncome.frequency == 'Weekly'">
              <v-text-field
                label="Amount 4"
                v-model="tempIncome.amount4"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-card text>
            <v-form ref="addIncomeForm">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs5>
                    <v-text-field
                      label="Average:"
                      prepend-inner-icon="fas fa-dollar-sign"
                      readonly
                      v-model="getTempAvg"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs5 offset-xs2>
                    <v-text-field
                      label="ANNUAL:"
                      prepend-inner-icon="fas fa-dollar-sign"
                      v-model="getTempAnnual"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-form>
          </v-card>
        </v-card-text>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn color="primary" small @click="saveIncomeItem()" outlined rounded :disabled="!getTempAnnual || getTempAnnual == '0.00'">
            <v-icon left small>fas fa-save</v-icon>
            Save Income
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card text>
        <v-toolbar color="primary" class="title" dark dense text>
          <v-icon>fas fa-question-circle</v-icon>
          <v-toolbar-title>Delete this income record?</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-space-around>
            <v-btn color="primary" @click="delRecord()" rounded outlined>
              <v-icon left>fas fa-check</v-icon>
              Yes
            </v-btn>
            <v-btn color="red darken-4" @click="deleteDialog = false" dark rounded outlined>
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
import { sharedFunctions } from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    appIncome: Object,
    coAppIncome: Object
  },
  data(){
    return{
      addIncomeDialog : false,
      addIncomePerson : true,
      applicant       : this.appIncome,
      coapplicant     : this.coAppIncome,
      deleteDialog    : false,
      readyToSubmit   : false,
      tempIncome: {
        type: "",
        frequency: "",
        amount1: 0,
        amount2: 0,
        amount3: 0,
        amount4: 0
      },
      whomToDel: "",
      whomToDelIndex: null,
    }
  },
  methods: {
    addIncome(forWhom){
      this.tempIncome = {
        type: "",
        frequency: "",
        amount1: 0,
        amount2: 0,
        amount3: 0,
        amount4: 0
      }
      this.addIncomeDialog = true
      this.addIncomePerson = forWhom
    },
    checkReady(){
      if (this.applicant.income.length > 0 || this.coapplicant.income.length > 0){
        return true
      }
      else {
        return false
      }
    },
    confirmDelete(forWhom, index){
      this.deleteDialog = true
      this.whomToDel = forWhom
      this.whomToDelIndex = index
    },
    delRecord(){
      if (this.whomToDel == "app"){
        this.applicant.income.splice(this.whomToDelIndex, 1)
      }
      else {
        this.coapplicant.income.splice(this.whomToDelIndex, 1)
      }
      this.deleteDialog = false
    },
    getCardColor(i){
      if (i % 2 != 0) {
        return "grey lighten-5"
      }
      else {
        return "white"
      }
    },
    getTotal(){
      let grandTotal = 0
      let app = this.applicant.income
      let coapp = this.coapplicant.income
      if (app){
        app.forEach(item => {
          grandTotal = grandTotal + Number(item.total)
        })
      }
      if (coapp){
        coapp.forEach(item => {
          grandTotal = grandTotal + Number(item.total)
        })
      }
      return grandTotal.toFixed(2)
    },
    saveIncomeItem(){
      let incomeRecord = this.tempIncome
      incomeRecord.total = this.getTempAnnual
      if (this.addIncomePerson === true ){
        if (this.applicant.income) {
            this.applicant.income.push(incomeRecord)
        }
        else {
          this.applicant['income'] = [incomeRecord]
        }
      }
      else {
        if (this.coapplicant.income) {
            this.coapplicant.income.push(incomeRecord)
        }
        else {
          this.coapplicant['income'] = [incomeRecord]
        }
      }
      this.addIncomeDialog = false
    }
  },
  computed: {
    getTempAvg(){
      if (this.tempIncome.frequency == "Weekly"){
        return ((Number(this.tempIncome.amount1) + Number(this.tempIncome.amount2) + Number(this.tempIncome.amount3) + Number(this.tempIncome.amount4))/4).toFixed(2)
      }
      else if (this.tempIncome.frequency == "Monthly") {
        return Number(this.tempIncome.amount1).toFixed(2)
      }
      else {
        return ((Number(this.tempIncome.amount1) + Number(this.tempIncome.amount2))/2).toFixed(2)
      }
    },
    getTempAnnual(){
      let avg = this.getTempAvg
      this.checkReady()
      if (this.tempIncome.frequency == "Weekly"){
        return (avg * 52).toFixed(2)
      }
      else if (this.tempIncome.frequency == "Bi-Weekly") {
        return (avg * 26).toFixed(2)
      }
      else if (this.tempIncome.frequency == "Semi-Monthly") {
        return (avg * 24).toFixed(2)
      }
      else {
        return (avg * 12).toFixed(2)
      }
    },
    incomeFrequency(){
      return this.$store.getters.getIncomeFrequency
    },
    incomeType(){
      return this.$store.getters.getIncomeType
    }
  }
}
</script>

<style lang="css">
</style>
