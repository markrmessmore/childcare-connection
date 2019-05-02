<template lang="html">
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        <v-icon left>not_interested</v-icon>
        ACCOUNT INACTIVE
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex xs12 class="title">
            This account has been marked as inactive.
            <br>
            <br>
            If you believe this has been done in error please contact the system administrator.
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
