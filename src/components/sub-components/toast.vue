<template lang="html">
  <v-snackbar
      v-model="getToastStatus"
      multi-line
      right
      :timeout="toastTimeout"
      top
    >
      {{ getToastMsg }}
    </v-snackbar>
</template>

<script>
export default {
  data(){
    return{
      toastTimeout: 6000
    }
  },
  computed: {
    getToastStatus: {
      get: function(){
        return this.$store.getters.getToast.status
      },
      set: function(){
        let resetToast = {
          status: false,
          msg   : ""
        }
        this.$store.dispatch('setToast', resetToast)
      }
    },
    getToastMsg(){
      return this.$store.getters.getToast.msg
    }
  }
}
</script>

<style lang="css">
</style>
