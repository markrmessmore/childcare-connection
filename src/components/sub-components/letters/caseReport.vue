<template lang="html">
  <v-card>
    <v-card-title primary-title class="subheading">
      Case Report for Case ID: {{caseInfo.caseId}}
    </v-card-title>
    <v-divider inset></v-divider>
    <v-card-text>
      <v-layout row wrap class="pa-1">
        <v-flex xs3>
          <div class="body-2">
            Applicant:
          </div>
            {{caseInfo.familyInfo.applicant.firstName}} {{caseInfo.familyInfo.applicant.midInitial}}. {{caseInfo.familyInfo.applicant.lastName}}
        </v-flex>
        <v-flex xs3>
          <div class=" body-2">
            Co-Applicant:
          </div>
          {{caseInfo.familyInfo.coapplicant.firstName}} {{caseInfo.familyInfo.coapplicant.midInitial}}. {{caseInfo.familyInfo.coapplicant.lastName}}
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
          <div class="body-2">
            Children:
            <v-divider inset></v-divider>
          </div>
          <v-layout row wrap v-for="(kid, i) in caseInfo.familyInfo.children" :key="i" class="pa-2">
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
              {{kid.kidStatus}}
            </v-flex>
            <v-flex xs6 offset-xs2>
              <div class="body-2">
                Type of Care:
              </div>
              <span v-for="care in kid.typeOfCare">{{care}}, </span>
            </v-flex>
            <br>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="grey lighten-3">
        <div class="body-2">
          Work/School/Training Information:
        </div>
        <!-- COAPPLICANT WORK/TRAINING -->
        <v-flex xs12>
          <v-layout row wrap class="pa-2">
            <v-flex xs4>
              <div class="body-2">
                Applicant Primary Location:
              </div>
              {{caseInfo.familyInfo.applicant.primaryWork.locationName}}
            </v-flex>
            <v-flex xs3>
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
            <v-flex xs1>
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
            <v-flex xs3>
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
          <v-layout row wrap class="pa-2">
            <v-flex xs4>
              <div class="body-2">
                Applicant Secondary Location:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.locationName}}
            </v-flex>
            <v-flex xs3>
              <div class="body-2">
                Type:
              </div>
              {{caseInfo.familyInfo.applicant.secondaryWork.type}}
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
            <v-flex xs3>
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
          <v-layout row wrap class="pa-2">
            <v-flex xs4>
              <div class="body-2">
                Co-Applicant Primary Location:
              </div>
              {{caseInfo.familyInfo.coapplicant.primaryWork.locationName}}
            </v-flex>
            <v-flex xs3>
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
            <v-flex xs3>
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
          <v-layout row wrap class="pa-2">
            <v-flex xs4>
              <div class="body-2">
                Applicant Secondary Location:
              </div>
              {{caseInfo.familyInfo.coapplicant.secondaryWork.locationName}}
            </v-flex>
            <v-flex xs3>
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
            <v-flex xs3>
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
      {{caseInfo.familyInfo.applicant.primaryWork}}
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
  computed: {
    getCaseStatus(){
      return this.caseInfo.caseStatus[this.caseInfo.caseStatus.length - 1]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
