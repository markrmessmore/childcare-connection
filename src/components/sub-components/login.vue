<template lang="html">
  <v-card>
    <v-toolbar color="primary" dark dense>
      <v-toolbar-title>
        Mercer Co. SMS
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small outline icon @click="deactivateSignIn()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12>
          <v-text-field
          name="Username"
          label="Username"
          box
          v-model="login.usr"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            name="Password"
            label="Password"
            box
            v-model="login.pass"
            :append-icon="showPass ? 'visibility_off' : 'visibility'"
            @click:append="showPass = !showPass"
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-right">
          <v-btn color="primary" @click="signIn()" outline round>
            <v-icon left>fas fa-sign-in-alt</v-icon>
            Login
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      login: {
        usr : "",
        pass: "",
      },
      showPass: false
    }
  },
  methods: {
    enter(){
      console.log("enter")
    },
    signIn(){
      this.$store.dispatch('signIn', this.login)
    },
    deactivateSignIn(){
      this.$store.dispatch('activateSignIn', false)
    }
  }
}
</script>

<style lang="css">
</style>
