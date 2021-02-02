<template lang="html">
  <v-container class="white">
    <v-toolbar color="secondary" dark dense flat>
      <v-toolbar-title>
        Mercer Co. SMS
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small outlined icon @click="deactivateSignIn()">
        <v-icon>fas fa-times</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          name="Username"
          label="Username"
          color="secondary"
          filled
          v-model="login.usr"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          name="Password"
          label="Password"
          filled
          v-model="login.pass"
          :append-icon="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
        ></v-text-field>
      </v-col>
    </v-row>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn color="secondary" @click="signIn()" outlined rounded>
            <v-icon left>fas fa-chevron-right</v-icon>
            Login
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
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
