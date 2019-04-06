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
