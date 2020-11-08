<template lang="html">
  <v-card text>
    <v-toolbar dense color="secondary" dark flat>
      <v-icon left>fas fa-exclamation-triangle</v-icon>
      <v-toolbar-title>
        Just checking...
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="title">
      <v-row>
        <v-col cols="12" class="subheading">
          Are you sure you are ready to leave this page?
        </v-col>
      </v-row>
      <v-row justify-space-around class="text-center">
        <v-col cols="6">
          <v-btn color="red darken-4" dark @click="cancel()" rounded outlined>
            <v-icon left>fas fa-times</v-icon>
            No!
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="primary" @click="leave()" rounded outlined>
            <v-icon left>fas fa-check</v-icon>
            Yes
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods: {
    cancel(){
      this.$emit('cancel')
    },
    leave(){
      this.$emit('leave')
    },
  }
}
</script>

<style lang="css">
</style>
