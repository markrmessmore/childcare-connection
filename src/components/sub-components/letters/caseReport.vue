<template lang="html">
  <v-card>
    <v-card-text>
      <v-layout row wrap class="subheading pa-1">
        Case Report for Case ID: {{caseInfo.caseId}}
      </v-layout>
      <v-layout row wrap class="pa-1">
        <v-flex xs12 class="body-2 secondary white--text">
          Family Information:
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            Applicant:
          </div>
            {{caseInfo.familyInfo.applicant.firstName}} {{caseInfo.familyInfo.applicant.midInitial}}. {{caseInfo.familyInfo.applicant.lastName}}
          <div>
            SSN: {{maskSocial(caseInfo.familyInfo.applicant.ssn)}}
          </div>
        </v-flex>
        <v-flex xs3>
          <div class=" body-2">
            Co-Applicant:
          </div>
          {{caseInfo.familyInfo.coapplicant.firstName}} {{caseInfo.familyInfo.coapplicant.midInitial}}. {{caseInfo.familyInfo.coapplicant.lastName}}
          <div>
            SSN: {{maskSocial(caseInfo.familyInfo.coapplicant.ssn)}}
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            Case Status:
          </div>
          {{getCaseStatus.status}}
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            As of:
          </div>
          {{getCaseStatus.date}}
        </v-flex>
      </v-layout>
      <v-layout row wrap class="grey lighten-3 pa-1">
        <v-flex xs3>
          <div class="body-2">
            Address:
          </div>
          {{caseInfo.familyInfo.address}}<br>
          {{caseInfo.familyInfo.address2}}<br v-if="caseInfo.familyInfo.address2">
          {{caseInfo.familyInfo.city}}, NJ {{caseInfo.familyInfo.zip}}
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            Phone 1:
          </div>
          {{formatPhone(caseInfo.familyInfo.phone1.num)}}<br>
          <i>({{caseInfo.familyInfo.phone1.type}})</i>
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            Phone 2:
          </div>
          {{formatPhone(caseInfo.familyInfo.phone2.num)}}<br>
          <i>({{caseInfo.familyInfo.phone2.type}})</i>
        </v-flex>
        <v-flex xs3>
          <div class="body-2">
            Eligibility Dates:
          </div>
          Begin: {{formatDate(caseInfo.activeDate)}} <br>
          End: {{formatDate(caseInfo.endDate)}}
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap v-for="(kid, i) in caseInfo.familyInfo.children" :key="i" class="pt-1">
            <v-flex xs2>
              <div class="body-2">
                Child ID:
              </div>
              {{kid.childId}}
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Name:
              </div>
              {{kid.firstName}} {{kid.midInitial}}. {{kid.lastName}}
            </v-flex>
            <v-flex xs3>
              <div class="body-2">
                Age:
              </div>
              {{getAge(kid.dob)}}
            </v-flex>
            <v-flex xs3>
              <div class="body-2">
                Gender:
              </div>
              {{kid.gender}}
            </v-flex>
            <v-flex xs2 offset-xs2>
              <div class="body-2">
                Child Status:
              </div>
              {{kid.kidStatus ? kid.kidStatus : 'TBD'}}
            </v-flex>
            <v-flex xs3 offset-xs2>
              <div class="body-2">
                Type of Care:
              </div>
              <span v-for="care in kid.typeOfCare">{{care}}, </span>
            </v-flex>
            <v-flex xs3>
              <div class="body-2">
                SSN:
              </div>
              {{maskSocial(kid.ssn)}}
            </v-flex>
            <br>
            <v-divider inset></v-divider>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="grey lighten-3">
        <v-flex xs12 class="body-2 secondary white--text">
          Work/School/Training Information:
        </v-flex>
        <!-- COAPPLICANT WORK/TRAINING -->
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs4>
              <div class="body-2">
                Applicant Primary Location:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.locationName}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Type:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.type}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Status:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.status}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Hours/Week:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.hoursPerWeek}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Months/Year:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.monthsPerYear}}
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Address:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.address}}<br>
              {{caseInfo.familyInfo.applicant.primaryWork.city}}, {{caseInfo.familyInfo.applicant.primaryWork.state}} {{caseInfo.familyInfo.applicant.primaryWork.zip}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Phone:
              </div>
              {{formatPhone(caseInfo.familyInfo.applicant.primaryWork.phone)}}
              <br>
              <span v-if="caseInfo.familyInfo.applicant.primaryWork.phoneext">
                <i>ext: </i>{{caseInfo.familyInfo.applicant.primaryWork.phoneext}}
              </span>
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Start Date:
              </div>
              {{formatDate(caseInfo.familyInfo.applicant.primaryWork.startDate)}}
            </v-flex>
          </v-layout>
          <br>
          <v-divider></v-divider>
          <br>
          <v-layout row wrap>
            <v-flex xs4>
              <div class="body-2">
                Applicant Secondary Location:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.locationName ? caseInfo.familyInfo.applicant.secondaryWork.locationName : "N/A"}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Type:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.locationName ? caseInfo.familyInfo.applicant.secondaryWork.type : ""}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Status:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.status}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Hours/Week:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.hoursPerWeek}}
            </v-flex>
            <v-flex xs1>
              <div class="body-2">
                Months/Year:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.monthsPerYear}}
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Address:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.address}}<br>
              {{caseInfo.familyInfo.applicant.secondaryWork.city}}, {{caseInfo.familyInfo.applicant.secondaryWork.state}} {{caseInfo.familyInfo.applicant.secondaryWork.zip}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Phone:
              </div>
              {{formatPhone(caseInfo.familyInfo.applicant.secondaryWork.phone)}}
              <br>
              <span v-if="caseInfo.familyInfo.applicant.secondaryWork.phoneext">
                <i>ext: </i>{{caseInfo.familyInfo.applicant.secondaryWork.phoneext}}
              </span>
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Start Date:
              </div>
              {{formatDate(caseInfo.familyInfo.applicant.secondaryWork.startDate)}}
            </v-flex>
          </v-layout>
          <br>
          <v-divider></v-divider>
          <br>
          <v-layout row wrap>
            <v-flex xs4>
              <div class="body-2">
                Co-Applicant Primary Location:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.locationName}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Type:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.type}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Status:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.status}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Hours/Week:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.hoursPerWeek}}
            </v-flex>
            <v-flex xs1>
              <div class="body-2">
                Months/Year:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.monthsPerYear}}
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Address:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.address}}<br>
              {{caseInfo.familyInfo.coapplicant.primaryWork.city}}, {{caseInfo.familyInfo.coapplicant.primaryWork.state}} {{caseInfo.familyInfo.coapplicant.primaryWork.zip}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Phone:
              </div>
              {{formatPhone(caseInfo.familyInfo.coapplicant.primaryWork.phone)}}
              <br>
              <span v-if="caseInfo.familyInfo.coapplicant.primaryWork.phoneext">
                <i>ext: </i>{{caseInfo.familyInfo.coapplicant.primaryWork.phoneext}}
              </span>
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Start Date:
              </div>
              {{formatDate(caseInfo.familyInfo.coapplicant.primaryWork.startDate)}}
            </v-flex>
          </v-layout>
          <br>
          <v-divider></v-divider>
          <br>
          <v-layout row wrap>
            <v-flex xs4>
              <div class="body-2">
                Applicant Secondary Location:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.locationName ? caseInfo.familyInfo.coapplicant.secondaryWork.locationName : "N/A"}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Type:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.type}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Status:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.status}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Hours/Week:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.hoursPerWeek}}
            </v-flex>
            <v-flex xs1>
              <div class="body-2">
                Months/Year:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.monthsPerYear}}
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Address:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.address}}<br>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.city}}, {{caseInfo.familyInfo.coapplicant.secondaryWork.state}} {{caseInfo.familyInfo.coapplicant.secondaryWork.zip}}
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Phone:
              </div>
              {{formatPhone(caseInfo.familyInfo.coapplicant.secondaryWork.phone)}}
              <br>
              <span v-if="caseInfo.familyInfo.coapplicant.secondaryWork.phoneext">
                <i>ext: </i>{{caseInfo.familyInfo.coapplicant.secondaryWork.phoneext}}
              </span>
            </v-flex>
            <v-flex xs4>
              <div class="body-2">
                Start Date:
              </div>
              {{formatDate(caseInfo.familyInfo.coapplicant.secondaryWork.startDate)}}
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <br class="html2pdf__page-break">
      <v-layout row wrap>
        <v-flex xs12 class="body-2 secondary white--text">
          Providers:
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap v-for="(prov, i) in caseInfo.providers" :key="i" class="pt-1 pb-1">
            <v-flex xs3>
              <div class="body-2">
                Provider:
              </div>
              {{prov.name}}
              <br>
              <i>{{prov.typeOfCare}}</i>
            </v-flex>
            <v-flex xs2>
              <div class="body-2">
                Address:
              </div>
              {{getProvInfo(prov.name).address}}
              <br v-if="getProvInfo(prov.name).address2">
              {{getProvInfo(prov.name).address2}}
              <br>
              {{getProvInfo(prov.name).city}}, NJ {{getProvInfo(prov.name).zip}}
            </v-flex>
            <v-flex xs2 offset-xs1>
              <div class="body-2">
                Phone:
              </div>
              {{formatPhone(getProvInfo(prov.name).phone)}}
            </v-flex>
            <v-flex xs2 offset-xs1>
              <span class="body-2">CCC ID:</span><span class="body-1">{{getProvInfo(prov.name).cccId}}</span>
              <br>
              <span class="body-2">{{getProvInfo(prov.name).provIdType == 'ssn' ? "SSN:" : "Fed ID:"}}</span>
              <span v-if="getProvInfo(prov.name).provIdType == 'fedId'">
                {{getProvInfo(prov.name).federalId}}
              </span>
              <span v-else>
                {{maskSocial(getProvInfo(prov.name).federalId)}}
              </span>
            </v-flex>
            <v-flex xs3>
              <div class="body-2">For Child: </div>
              <span>{{prov.forChild}}</span>
            </v-flex>
            <v-flex xs3>
              <span class="body-2">PAPA Start: </span>
              <span class="body-1">{{formatDate(prov.papaStart)}}</span>
            </v-flex>
            <v-flex xs3>
              <span class="body-2">PAPA End: </span>
              <span class="body-1">{{formatDate(prov.papaEnd)}}</span>
            </v-flex>
            <v-flex xs3>
              <span class="body-2">Monthly Amt: </span>
              <span class="body-1">{{prov.monthlyAmt}}</span>
            </v-flex>
            <br>
            <v-divider inset></v-divider>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="grey lighten-3">
        <v-flex xs12 class="body-2 secondary white--text">
          Attendance Records:
        </v-flex>
        <v-flex xs4 v-for="(attRec, i) in caseInfo.attendance" :key="i" :class="getColor(i)">
          <table>
            <tr>
              <td class="body-2">Facility:</td>
              <td>{{attRec.facility}}</td>
            </tr>
            <tr>
              <td class="body-2">Month/Year:</td>
              <td>{{attRec.month.slice(0,2)}}/{{attRec.year}}</td>
            </tr>
            <tr>
              <td class="body-2">Child:</td>
              <td>{{attRec.child}}</td>
            </tr>
            <tr>
              <td class="body-2">Over 50% Attendance?</td>
              <td>{{attRec.attendance}}</td>
            </tr>
            <tr>
              <td class="body-2">Payment Amt:</td>
              <td>{{attRec.amount}}</td>
            </tr>
          </table>
        </v-flex>
        <!-- {{caseInfo.attendance}} -->
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="body-2 secondary white--text">
          Notes:
        </v-flex>
        <v-flex xs2 class="body-2">
          Date:
        </v-flex>
        <v-flex xs2>
          Note Author:
        </v-flex>
        <v-flex xs8 class="body-2">
          Note Contents
        </v-flex>
        <v-layout row wrap v-for="(note, i) in caseInfo.notes" :key="i" align-center :class="getColor(i)">
          <v-flex xs2>
            {{formatDate(note.date)}}
          </v-flex>
          <v-flex xs2>
            {{getAuthor.email}}
          </v-flex>
          <v-flex xs7 offset-xs1>
            {{note.text}}
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import {sharedFunctions} from '@/assets/sharedFunctions.js'
export default {
  mixins: [sharedFunctions],
  props: {
    caseInfo: Object
  },
  methods: {
    getColor(i){
      if (i%2 != 0){
        return "grey lighten-1"
      }
    },
    getProvInfo(name){
      let selectedProv = this.getProviders.filter(prov => {
        return prov.name == name
      })
      return selectedProv[0]
    }
  },
  computed: {
    getAuthor(){
      return this.$store.getters.getUser
    },
    getCaseStatus(){
      return this.caseInfo.caseStatus[this.caseInfo.caseStatus.length - 1]
    },
    getProviders(){
      return this.$store.getters.getProviders
    }
  }
}
</script>

<style lang="css" scoped>
</style>
