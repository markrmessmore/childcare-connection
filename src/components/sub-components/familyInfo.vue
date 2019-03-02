<template lang="html">
  <div class="">
    <br>
    <!-- APPLICANT INFORMATION -->
      <v-toolbar color="secondary" dense dark class="subheading">Applicant Information</v-toolbar>
      <v-card flat>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4 class="ma-1">
              <v-text-field
                label="Applicant First Name"
                v-model="familyInfo.applicant.firstName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs1 class="ma-1">
              <v-text-field
                box
                label="Mid. Init."
                v-model="familyInfo.applicant.midInitial">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="ma-1">
              <v-text-field
                label="Applicant Last Name"
                v-model="familyInfo.applicant.lastName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-text-field
                label="Applicant Social Security Number"
                v-model="familyInfo.applicant.ssn"
                mask="social"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="ma-1">
              <v-select
                label="Relationship to Child(ren)"
                :items="relationshipItems"
                v-model="familyInfo.applicant.appRelation"
                box>
              </v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- CO-APPLICANT INFORMATION -->
      <v-toolbar color="secondary" dense dark class="subheading">Co-applicant Information</v-toolbar>
      <v-card flat>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4 class="ma-1">
              <v-text-field
                label="Co-applicant First Name"
                v-model="familyInfo.coapplicant.firstName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs1 class="ma-1">
              <v-text-field
                box
                label="Mid. Init."
                v-model="familyInfo.coapplicant.midInitial">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="ma-1">
              <v-text-field
                label="Co-applicant Last Name"
                v-model="familyInfo.coapplicant.lastName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-text-field
                label="Co-pplicant Social Security Number"
                v-model="familyInfo.coapplicant.ssn"
                mask="social"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="ma-1">
              <v-select
                label="Co-applicant Relationship to Child(ren)"
                :items="relationshipItems"
                v-model="familyInfo.coapplicant.appRelation"
                box>
              </v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- HOME INFORMATION -->
      <v-toolbar color="secondary" dense dark class="subheading">Home Information</v-toolbar>
      <v-card flat>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Address"
                box
                v-model="familyInfo.address"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Address 2"
                box
                v-model="familyInfo.address2"
              ></v-text-field>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-text-field
                box
                label="City"
                v-model="familyInfo.city"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                box
                label="State"
                v-model="familyInfo.state"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 class="ma-1">
              <v-text-field
                box
                label="Zip"
                v-model="familyInfo.zip"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                box
                label="Home Phone"
                v-model="familyInfo.homephone"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                box
                label="Cell Phone"
                v-model="familyInfo.cellphone"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="# of Adults in the Home"
                box
                @blur="calcFamily()"
                v-model="familyInfo.numAdults"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="# of Kids in the Home"
                box
                v-model="familyInfo.numKids"
                @blur="calcFamily()"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
              label="Total # in Home"
              box
              readonly
              v-model="calcFamily"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- FINANCIAL INFO: APPLICANT -->
      <v-toolbar color="secondary" dense dark class="subheading">Family Income Information</v-toolbar>
      <v-card flat>
        <v-card-text>
          <p class="subheading">
            Click into the appropriate cell. Calculations will be performed automatically.
          </p>
          <v-toolbar color="accent2" dense dark>Primary Applicant</v-toolbar>
          <v-data-table
            :headers="incomeHeaders"
            :items="familyInfo.applicant.income"
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
              <td class="text-xs-right subheading">${{calcTotal(props.item)}}</td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <!-- FINANCIAL INFO: CO-APPLICANT -->
      <v-card flat color="grey lighten-2">
        <v-card-text>
          <v-toolbar color="accent2" dense dark>Co-applicant</v-toolbar>
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
      <br>
      <!-- WORK/SCHOOL/TRAINING INFO -->
      <v-toolbar color="secondary" dense dark class="subheading">
        Work/School/Training Information (Primary Applicant)
      </v-toolbar>
      <v-card flat>
        <v-card-text>
          <v-toolbar color="accent2" dense dark>Primary Location</v-toolbar>
          <v-layout row wrap>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="Name of the Location"
                v-model="familyInfo.applicant.primaryWork.locationName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationItems"
                v-model="familyInfo.applicant.primaryWork.type"
                label="Type of Location"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationStatus"
                v-model="familyInfo.applicant.primaryWork.status"
                label="Employment Status"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Hours/Week"
                v-model="familyInfo.applicant.primaryWork.hoursPerWeek"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Months/Year"
                v-model="familyInfo.applicant.primaryWork.monthsPerYear"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1">
              <v-text-field
                label="Location Address"
                v-model="familyInfo.applicant.primaryWork.address"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="City"
                v-model="familyInfo.applicant.primaryWork.city"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="State"
                v-model="familyInfo.applicant.primaryWork.state"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Zip"
                v-model="familyInfo.applicant.primaryWork.zip"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Phone"
                v-model="familyInfo.applicant.primaryWork.phone"
                mask="phone"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Ext"
                v-model="familyInfo.applicant.primaryWork.phoneext"
                box>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-text>
          <v-toolbar color="accent2" dense dark>Secondary Location</v-toolbar>
          <v-layout row wrap>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="Name of the Location"
                v-model="familyInfo.applicant.secondaryWork.locationName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationItems"
                v-model="familyInfo.applicant.secondaryWork.type"
                label="Type of Location"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationStatus"
                v-model="familyInfo.applicant.secondaryWork.status"
                label="Employment Status"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Hours/Week"
                v-model="familyInfo.applicant.secondaryWork.hoursPerWeek"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Months/Year"
                v-model="familyInfo.applicant.secondaryWork.monthsPerYear"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1">
              <v-text-field
                label="Location Address"
                v-model="familyInfo.applicant.secondaryWork.address"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="City"
                v-model="familyInfo.applicant.secondaryWork.city"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="State"
                v-model="familyInfo.applicant.secondaryWork.state"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Zip"
                v-model="familyInfo.applicant.secondaryWork.zip"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Phone"
                v-model="familyInfo.applicant.secondaryWork.phone"
                mask="phone"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Ext"
                v-model="familyInfo.applicant.secondaryWork.phoneext"
                box>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-toolbar color="secondary" dense dark class="subheading">
        Work/School/Training Information (Co-applicant)
      </v-toolbar>
      <v-card flat>
        <v-card-text>
          <v-toolbar color="accent2" dense dark>Primary Location</v-toolbar>
          <v-layout row wrap>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="Name of the Location"
                v-model="familyInfo.coapplicant.primaryWork.locationName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationItems"
                v-model="familyInfo.coapplicant.primaryWork.type"
                label="Type of Location"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationStatus"
                v-model="familyInfo.coapplicant.primaryWork.status"
                label="Employment Status"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Hours/Week"
                v-model="familyInfo.coapplicant.primaryWork.hoursPerWeek"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Months/Year"
                v-model="familyInfo.coapplicant.primaryWork.monthsPerYear"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1">
              <v-text-field
                label="Location Address"
                v-model="familyInfo.coapplicant.primaryWork.address"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="City"
                v-model="familyInfo.coapplicant.primaryWork.city"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="State"
                v-model="familyInfo.coapplicant.primaryWork.state"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Zip"
                v-model="familyInfo.coapplicant.primaryWork.zip"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Phone"
                v-model="familyInfo.coapplicant.primaryWork.phone"
                mask="phone"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Ext"
                v-model="familyInfo.coapplicant.primaryWork.phoneext"
                box>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-text>
          <v-toolbar color="accent2" dense dark>Secondary Location</v-toolbar>
          <v-layout row wrap>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="Name of the Location"
                v-model="familyInfo.coapplicant.secondaryWork.locationName"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationItems"
                v-model="familyInfo.coapplicant.secondaryWork.type"
                label="Type of Location"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-select
                box
                :items="locationStatus"
                v-model="familyInfo.coapplicant.secondaryWork.status"
                label="Employment Status"
              ></v-select>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Hours/Week"
                v-model="familyInfo.coapplicant.secondaryWork.hoursPerWeek"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Months/Year"
                v-model="familyInfo.coapplicant.secondaryWork.monthsPerYear"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="ma-1">
              <v-text-field
                label="Location Address"
                v-model="familyInfo.coapplicant.secondaryWork.address"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ma-1">
              <v-text-field
                label="City"
                v-model="familyInfo.coapplicant.secondaryWork.city"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="State"
                v-model="familyInfo.coapplicant.secondaryWork.state"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Zip"
                v-model="familyInfo.coapplicant.secondaryWork.zip"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Phone"
                v-model="familyInfo.coapplicant.secondaryWork.phone"
                mask="phone"
                box>
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="ma-1">
              <v-text-field
                label="Ext"
                v-model="familyInfo.coapplicant.secondaryWork.phoneext"
                box>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- CHILD INFORMATION -->
      <v-toolbar color="secondary" dense dark class="subheading">Child Information</v-toolbar>
      <v-card flat color="grey lighten-2">
        <div class="text-xs-right">
          <v-btn color="primary" @click="addChild()">
            <v-icon>add</v-icon>
            Add Child
          </v-btn>
        </div>
        <v-card-text>
          <v-card v-for="(kid, index) in familyInfo.children" class="mb-1" :key="index">
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4 class="ma-1">
                  <v-text-field
                    label="First Name"
                    box
                    v-model="kid.firstName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 class="ma-1">
                  <v-text-field
                    label="Mid. Init."
                    box
                    v-model="kid.midInitial"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 class="ma-1">
                  <v-text-field
                    label="Last Name"
                    box
                    v-model="kid.lastName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 class="ma-1">
                  <v-text-field
                    label="Child-ID"
                    box
                    :value="getChildId(index + 1)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 class="ma-1">
                  <v-text-field
                    label="Child Social Security Number"
                    box
                    mask="social"
                    v-model="kid.ssn"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-text-field
                    label="Child Date of Birth"
                    box
                    mask="##-##-####"
                    v-model="kid.dob"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1>
                  <v-text-field class="ma-1" box label="Age" readonly :value="getAge(kid.dob)"></v-text-field>
                </v-flex>
                <v-flex xs2 class="ma-1">
                  <v-select
                    box
                    :items="gender"
                    v-model="kid.gender"
                    label="Gender"
                  ></v-select>
                </v-flex>
                <v-flex xs3 class="ma-1">
                  <v-select
                    box
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
          <v-layout row wrap>
            <v-flex xs2 offset-xs10>
              <v-btn color="primary" @click="saveData()">Save</v-btn>
            </v-flex>
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
