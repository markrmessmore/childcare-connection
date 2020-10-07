<template lang="html">
  <v-card>
    <v-toolbar dense color="secondary" dark>
      <v-icon>fas fa-exclamation-triangle</v-icon>
      <v-toolbar-title>
        Just checking...
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="subheading">
      <v-layout row wrap>
        <v-flex xs12 class="subheading">
          {{getMsg()}}
          <br>
          <br>
          Are you sure you want to leave?
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap justify-space-around>
        <v-btn color="primary" outline @click="leave()" round outline>
          <v-icon left>fas fa-check</v-icon>
          Yes
        </v-btn>
        <v-btn color="red darken-4" dark @click="cancel()" round outline>
          <v-icon left>fas fa-times</v-icon>
          No!
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      confirmMsg: [
        "Leaving this page without clicking the 'save' button may result in much weeping and gnashing of teeth.",
        "Confuscious say, person who click in haste, lose work and cry much.",
        "Christians say 'Jesus saves'...the question is did you?",
        "Are you going to swear after leaving this page? (If you meant to save and did not the answer is likely yes...)",
        "<BeginWittyMessage> Did you save? </EndWittyMessage>"
      ]
    }
  },
  methods: {
    cancel(){
      this.$emit('cancel')
    },
    getMsg(){
      let sel = Math.floor(Math.random()*this.confirmMsg.length)
      return this.confirmMsg[sel]
    },
    leave(){
      this.$emit('leave')
    },
  }
}
</script>

<style lang="css">
</style>
