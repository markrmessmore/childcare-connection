<template lang="html">
  <v-card flat>
    <v-card-text>
      <p class="subheading">
        Click into the appropriate cell. Calculations will be performed automatically.
      </p>
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
          <div slot="header" class="subheading">Primary Applicant</div>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" outline @click="addIncome(true)">
                <v-icon left>add_circle</v-icon>
                Add Applicant Income
              </v-btn>
            </v-card-title>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
<!-- FINANCIAL INFO: CO-APPLICANT -->
    <v-expansion-panel>
      <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
        <div slot="header" class="subheading">Co-applicant</div>
          <v-card flat>
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" outline @click="addIncome(false)">
                <v-icon left>add_circle</v-icon>
                Add Applicant Income
              </v-btn>
            </v-card-title>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <v-layout row wrap>
        <v-flex xs2 offset-xs10>
          <!-- <v-text-field
            readonly
            label="Combined Total:"
            v-model="getGrandTotal"
          ></v-text-field> -->
        </v-flex>
      </v-layout>
    </v-card-text>
    <!-- ADD INCOME DIALOG -->
    <v-dialog
      v-model="addIncomeDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dense dark>
          <v-toolbar-title>Add Income for {{addIncomePerson ? "Applicant" : "Co-Applicant"}}:</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" outline icon small @click="addIncomeDialog = false">
            <v-icon>close</v-icon>
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
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs5>
                  <v-text-field
                    label="Average:"
                    prepend-inner-icon="attach_money"
                    readonly
                    v-model="getTempAvg"
                  ></v-text-field>
                </v-flex>
                <v-flex xs5 offset-xs1>
                  <v-text-field
                    label="Annual:"
                    prepend-inner-icon="attach_money"
                    v-model="getTempAnnual"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn color="primary" small @click="saveIncomeItem()">
            <v-icon left>save</v-icon>
            Save Income
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    appIncome: Array,
    coAppIncome: Array
  },
  data(){
    return{
      addIncomeDialog: false,
      addIncomePerson: true,
      applicant: this.getApplicantIncome,
      coapplicant: this.coAppIncome,
      incomeFrequency: ['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly'],
      incomeType: ['Wages & Salary', 'Pension/Retirement/Supplemental/Social Sec.', 'Unemployment/Workers Comp.', 'Public Assist./TANF', 'Child Support/Alimony', 'Other'],
      tempIncome: {
        type: "",
        frequency: "",
        amount1: 0,
        amount2: 0,
        amount3: 0,
        amount4: 0
      }
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
    saveIncomeItem(){
      console.log(this.applicant)
      // let incomeToPush = this.tempIncome
      // incomeToPush.total = this.getTempAnnual
      // if (this.addIncomePerson === true ){
      //   this.applicant.push(incomeToPush)
      // }
      // else {
      //   this.coapplicant.push(incomeToPush)
      // }
      // this.addIncomeDialog = false
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
    getApplicantIncome(){
      if (Array.isArray(this.appIncome)) {
        console.log('eys')
        return this.appIncome
      }
      else {
        console.log('asdfasdf')
        return []
      }
    }
  }
}
</script>

<style lang="css">
</style>
