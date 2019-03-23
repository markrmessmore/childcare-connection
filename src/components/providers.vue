`<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>fas fa-child</v-icon>
        Providers
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text v-if="editDialog">
      <editProvider @close="closeDialog()" :providerData="editDialogInfo" :editType="editType"></editProvider>
    </v-card-text>
    <v-card-text v-else>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-right">
          <v-btn color="primary" @click="addProvider()">
            <v-icon left>add_circle</v-icon>
            Add Provider
          </v-btn>
        </v-flex>
      </v-layout>
      <br>
      <v-data-table
        :headers="tableHeaders"
        :items="getProviders"
        :rows-per-page-items='rows'
        class="elevation-2"
        item-key="id"
        expand
      >
        <template v-slot:items="props">
          <tr class="tableRow">
            <td width="40%" class="subheading">{{ props.item.name }}</td>
            <td width="40%" class="subheading">{{ props.item.typeOfProvider }}</td>
            <td class="text-xs-center">
              <v-btn color="accent" small icon @click="editProvider(props.item)">
                <v-icon small>edit</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center" v-if="getUserRole == 'admin'">
              <v-btn color="accent" small icon @click="confirmDelProvider(props.item)" outline>
                <v-icon small>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog
      v-model="delDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dark dense>
          <v-toolbar-title>
            <v-icon left>check_circle</v-icon>
            Confirm Provider Removal:
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 class="subheading">
              Are you sure you want to delete {{delProv.name}}?
            </v-flex>
          </v-layout>
          <br>
          <v-layout row wrap justify-space-around>
            <v-btn color="primary" outline @click="delProvider()">
              <v-icon left>check</v-icon>
              Yes
            </v-btn>
            <v-btn color="red darken-4" @click="delDialog = false" dark>
              <v-icon left>close</v-icon>
              No
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import editProvider from '@/components/sub-components/editProvider.vue'
export default {
  components: {
    editProvider
  },
  data(){
    return{
      delDialog : false,
      delProv   : {},
      editDialog: false,
      editDialogInfo: {},
      editType: "",
      expand: false,
      rows: [25, 50, 100],
      tableHeaders: [
        { text: 'Name', value: 'name', class: "subheading",  sortable: false },
        { text: 'Type', value: 'type', class: "subheading",  sortable: false },
        { text: "Edit", align: 'center', value: "", sortable: false, class: "subheading"},
        // { text: "", align: 'center', value: "", sortable: false, class: ""},
      ],
    }
  },
  methods: {
    addProvider(){
      let blankProvider= {
        name              : "",
        forChild          : [],
        federalId         : "",
        licenseNum        : "",
        typeOfProvider    : "",
        typeOfCare        : "",
        address           : "",
        address2          : "",
        city              : "",
        state             : "NJ",
        zip               : "",
        phone             : "",
        monthlyAmt        : null,
      }
      this.editDialogInfo   = blankProvider
      this.editType         = "new"
      this.editDialog       = true
    },
    closeDialog(){
      this.editDialogInfo = {}
      this.editDialog     = false
      this.editType       = ""
    },
    confirmDelProvider(prov){
      this.delProv = prov
      this.delDialog = true
    },
    delProvider(){
      this.$store.dispatch('removeProvider', this.delProv)
      this.delDialog = false
    },
    editProvider(prov){
      this.editDialogInfo = prov
      this.editType       = "edit"
      this.editDialog     = true
    }
  },
  computed: {
    getProviders(){
      return this.$store.getters.getProviders
    },
    getUserRole(){
      return this.$store.getters.getUserRole
    }
  }
}
</script>

<style lang="css">
.tableRow:nth-child(odd){
  background: #e0e0e0;
}
</style>
