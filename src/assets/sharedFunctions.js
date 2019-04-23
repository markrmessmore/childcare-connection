import moment from 'moment'
export const sharedFunctions = {
  methods: {
    getAge(dob){
      let now   = moment()
      let year  = dob.substr(4,4)
      let month = dob.substr(0,2)
      let day   = dob.substr(2,2)
      let bday  = moment(`${month}-${day}-${year}`, "MM-DD-YYYY")
      let difference = now.diff(bday, 'months')
      let ageYears = (difference/12).toString().split(".")[0]
      let ageMonths = (difference % 12)
      if (dob == ""){
        return ""
      }
      else {
        return `${ageYears} years, ${ageMonths} months`
      }
    },
    formatDate(dateStr){
      let month = dateStr.slice(0,2)
      let day   = dateStr.slice(2,4)
      let year  = dateStr.slice(4,8)
      return `${month}/${day}/${year}`
    },
    formatPhone(phone){
      if (phone) {
        return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`
      }
      else {
        return ""
      }
    },
    formatSsn(str){
      let first = str.slice(0,3)
      let sec   = str.slice(3,5)
      let last  = str.slice(5)
      return `${first}-${sec}-${last}`
    },
    maskSocial(str){
      return `XXX-XX-${str.slice(-4)}`
    },
    switchDate(type){
      if (type == 'start'){
        return `${this.startDate.year}-${this.startDate.month.slice(0,2)}-${this.startDate.day}`
      }
      if (type == 'end') {
        return `${this.endDate.year}-${this.endDate.month.slice(0,2)}-${this.endDate.day}`
      }
    }
  }
}
