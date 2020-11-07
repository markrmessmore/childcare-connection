<template lang="html">
  <v-app>
    <component :is="layout"></component>
    <toast></toast>
    <loading></loading>
  </v-app>
</template>

<script>
//LOADING DIALOG SHARED THROUGHOUT
import loading  from '@/components/sub-components/loading.vue'
import toast    from '@/components/sub-components/toast.vue'
export default {
  data() {
    return {};
  },
  components: {
    loading,toast
  },
  methods: {

  },
  computed: {
    layout(){
      return this.$route.meta.layout
    }
  },
  created(){
    var timeout
    function refresh(){
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        location.reload()
        //Log out the user
      }, 60 * 60 * 1000)
    }
    refresh()
    document.addEventListener('click', refresh)
  }
};
</script>

<style lang="css"></style>
