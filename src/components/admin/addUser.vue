<template lang="html">
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-icon>fas fa-user-plus</v-icon>
      <v-toolbar-title>
        Add User
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" outline icon small @click="close()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="User Email"
            v-model="email"
            required
            :rules="emailRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            :items="accessLevels"
            v-model="userLvl"
            label="User Access Level"
            required
          ></v-select>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-tooltip top>
            <v-btn color="primary" outline @click="createUser()" slot="activator" :disabled="checkUser" round>
              <!-- For this icon it needs the pro version of Awesome Fonts -->
              <v-icon left>fas fa-plus-circle</v-icon>
              Create User
            </v-btn>
            <span>Once you have enetered an email and selected a role you can create the user.</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      accessLevels: ['user', 'admin'],
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      userLvl: ""
    }
  },
  methods: {
    close(){
      this.$emit('close')
      this.email = ""
      this.userLvl = ""
    },
    createUser(){
      let userData = {
        email : this.email,
        role  : this.userLvl
      }
      this.$store.dispatch('createUser', userData)
      this.close()
    }
  },
  computed: {
    checkUser(){
      if (this.email === "" || this.userLvl === ""){
        return true
      }
      else {
        return false
      }
    }
  }
}
</script>

<style lang="css">
</style>
