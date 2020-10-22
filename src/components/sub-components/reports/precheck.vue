<template lang="html">
  <v-card text>
    <v-toolbar color="grey lighten-3" dense text class="subheading">
      <b>Pre-Check Report</b>: {{fixDate(startDate)}} -- {{fixDate(endDate)}}
      <v-spacer></v-spacer>
      Report Date: {{reportDate()}}
    </v-toolbar>
    <v-card-text>
      <v-layout v-if="typeof filterCases == 'string'">
        {{filterCases}}
      </v-layout>
      <v-layout row wrap v-else v-for="(activeCase, i) in mapCaseRecords(filterCases)" :key="i" class="subheading pb-5">
        <v-flex xs12 class="subheading grey lighten-3">
          {{activeCase.name.toUpperCase()}}
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <span class="body-1 pl-3">
            Account: {{activeCase.cccId}}
          </span>
        </v-flex>
        <v-flex xs10>
          <v-layout row class="body-2">
            <v-flex xs2 class="text-xs-center">
              Case ID
            </v-flex>
            <v-flex xs4>
              Child Name:
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              POS Month:
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              POS Year:
            </v-flex>
            <v-flex xs2 class="text-xs-right">
              Payment:
            </v-flex>
          </v-layout>
          <br>
          <v-layout row wrap v-for="(rec, n) in activeCase.records" :key="n">
            <v-flex xs2 class="text-xs-center">
              {{rec.caseId}}
            </v-flex>
            <v-flex xs4>
              {{rec.child}}
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              {{rec.month}}
            </v-flex>
            <v-flex xs2 class="text-xs-center">
              {{rec.year}}
            </v-flex>
            <v-flex xs2 class="text-xs-right">
              {{rec.amount}}
            </v-flex>
          </v-layout>
          <br>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs4 offset-xs8 class="body-2">
              <v-layout row wrap>
                <v-flex xs6 class="text-xs-center">
                  TOTAL:
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  ${{getTotal(activeCase.records)}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    allCases  : Array,
    dateReset : String,
    endDate   : String,
    startDate : String
  },
  methods: {
    fixDate(str){
      let date = str.split('-')
      return `${date[1]}/${date[2]}/${date[0]}`
    },
    getTotal(rec){
      let total = 0
      rec.forEach(item => total = total + Number(item.amount))
      return total.toFixed(2)
    },
    mapCaseRecords(recordList){
      let mappedList  = []
      let provList    = this.getProviders
      if (typeof recordList == 'string') {
        return "No attendance records are found that fall within the dates above."
      }
      else {
        recordList.forEach(item => {
        let existing = mappedList.find(rec => rec.name == item.facility )
        //IF THERE IS NO RECORD FOR THIS PROVIDER CREATE ONE:
        if (existing == undefined) {
          let providerInfo = provList.find(prov => {
            return prov.name == item.facility
          })
          let newRecord = {
            name    : item.facility,
            cccId   : providerInfo.cccId,
            records : []
          }
          let initial = {
            caseId  : item.caseId,
            amount  : item.amount,
            child   : item.child,
            month   : item.month.slice(-3),
            year    : item.year
          }
          newRecord.records.push(initial)
          mappedList.push(newRecord)
        }
        //IF THERE IS A RECORD FOR THIS PROVIDER, ADD TO IT.
        else {
          let nextRecord = {
            caseId  : item.caseId,
            amount  : item.amount,
            child   : item.child,
            month   : item.month.slice(-3),
            year    : item.year
          }
          existing.records.push(nextRecord)
        }
      })
      return mappedList.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        else {
          return -1
        }
      })
      }
    },
    reportDate(){
      return moment().format('MM/DD/YYYY')
    }
  },
  computed: {
    filterCases(){
      let start = moment(this.startDate.split('-').join(""), "YYYYMMDD")
      let end   = moment(this.endDate.split('-').join(""), "YYYYMMDD")
      let filteredCases = []
      this.allCases.filter(rec => {
        return rec.attendance.forEach(item => {
          let attDate = moment(`${item.month.slice(0,2)}01${item.year}`, "MMDDYYYY")
          if (moment(attDate).isBetween(start, end)) {
            item.caseId = rec.caseId
            return filteredCases.push(item)
          }
        })
      })
      return filteredCases.length > 0 ? filteredCases : "No attendance records are found that fall within the dates above."
    },
    getProviders(){
      return this.$store.getters.getProviders
    }
  }
}
</script>

<style lang="css" scoped>
</style>
