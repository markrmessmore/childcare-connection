<template lang="html">
  <v-app>
    <component :is="layout"></component>
  </v-app>
</template>

<script>

export default {
  data() {
    return {};
  },
  components: {

  },
  computed: {
    layout(){
      return this.$route.meta.layout
    }
  }
};
</script>

<style lang="css"></style>

<!-- TO DO
* Add Icon to Login
* Add a loading modal/screen
* Retrieve Login status regarding whether user is logged in or not.
* Add login modal(v-dialog)/page with username and password fields
* Change the navBar based on whether the user is an Admin, standard user or unauthenticated user.
-->
