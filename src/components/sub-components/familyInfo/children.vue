<template lang="html">
  <v-card flat>
    <v-card-text>
      <div class="text-xs-right">
        <v-btn color="primary" @click="addChild()" round outline small>
          <v-icon small left>fas fa-plus</v-icon>
          Add Child
        </v-btn>
      </div>
      <v-form ref="form">
        <v-card v-for="(kid, index) in children" class="mb-1 mt-1" :key="index" :color="getColor(index)">
          <v-card-title class="subheading">
            Child {{`0${index+1}`}}
            <v-spacer></v-spacer>
            <v-btn color="primary" small icon outline @click="confirmDel(index)">
              <v-icon color="primary">fas fa-times</v-icon>
            </v-btn>
            <!-- DELETE CHILD RECORD CONFIRM DIALOG -->
            <v-dialog
              v-model="confirmChildDel"
              persistent :overlay="false"
              max-width="500px"
              transition="dialog-transition"
            >
              <v-card flat>
                <v-toolbar color="primary" flat dark dense>
                  <v-icon>fas fa-question-circle</v-icon>
                  <v-toolbar-title>
                    Remove child record: {{childRecordToRemove}}?
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-layout row justify-space-around>
                    <v-btn color="primary" @click="removeChildRecord()" round outline>
                      <v-icon left>fas fa-check</v-icon>
                      Yes
                    </v-btn>
                    <v-btn color="red darken-3" outline @click="confirmChildDel = !confirmChildDel" round>
                      <v-icon left>fas fa-times</v-icon>
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
                  :rules="[checkField.required, checkField.length]"
                  @change="checkReady()"
                ></v-text-field>
              </v-flex>
              <v-flex xs1 offset-xs1>
                <v-text-field
                  label="Mid. Init."
                  v-model="kid.midInitial"
                  :rules="[checkField.required]"
                  @change="checkReady()"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  label="Last Name"
                  v-model="kid.lastName"
                  :rules="[checkField.required, checkField.length]"
                  @change="checkReady()"
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
                <!-- IF THE CASE IS NEW IT WILL HAVE THE ID OF 1111 OTHERWISE IT WILL NOT. THIS IMPACTS IF THE SSN IS DISPLAYABLE OR JUST CAN BE REFERENCED BY THE LAST FOUR -->
                <v-text-field
                  v-if="caseId == 1111"
                  label="Child Social Security Number"
                  mask="social"
                  v-model="kid.ssn"
                  type="password"
                  :type="showAppSsn? 'password' : 'text'"
                  :rules="[checkField.required, checkField.ssn]"
                  :append-icon="showAppSsn ? 'far fa-eye-slash' : 'far fa-eye'"
                  @click:append="showAppSsn = !showAppSsn"
                  @change="checkReady()"
                ></v-text-field>
                <v-tooltip top v-else>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Child Social Security Number"
                      mask="social"
                      v-model="kid.ssn"
                      type="password"
                      v-on="on"
                      :rules="[checkField.required, checkField.ssn]"
                      @change="checkReady()"
                    ></v-text-field>
                  </template>
                  <span>SSN ending in :  {{kid.ssn.slice(-4)}}</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs2 offset-xs1>
                <v-text-field
                  label="Child Date of Birth"
                  mask="##-##-####"
                  v-model="kid.dob"
                  :rules="[checkField.required, checkField.dob]"
                  @change="checkReady()"
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
                  :rules="[checkField.required]"
                  @change="checkReady()"
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  multiple
                  :items="careType"
                  v-model="kid.typeOfCare"
                  label="Type Of Care"
                  :rules="[checkField.required, checkField.arrayReq]"
                  @change="checkReady()"
                ></v-select>
              </v-flex>
              <!-- DO NOT SHOW THESE FIELDS IF IT IS AN APPLICATION -->
              <v-flex xs4 offset-xs1 v-if="caseId != 1111">
                <v-select
                  :items="childStatus"
                  v-model="kid.kidStatus"
                  label="Child Status:"
                ></v-select>
              </v-flex>
              <v-flex xs2 offset-xs1 v-if="caseId != 1111">
                <v-text-field
                  label="Status Date:"
                  mask="##/##/####"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-form>
    </v-card-text>
      <v-layout row wrap>
        <v-flex xs1>
          <slot name="prev"></slot>
        </v-flex>
        <v-flex xs2 offset-xs9 class="text-xs-right">
          <slot name="next" v-bind:checkActive="readyToSubmit"></slot>
        </v-flex>
      </v-layout>
  </v-card>
</template>

<script>
import {sharedFunctions} from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    caseId  : Number,
    kidInfo : Array
  },
  data(){
    return{
      careType            : ["Full Day", "Before School", "After School", "Summer Camp", "None"],
      childRecordToRemove : "",
      childStatus         : ["Active", "Inactive", "Pending", "Terminated", "Waiting List"],
      children            : this.kidInfo,
      confirmChildDel     : false,
      gender              : ["Female", "Male"],
      readyToSubmit       : false,
      showAppSsn          : true
    }
  },
  methods: {
    addChild(){
      this.checkReady()
      let blankChild = {
        childId             : this.getChildId,
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
    checkReady(){
      if (this.children.length > 0 && this.$refs.form.validate()){
        this.readyToSubmit = true
      }
      else {
        this.readyToSubmit = false
      }
    },
    confirmDel(index){
      this.childRecordToRemove = this.getChildId(index + 1)
      this.confirmChildDel     = true
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
