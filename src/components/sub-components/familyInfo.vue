<template lang="html">
  <div class="">
    <br>
    <!-- APPLICANT INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Applicant Information</div>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4 class="ma-1">
                  <v-text-field
                    label="Applicant First Name"
                    v-model="familyInfo.applicant.firstName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 class="ma-1">
                  <v-text-field
                    label="Mid. Init."
                    v-model="familyInfo.applicant.midInitial">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="ma-1">
                  <v-text-field
                    label="Applicant Last Name"
                    v-model="familyInfo.applicant.lastName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 class="ma-1">
                  <v-text-field
                    label="Applicant Social Security Number"
                    v-model="familyInfo.applicant.ssn"
                    mask="social"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="ma-1">
                  <v-select
                    label="Relationship to Child(ren)"
                    :items="relationshipItems"
                    v-model="familyInfo.applicant.appRelation"
                    >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- CO-APPLICANT INFORMATION -->
      <br>
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="grey white--text elevation-3">
          <div class="subheading" slot="header">Co-applicant Information</div>
          <v-card flat>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4 class="ma-1">
                  <v-text-field
                    label="Co-applicant First Name"
                    v-model="familyInfo.coapplicant.firstName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs1 class="ma-1">
                  <v-text-field

                    label="Mid. Init."
                    v-model="familyInfo.coapplicant.midInitial">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="ma-1">
                  <v-text-field
                    label="Co-applicant Last Name"
                    v-model="familyInfo.coapplicant.lastName"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs5 class="ma-1">
                  <v-text-field
                    label="Co-pplicant Social Security Number"
                    v-model="familyInfo.coapplicant.ssn"
                    mask="social"
                    >
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="ma-1">
                  <v-select
                    label="Co-applicant Relationship to Child(ren)"
                    :items="relationshipItems"
                    v-model="familyInfo.coapplicant.appRelation"
                    >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- HOME INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Home Information</div>
          <v-card flat>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Address"

                    v-model="familyInfo.address"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Address 2"

                    v-model="familyInfo.address2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs5 class="ma-1">
                  <v-text-field

                    label="City"
                    v-model="familyInfo.city"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field

                    label="State"
                    v-model="familyInfo.state"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 class="ma-1">
                  <v-text-field

                    label="Zip"
                    v-model="familyInfo.zip"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field

                    label="Home Phone"
                    v-model="familyInfo.homephone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field

                    label="Cell Phone"
                    v-model="familyInfo.cellphone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field
                    label="# of Adults in the Home"

                    @blur="calcFamily()"
                    v-model="familyInfo.numAdults"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field
                    label="# of Kids in the Home"

                    v-model="familyInfo.numKids"
                    @blur="calcFamily()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field
                  label="Total # in Home"

                  readonly
                  v-model="calcFamily"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- FINANCIAL INFO: APPLICANT -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 grey white--text">
          <div class="subheading" slot="header">Family Income Information</div>
          <v-card flat>
            <v-card-text>
              <p class="subheading">
                Click into the appropriate cell. Calculations will be performed automatically.
              </p>
              <v-expansion-panel>
                <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
                  <div slot="header" class="subheading">Primary Applicant</div>
                  <v-data-table
                    :headers="incomeHeaders"
                    :items="familyInfo.applicant.income"
                    hide-actions
                    item-key="id"
                  >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-left subheading">{{props.item.title}}</td>
                      <td class="" @blur="calcTotal(props.item)">
                        <v-text-field
                          prepend-inner-icon="attach_money"
                          v-model="props.item.weekly"
                        >
                        </v-text-field>
                      </td>
                      <td class="" @blur="calcTotal(props.item)">
                        <v-text-field
                          prepend-inner-icon="attach_money"
                          v-model="props.item.biWeekly"
                        >
                        </v-text-field>
                      </td>
                      <td class="" @blur="calcTotal(props.item)">
                        <v-text-field
                          prepend-inner-icon="attach_money"
                          v-model="props.item.monthly"
                        >
                        </v-text-field>
                      </td>
                      <td class="" @blur="calcTotal(props.item)">
                        <v-text-field
                          prepend-inner-icon="attach_money"
                          v-model="props.item.annually"
                        >
                        </v-text-field>
                      </td>
                      <td class="text-xs-right">${{calcTotal(props.item)}}</td>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <br>
      <!-- FINANCIAL INFO: CO-APPLICANT -->
            <v-expansion-panel>
              <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
                <div slot="header" class="subheading">Co-applicant</div>
                  <v-card flat>
                    <v-card-text>
                      <v-data-table
                        :headers="incomeHeaders"
                        :items="familyInfo.coapplicant.income"
                        hide-actions
                        item-key="id"
                      >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left subheading">{{props.item.title}}</td>
                          <td class="subheading" @blur="calcTotal(props.item)">
                            <v-text-field
                              prepend-inner-icon="attach_money"
                              v-model="props.item.weekly"
                            >
                            </v-text-field>
                          </td>
                          <td class="subheading" @blur="calcTotal(props.item)">
                            <v-text-field
                              prepend-inner-icon="attach_money"
                              v-model="props.item.biWeekly"
                            >
                            </v-text-field>
                          </td>
                          <td class="subheading" @blur="calcTotal(props.item)">
                            <v-text-field
                              prepend-inner-icon="attach_money"
                              v-model="props.item.monthly"
                            >
                            </v-text-field>
                          </td>
                          <td class="subheading" @blur="calcTotal(props.item)">
                            <v-text-field
                              prepend-inner-icon="attach_money"
                              v-model="props.item.biWeekly"
                            >
                            </v-text-field>
                          </td>
                          <td class="text-xs-right subheading">{{calcTotal(props.item)}}</td>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- WORK/SCHOOL/TRAINING INFO -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3">
          <div class="subheading" slot="header">Work/School/Training Information</div>
          <v-card flat>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
                  <div class="subheading" slot="header">Primary Applicant</div>
                  <v-card>
                    <v-card-text>
                      <v-toolbar dense flat color="primary lighten-2" class="subheading">Primary Location</v-toolbar>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="Name of the Location"
                            v-model="familyInfo.applicant.primaryWork.locationName"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationItems"
                            v-model="familyInfo.applicant.primaryWork.type"
                            label="Type of Location"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationStatus"
                            v-model="familyInfo.applicant.primaryWork.status"
                            label="Employment Status"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Hours/Week"
                            v-model="familyInfo.applicant.primaryWork.hoursPerWeek"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Months/Year"
                            v-model="familyInfo.applicant.primaryWork.monthsPerYear"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 class="ma-1">
                          <v-text-field
                            label="Location Address"
                            v-model="familyInfo.applicant.primaryWork.address"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="City"
                            v-model="familyInfo.applicant.primaryWork.city"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="State"
                            v-model="familyInfo.applicant.primaryWork.state"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Zip"
                            v-model="familyInfo.applicant.primaryWork.zip"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Phone"
                            v-model="familyInfo.applicant.primaryWork.phone"
                            mask="phone"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Ext"
                            v-model="familyInfo.applicant.primaryWork.phoneext"
                            >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-toolbar color="primary lighten-2" class="subheading" dense flat>Secondary Location</v-toolbar>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="Name of the Location"
                            v-model="familyInfo.applicant.secondaryWork.locationName"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationItems"
                            v-model="familyInfo.applicant.secondaryWork.type"
                            label="Type of Location"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationStatus"
                            v-model="familyInfo.applicant.secondaryWork.status"
                            label="Employment Status"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Hours/Week"
                            v-model="familyInfo.applicant.secondaryWork.hoursPerWeek"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Months/Year"
                            v-model="familyInfo.applicant.secondaryWork.monthsPerYear"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 class="ma-1">
                          <v-text-field
                            label="Location Address"
                            v-model="familyInfo.applicant.secondaryWork.address"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="City"
                            v-model="familyInfo.applicant.secondaryWork.city"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="State"
                            v-model="familyInfo.applicant.secondaryWork.state"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Zip"
                            v-model="familyInfo.applicant.secondaryWork.zip"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Phone"
                            v-model="familyInfo.applicant.secondaryWork.phone"
                            mask="phone"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Ext"
                            v-model="familyInfo.coapplicant.secondaryWork.phoneext"
                            >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <br>
              <v-expansion-panel>
                <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
                  <div class="subheading" slot="header">Co-applicant</div>
                  <v-card>
                    <v-card-text>
                      <v-toolbar dense flat color="primary lighten-2" class="subheading">Primary Location</v-toolbar>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="Name of the Location"
                            v-model="familyInfo.coapplicant.primaryWork.locationName"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationItems"
                            v-model="familyInfo.coapplicant.primaryWork.type"
                            label="Type of Location"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationStatus"
                            v-model="familyInfo.coapplicant.primaryWork.status"
                            label="Employment Status"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Hours/Week"
                            v-model="familyInfo.coapplicant.primaryWork.hoursPerWeek"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Months/Year"
                            v-model="familyInfo.coapplicant.primaryWork.monthsPerYear"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 class="ma-1">
                          <v-text-field
                            label="Location Address"
                            v-model="familyInfo.coapplicant.primaryWork.address"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="City"
                            v-model="familyInfo.coapplicant.primaryWork.city"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="State"
                            v-model="familyInfo.coapplicant.primaryWork.state"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Zip"
                            v-model="familyInfo.coapplicant.primaryWork.zip"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Phone"
                            v-model="familyInfo.coapplicant.primaryWork.phone"
                            mask="phone"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Ext"
                            v-model="familyInfo.coapplicant.primaryWork.phoneext"
                            >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-toolbar color="primary lighten-2" class="subheading" dense flat>Secondary Location</v-toolbar>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="Name of the Location"
                            v-model="familyInfo.coapplicant.secondaryWork.locationName"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationItems"
                            v-model="familyInfo.coapplicant.secondaryWork.type"
                            label="Type of Location"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-select

                            :items="locationStatus"
                            v-model="familyInfo.coapplicant.secondaryWork.status"
                            label="Employment Status"
                          ></v-select>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Hours/Week"
                            v-model="familyInfo.coapplicant.secondaryWork.hoursPerWeek"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Months/Year"
                            v-model="familyInfo.coapplicant.secondaryWork.monthsPerYear"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 class="ma-1">
                          <v-text-field
                            label="Location Address"
                            v-model="familyInfo.coapplicant.secondaryWork.address"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="ma-1">
                          <v-text-field
                            label="City"
                            v-model="familyInfo.coapplicant.secondaryWork.city"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="State"
                            v-model="familyInfo.coapplicant.secondaryWork.state"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Zip"
                            v-model="familyInfo.coapplicant.secondaryWork.zip"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Phone"
                            v-model="familyInfo.coapplicant.secondaryWork.phone"
                            mask="phone"
                            >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs2 class="ma-1">
                          <v-text-field
                            label="Ext"
                            v-model="familyInfo.coapplicant.secondaryWork.phoneext"
                            >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
      <!-- CHILD INFORMATION -->
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 grey white--text">
          <div class="subheading" slot="header">Child Information</div>
          <v-card flat>
            <v-card-text>
              <div class="text-xs-right">
                <v-btn color="primary" @click="addChild()">
                  <v-icon>add</v-icon>
                  Add Child
                </v-btn>
              </div>
              <v-card v-for="(kid, index) in familyInfo.children" class="mb-1 mt-1" :key="index" :color="getColor(index)">
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
                      <v-toolbar color="secondary" dark dense>
                        <v-toolbar-title>
                          Remove child record: {{childRecordToRemove}}?
                        </v-toolbar-title>
                      </v-toolbar>
                      <v-layout row justify-space-around>
                        <v-btn color="primary" @click="removeChildRecord()">
                          <v-icon left>check</v-icon>
                          Yes
                        </v-btn>
                        <v-btn color="red darken-3" outline @click="confirmChildDel = !confirmChildDel">
                          <v-icon left>close</v-icon>
                          No
                        </v-btn>
                      </v-layout>
                    </v-card>
                  </v-dialog>
                </v-card-title>
                <v-divider inset></v-divider>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs4 class="ma-1">
                      <v-text-field
                        label="First Name"

                        v-model="kid.firstName"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs1 class="ma-1">
                      <v-text-field
                        label="Mid. Init."

                        v-model="kid.midInitial"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 class="ma-1">
                      <v-text-field
                        label="Last Name"

                        v-model="kid.lastName"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs1 class="ma-1">
                      <v-text-field
                        label="Child-ID"
                        readonly
                        :value="getChildId(index + 1)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs3 class="ma-1">
                      <v-text-field
                        label="Child Social Security Number"

                        mask="social"
                        v-model="kid.ssn"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs2 class="ma-1">
                      <v-text-field
                        label="Child Date of Birth"

                        mask="##-##-####"
                        v-model="kid.dob"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs1 class="ma-1">
                      <v-text-field  label="Age" readonly :value="getAge(kid.dob)"></v-text-field>
                    </v-flex>
                    <v-flex xs2 class="ma-1">
                      <v-select

                        :items="gender"
                        v-model="kid.gender"
                        label="Gender"
                      ></v-select>
                    </v-flex>
                    <v-flex xs3 class="ma-1">
                      <v-select

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
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-layout>
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
export default {
  props: {
    familyData: Object
  },
  data(){
    return {
      careType: ["Full Day", "Before School", "After School", "Summer Camp", "None"],
      childRecordToRemove: "",
      confirmChildDel: false,
      editDialog: false,
      familyInfo: this.familyData,
      gender: ["Female", "Male"],
      incomeHeaders: [
        {sortable: false},
        {
          text: 'Weekly',
          align: 'center',
          sortable: false,
          value: 'weekly',
          class: "subheading"
        },
        {
          text: 'Bi-Weekly',
          align: 'center',
          sortable: false,
          value: 'biweekly',
          class: "subheading"
        },
        {
          text: 'Monthly',
          align: 'center',
          sortable: false,
          value: 'monthly',
          class: "subheading"
        },
        {
          text: 'Annually',
          align: 'center',
          sortable: false,
          value: 'annually',
          class: "subheading"
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total',
          class: "subheading"
        }
      ],
      locationItems: ['Work', 'School', 'Training Program'],
      locationStatus: ['Full Time', 'Part Time', 'Seasonal'],
      relationshipItems: ['Father', 'Mother', 'Legally Responsible Adult (proof of custody provided)'],
      totalInHome: null,
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
        age                 : null,
        typeOfCare          : ""
      }
      this.familyInfo.children.push(blankChild)
    },
    calcTotal(values){
      return (Number(values.weekly) * 52) + (Number(values.biWeekly) * 26) + (Number(values.monthly) * 12) + Number(values.annually)
    },
    confirmDel(index){
      this.childRecordToRemove = this.getChildId(index + 1)
      this.confirmChildDel     = true
    },
    getAge(dob){
      let year  = dob.substr(4,4)
      let month = dob.substr(0,2)
      let day   = dob.substr(2,2)
      let bday  = new Date(Number(year), Number(month), Number(day))
      let ageDifMs = Date.now() - bday
      let ageDate = new Date(ageDifMs); // miliseconds from epoch
      if (!dob){
        return null
      }
      else {
        return (Math.abs(ageDate.getUTCFullYear() - 1970))
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
      this.familyInfo.children.splice((Number(this.childRecordToRemove) - 1), 1)
      this.confirmChildDel = false
    }
  },
  computed: {
    calcFamily(){
      return Number(this.familyInfo.numAdults) + Number(this.familyInfo.numKids)
    },
  }
}
</script>

<style lang="css">

</style>

<!--
* ADD PROP TO RECEIVE DATA (AS AN OBJECT) REGARDING FAMILY INFORMATION
* ADD PERTINENT FIELDS INCLUDING THE ABILITY TO ADD CHILDREN AS NEEDED
-->
