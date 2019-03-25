<template lang="html">
  <v-card flat>
    <v-card-text>
      <div class="text-xs-right">
        <v-btn color="primary" @click="addChild()" round outline>
          <v-icon>add</v-icon>
          Add Child
        </v-btn>
      </div>
      <v-card v-for="(kid, index) in children" class="mb-1 mt-1" :key="index" :color="getColor(index)">
        <v-card-title class="subheading">
          Child {{`0${index+1}`}}
          <v-spacer></v-spacer>
          <v-btn color="primary" small icon outline @click="confirmDel(index)">
            <v-icon color="primary">close</v-icon>
          </v-btn>
          <!-- DELETE CHILD RECORD CONFIRM DIALOG -->
          <v-dialog
            v-model="confirmChildDel"
            persistent :overlay="false"
            max-width="500px"
            transition="dialog-transition"
          >
            <v-card>
              <v-toolbar color="primary" dark dense>
                <v-icon>fas fa-question-circle</v-icon>
                <v-toolbar-title>
                  Remove child record: {{childRecordToRemove}}?
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout row justify-space-around>
                  <v-btn color="primary" @click="removeChildRecord()" round outline>
                    <v-icon left>check</v-icon>
                    Yes
                  </v-btn>
                  <v-btn color="red darken-3" outline @click="confirmChildDel = !confirmChildDel" round>
                    <v-icon left>close</v-icon>
                    No
                  </v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-divider inset></v-divider>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs3>
              <v-text-field
                label="First Name"

                v-model="kid.firstName"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 offset-xs1>
              <v-text-field
                label="Mid. Init."

                v-model="kid.midInitial"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-text-field
                label="Last Name"

                v-model="kid.lastName"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 offset-xs1>
              <v-text-field
                label="Child-ID"
                readonly
                :value="getChildId(index + 1)"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                label="Child Social Security Number"

                mask="social"
                v-model="kid.ssn"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-text-field
                label="Child Date of Birth"

                mask="##-##-####"
                v-model="kid.dob"
              ></v-text-field>
            </v-flex>
            <v-flex xs3 offset-xs1>
              <v-text-field  label="Age" readonly :value="getAge(kid.dob)"></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-select
                :items="gender"
                v-model="kid.gender"
                label="Gender"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                multiple
                :items="careType"
                v-model="kid.typeOfCare"
                label="Type Of Care"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    kidInfo: Array
  },
  data(){
    return{
      careType: ["Full Day", "Before School", "After School", "Summer Camp", "None"],
      childRecordToRemove: "",
      children: this.kidInfo,
      confirmChildDel: false,
      gender: ["Female", "Male"],
    }
  },
  methods: {
    addChild(){
      let blankChild = {
        childId             : null,
        lastName            : "",
        midInitial          : "",
        firstName           : "",
        gender              : "",
        ssn                 : "",
        dob                 : "",
        age                 : "",
        typeOfCare          : []
      }
      if (this.children){
        this.children.push(blankChild)
      }
      else {
        this.children = []
        this.children.push(blankChild)
      }
    },
    confirmDel(index){
      this.childRecordToRemove = this.getChildId(index + 1)
      this.confirmChildDel     = true
    },
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
    getChildId(id){
      return `0${id}`
    },
    getColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-2"
      }
    },
    removeChildRecord(){
      this.children.splice((Number(this.childRecordToRemove) - 1), 1)
      this.confirmChildDel = false
    }
  }
}
</script>

<style lang="css">
</style>
