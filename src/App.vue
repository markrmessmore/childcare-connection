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
  methods: {
    inactiveTimeout(){
      console.log('click')
      // setTimeout(function () {
      //   location.reload()
      // }, 10000);
    }
  },
  computed: {
    layout(){
      return this.$route.meta.layout
    }
  },
  created(){
    document.body.addEventListener('click', function(){
      console.log('click')
    })
  }
};
</script>

<style lang="css"></style>
