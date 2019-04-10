<template lang="html">
  <v-card flat>
    <v-toolbar color="grey lighten-3" dense class="subheading">
      Pre-Check Report: {{fixDate(startDate)}} -- {{fixDate(endDate)}}
    </v-toolbar>
    <v-card-text>
      {{mapCaseRecords(filterCases)}}
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
    mapCaseRecords(list){
      console.log(list)
      list.reduce((finalMap, current) => {
        // console.log(current)
      })
      return list
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
            return filteredCases.push(item)
          }
        })
      })
      return filteredCases.length > 0 ? filteredCases : "No attendance records are found that fall within the dates above."
    }
  }
}
</script>

<style lang="css" scoped>
</style>
