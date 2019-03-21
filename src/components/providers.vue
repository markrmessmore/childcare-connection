`<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>fas fa-child</v-icon>
        Providers
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
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
        hide-actions
        class="elevation-2"
        item-key="id"
        expand
      >
      <template v-slot:items="props">
        <tr>
          <td width="40%" class="subheading">{{ props.item.name }}</td>
          <td width="40%" class="subheading">{{ props.item.typeOfProvider }}</td>
          <td class="text-xs-center">
            <v-btn color="accent" small icon @click="editProvider(props.item)">
              <v-icon small>edit</v-icon>
            </v-btn>
          </td>
          <td class="text-xs-center">
            <v-btn color="accent" small icon @click="editProvider(props.item)">
              <v-icon small>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <!-- <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template> -->
      </v-data-table>
    </v-card-text>
    <v-dialog
      v-model="editDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <editProvider @close="closeDialog()" :providerData="editDialogInfo" :editType="editType"></editProvider>
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
      editDialog: false,
      editDialogInfo: {},
      editType: "",
      expand: false,
      tableHeaders: [
        { text: 'Name', value: 'name', class: "subheading",  sortable: false },
        { text: 'Type', value: 'type', class: "subheading",  sortable: false },
        { text: "Edit", align: 'center', value: "", sortable: false, class: ""},
        { text: "Delete", align: 'center', value: "", sortable: false, class: ""},
      ],
    }
  },
  methods: {
    addProvider(){
      let blankProvider= {
        name              : "",
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
        papaStart         : "",
        papaEnd           : "",
        monthlyAmt        : null,
      }
      this.editDialogInfo   = blankProvider
      this.editType         = "new"
      this.editDialog       = true
    },
    closeDialog(){
      this.editDialog     = false
      this.editDialogInfo = {}
      this.editType       = ""
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
    }
  }
}
</script>

<style lang="css">
</style>
`
