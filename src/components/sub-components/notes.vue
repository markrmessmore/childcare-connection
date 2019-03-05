<template lang="html">
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-right" @click="addNote()">
        <v-btn color="primary" outline small>
          <v-icon left>add_circle</v-icon>
          Add Note:
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-card v-for="(note, index) in notes" :key="index" :color="setNoteColor(index)">
        <v-card-text>
        <v-layout row wrap>
          <v-flex xs3>
              <v-text-field
                label="Note Date:"
                v-model="note.date"
                hint="Date Format: MM-DD-YYYY"
                mask="##-##-####"
              >
              </v-text-field>
          </v-flex>
          <v-flex xs6 offset-xs3 class="text-xs-right">
            <v-btn color="primary" icon outline small @click="confirmDelete(index)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-divider inset></v-divider>
          <v-textarea
            v-model="note.text"
          >
          </v-textarea>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-dialog
      v-model="deleteNoteModal"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dense dark>
          <v-toolbar-title>Delete this note?</v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap justify-space-around>
          <v-btn color="primary" outline @click="deleteNote()">
            <v-icon left>check</v-icon>
            Yes
          </v-btn>
          <v-btn color="red darken-4" dark @click="deleteNoteModal = false">
            <v-icon left>close</v-icon>
            No
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    caseNotes: Array
  },
  data() {
    return {
      notes: this.caseNotes,
      datePicker: false,
      deleteNoteModal: false,
      noteToDelete: null
    }
  },
  methods: {
    addNote(){
      let blankNote = {
        date: "",
        text: ""
      }
      this.notes.unshift(blankNote)
    },
    confirmDelete(i){
      this.noteToDelete = i
      this.deleteNoteModal = true
    },
    deleteNote(){
      this.notes.splice(this.noteToDelete, 1)
      this.deleteNoteModal = false
    },
    setNoteColor(i){
      if ((i % 2) == 0) {
        return
      }
      else {
        return "grey lighten-2"
      }
    }
  }
}
</script>

<style lang="css">
</style>

<!--
* Add a simple form to add notes for historical purposes.
-->
