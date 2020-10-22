<template lang="html">
  <v-card>
    <v-toolbar text>
      <v-toolbar-title>
        <v-icon left>fas fa-info-circle</v-icon>
        About this Web App...
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="activeTab" grow>
      <v-tab>Info & Licensing</v-tab>
      <v-tab>Changelog</v-tab>
      <v-tab-item>
        <v-card-text>
          <v-layout row wrap align-center justify-space-between>
            <v-img :src="require('@/assets/ccc-logo-original.jpg')" height="200px" width="auto" contain></v-img>
            <v-img :src="require('@/assets/messmore.png')" height="200px" width="auto" contain></v-img>
          </v-layout>
          <br>
          <v-layout>
            <v-flex xs12 class="subheading">
              <p>
                This app was created by Mark Messmore of <a href="https://MarkMessmore.us" target="_blank">Messmore Web Designs</a> in conjunction with the team at <a href="http://ccc-nj.org" target="_blank">Child Care Connection</a> of Trenton, NJ. It has been designed under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a> stating the following:
              </p>
              <br>
              <blockquote class="blockquote grey lighten-3 body-1">
                <p>
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                </p>
                <p>
                  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                </p>
                <p>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </blockquote>
              <br>
              <p>
                Details and code for this project can be found at the <a href="https://github.com/markrmessmore/childcare-connection" target="_blank">github repository here</a>.
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <v-layout row wrap class="subheading">
            <v-flex xs1>VERSION</v-flex>
            <v-flex xs10 offset-xs1>CHANGELOG:</v-flex>
          </v-layout>
          <v-layout row :class="getColor(i)" v-for="(log, i) in changeLog" :key="i">
            <v-flex xs1>{{ log.release }}</v-flex>
            <v-flex xs10 offset-xs1>
              <ul>
                <li v-for="item in log.content">{{item}}</li>
              </ul>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      activeTab: null,
      // PLACE NEWEST CHANGELOG ITEM AT THE TOP OF THE LIST
      changeLog: [
        {
          release:  "1.5",
          content:  ["Changed font icons.", "Added validation elements to each step of the application process.", "Fixed pre-check report which was not printing.", "Fixed Zip code fields to only permit five numbers", "Fixed number of total in household listing NaN", "Fixed various small bugs", "Moved to the FontAwesome icon set.", "Duplicated some components which were nearly duplicates, coding around differences whether this was a new application or in the caseInfo field."]
        },
        {
          release: "1.0",
          content: ["Initial release."]
        }
      ]
    }
  },
  methods: {
    getColor(i){
      if (i % 2 == 0) {
        return "grey lighten-3 subheading pt-1 pb-1"
      }
      else {
        return "subheading pt-1 pb-1"
      }
    }
  }
};
</script>

<style lang="css"></style>
