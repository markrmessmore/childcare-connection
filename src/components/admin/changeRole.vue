<template lang="html">
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>
        <v-icon>security</v-icon>
        Change User Role
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" outline icon small @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text class="subheading">
      User <b>{{userData.email.toUpperCase()}}</b> is currently assigned the role of <b>{{userData.role.toUpperCase()}}</b>.
      <br>
      <br>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            :items="accessLevels"
            v-model="userLvl"
            label="User Access Level"
          ></v-select>
        </v-flex>
        <v-flex xs12 class="text-xs-right">
          <v-btn color="primary" outline @click="saveChanges()">
            <v-icon left>save</v-icon>
            Save Changes
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    userData: Object
  },
  data(){
    return{
      accessLevels: ['user', 'admin'],
      userLvl: this.userData.role
    }
  },
  methods: {
    close(){
      this.$emit('close')
    },
    saveChanges(){
      let userData = {
        uid: this.userData.uid,
        email: this.userData.email,
        role: this.userLvl
      }
      this.$store.dispatch('changeUserRole', userData)
      this.close()
    }
  }
}
</script>

<style lang="css">
</style>
