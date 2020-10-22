<template lang="html">
  <v-layout row wrap>
    <v-flex xs12>
      <v-alert color="accent2" :value="true" outlined class="text-xs-center">
        <slot name="alert"></slot>
      </v-alert>
      <v-layout row wrap>
        <v-flex xs5>
          <v-layout row wrap class="secondary white--text pl-1">
            Begin Date:
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3>
              <v-autocomplete
                :items="months"
                v-model="startDate.month"
                label="Month"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-autocomplete
                :items="getDays"
                v-model="startDate.day"
                label="Day"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-autocomplete
                :items="years"
                v-model="startDate.year"
                label="Year"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6 offset-xs1>
          <v-layout row wrap class="secondary white--text pl-1">
            End Date:
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3>
              <v-autocomplete
                :items="months"
                v-model="endDate.month"
                label="Month"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-autocomplete
                :items="getDays"
                v-model="endDate.day"
                label="Day"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-autocomplete
                :items="years"
                v-model="endDate.year"
                label="Year"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="text-xs-right">
      <v-btn color="primary" outlined rounded small :disabled="readyToGenerate" @click="setDates()">
        <v-icon left>fas fa-sync</v-icon>
        Generate Report
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    resetCode: String
  },
  watch: {
    resetCode: function(){
      this.endDate = {
        month: "",
        day: "",
        year: ""
      },
      this.startDate = {
        month: "",
        day: "",
        year: ""
      }
      this.setDates()
    }
  },
  data(){
    return{
      endDate: {
        month: "",
        day: "",
        year: ""
      },
      months: ['01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun', '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'],
      startDate: {
        month: "",
        day: "",
        year: ""
      },
      years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    }
  },
  methods: {
    setDates(){
      this.$emit('reportStart', this.startDate)
      this.$emit('reportEnd', this.endDate)
    }
  },
  computed: {
    getDays(){
      let month = this.startDate.month
      if (month.startsWith('02')) {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
      }
      else if (month.startsWith('04') || month.startsWith('06') || month.startsWith('09') || month.startsWith('11')){
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
      }
      else {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
      }
    },
    readyToGenerate(){
      if (this.endDate.month == "" || this.endDate.day == "" || this.endDate.year == "" || this.startDate.day == "" || this.startDate.month == "" || this.startDate.year == ""){
        return true
      }
      else {
        return false
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
