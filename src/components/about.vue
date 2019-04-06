<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>info</v-icon>
        About this Web App...
      </v-toolbar-title>
    </v-toolbar>
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
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style lang="css"></style>
