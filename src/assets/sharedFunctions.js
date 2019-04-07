export const sharedFunctions = {
  methods: {
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
  }
}
