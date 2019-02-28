<template lang="html">
  <v-card>
    <v-flex xs10 offset-xs1>
      <v-layout>
        <v-flex>
          <br/>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-textarea
            box
            name="input-7-4"
            label="Notes"
            v-model='text'
            height='300px'
          ></v-textarea>


        </v-flex>
      </v-layout>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date            : "2019-08-03",
      text            : "John faxed in the application.",
      menu2: false
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* Add a simple form to add notes for historical purposes.
-->
