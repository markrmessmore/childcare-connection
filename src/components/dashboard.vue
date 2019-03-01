<template lang="html">
  <v-card>
    Dashboard
    {{getCases}}
  </v-card>
</template>

<script>
import appHeader from "@/components/sub-components/header.vue";
import appFooter from "@/components/sub-components/footer.vue";
export default {
  components: {appHeader, appFooter},
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {
    getCases(){
      console.log(this.$store.getters.getCases)
      // return this.$store.getters.getCases
    }
  }
};
</script>

<style lang="css"></style>

<!--
* Assure only logged-in users can access this page
* Assure navbar is working correctly based on user access level.
-->
