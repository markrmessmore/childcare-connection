<template lang="html">
  <v-card>
    Letters
    <v-btn color="primary" @click="" :termData="familyData">Example Letter</v-btn>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      familyData: {
        lastName: "Smith",
        firstName: "Joe",
        address: "123 Main St.",
        city: "C-town",
        state: "NJ",
        beginDate: "01-01-2018",
        endDate: "01-01-2019"
      }
    }
  },
  methods: {
    exLetter(){
      
    }
  }
}
</script>

<style lang="css">
</style>

<!-- ADD BUTTONS FOR THE FOLLOWING LETTERS:
* When clicked generate a PDF based on the record info (and provided letters) that can be printed
-->
