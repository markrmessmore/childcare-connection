<template lang="html">
  <v-card flat>
    <v-card-text>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" large @click="printForm('papaLetter')">
          <v-icon left>note</v-icon>
          PAPA Letter
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>description</v-icon>
          PAPA
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>close</v-icon>
          Termination Letter
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>date_range</v-icon>
          Attendance Voucher
        </v-btn>
      </v-layout>
      <br>
      <v-layout class="secondary white--text">
        <v-flex xs6 class="subheading ma-1">
            Eligibility Notification Letters
        </v-flex>
      </v-layout>
      <v-divider inset></v-divider>
      <br>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" large>
          <v-icon left>check</v-icon>
          Accepted
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>access_time</v-icon>
          Waiting List
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>pause</v-icon>
          Pending
        </v-btn>
        <v-btn color="primary" large>
          <v-icon left>not_interested</v-icon>
          Ineligible
        </v-btn>
      </v-layout>
    </v-card-text>
    <v-dialog
      v-model="printDialog"
      scrollable fullscreen
      persistent :overlay="true"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="">
          <v-btn color="primary" outline>Print Form</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" outline icon @click="printDialog=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs3>
              <v-img :src="require('@/assets/mercerBW.png')" height="200px" width="auto" contain></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import * as jsPDF from 'jspdf'
export default {
  props: {
    caseInfo: Object
  },
  data(){
    return{
      printDialog: false
    }
  },
  methods: {
    printForm(id){
      this.printDialog = true
    }
  }
}
</script>

<style lang="css">
</style>

<!-- ADD BUTTONS FOR THE FOLLOWING LETTERS:
* When clicked generate a PDF based on the record info (and provided letters) that can be printed
-->
