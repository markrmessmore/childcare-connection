<template lang="html">
  <v-app>
    <component :is="layout"></component>
    <toast></toast>
    <loading></loading>
  </v-app>
</template>

<script>
//LOADING DIALOG SHARED THROUGHOUT
import loading from '@/components/sub-components/loading.vue'
import toast from '@/components/sub-components/toast.vue'
export default {
  data() {
    return {};
  },
  components: {
    loading,toast
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
