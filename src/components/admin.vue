<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon left>far fa-user</v-icon>
        Admin Control Panel
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs
      v-model="rowOneTab"
      color="primary"
      dark
      grow
      centered
      slider-color="secondary"
    >
      <v-tab>
        <v-icon left>fas fa-user-friends</v-icon>
        Users
      </v-tab>
      <v-tab>
        <v-icon left small>fas fa-file-invoice-dollar</v-icon>
        Program Values
      </v-tab>
      <v-tab-item>
        <v-container>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn color="accent2" outline @click="addUserDialog = true" round outline small>
              <v-icon left>fas fa-plus-circle</v-icon>
              Add User
            </v-btn>
          </v-layout>
          <v-tabs
            v-model="activeTab"
            color="info"
            slider-color="secondary"
            grow
            centered
          >
            <v-tab>Active Users</v-tab>
            <v-tab>Deactivated Users</v-tab>
            <v-tab-item>
              <v-data-table
                :headers="tableHeaders"
                :items="getActiveUsers"
                hide-actions
                class=""
                item-key="id"
              >
                <template v-slot:items="props">
                  <tr class="tableRow">
                    <td class="subheading">{{ props.item.email }}</td>
                    <td class="subheading">{{ props.item.role }}</td>
                    <td class="text-xs-center">
                      <v-btn color="accent" small icon @click="resetPassword(props.item)">
                        <v-icon small>fas fa-undo</v-icon>
                      </v-btn>
                    </td>
                    <td class="text-xs-center">
                      <v-btn color="accent" small icon @click="changeRole(props.item)">
                        <v-icon small>fas fa-shield-alt</v-icon>
                      </v-btn>
                    </td>
                    <td class="text-xs-center">
                      <v-btn color="accent" small icon @click="deactivateUser(props.item)">
                        <v-icon small>fas fa-ban</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                :headers="inactiveTableHeaders"
                :items="getInactiveUsers"
                hide-actions
                class=""
                item-key="id"
              >
                <template v-slot:items="props">
                  <tr class="tableRow">
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.role }}</td>
                    <td class="text-xs-center">
                      <v-btn color="accent" small icon @click="activateUser(props.item)">
                        <v-icon small>fas fa-chevron-circle-up</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <dbVariables :programAmts="getValues"></dbVariables>
      </v-tab-item>
    </v-tabs>
    <!-- ADD USER DIALOG -->
    <v-dialog
      v-model="addUserDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <addUser @close="closeDialogs()"></addUser>
    </v-dialog>
    <!-- RESET PASSWORD DIALOG -->
    <v-dialog
      v-model="resetPassDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <resetPass :user="selectedUser" @close="closeDialogs()"></resetPass>
    </v-dialog>
    <!-- CHANGE ROLE DIALOG -->
    <v-dialog
      v-model="changeRoleDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <changeRole :userData="selectedUser" @close="closeDialogs()"></changeRole>
    </v-dialog>
    <!-- DELETE USER DIALOG -->
    <v-dialog
      v-model="deactivateUserDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <deactivateUser :userData="selectedUser" @close="closeDialogs()"></deactivateUser>
    </v-dialog>
    <!-- ACTIVATE USER DIALOG -->
    <v-dialog
      v-model="activateUserDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <activateUser :userData="selectedUser" @close="closeDialogs()"></activateUser>
    </v-dialog>
  </v-card>
</template>

<script>
import activateUser   from '@/components/admin/activateUser'
import addUser        from '@/components/admin/addUser'
import changeRole     from '@/components/admin/changeRole'
import dbVariables    from '@/components/admin/dbVariables'
import deactivateUser from '@/components/admin/deactivateUser'
import resetPass      from '@/components/admin/resetPass'

export default {
  components: {
    activateUser, addUser, changeRole, dbVariables, deactivateUser, resetPass
  },
  data(){
    return{
      activeTab           : "",
      activateUserDialog  : false,
      addUserDialog       : false,
      changeRoleDialog    : false,
      deactivateUserDialog: false,
      resetPassDialog     : false,
      rowOneTab           : "",
      selectedUser: {
        email : "",
        role  : "",
        uid   : ""
      },
      tableHeaders: [
        { text: 'User Email', value: 'email', class: "subheading" },
        { text: 'User Role', value: 'role', class: "subheading" },
        { text: "Reset Password", align: 'center', value: "", sortable: false, class: ""},
        { text: "Change Role", align: 'center', value: "", sortable: false, class: ""},
        { text: "Deactivate User", align: 'center', value: "", sortable: false, class: ""}
      ],
      inactiveTableHeaders: [
        { text: 'User Email', value: 'email', class: "subheading" },
        { text: 'User Role', value: 'role', class: "subheading" },
        { text: "Activate User", align: 'center', value: "", sortable: false, class: ""}
      ]
    }
  },
  methods: {
    activateUser(user){
      this.activateUserDialog = true
      this.selectedUser     = user
    },
    changeRole(user){
      this.changeRoleDialog = true
      this.selectedUser     = user
    },
    closeDialogs(){
      this.activateUserDialog   = false
      this.addUserDialog        = false
      this.deactivateUserDialog = false
      this.changeRoleDialog     = false
      this.resetPassDialog      = false
      this.selectedUser     = {
        email : "",
        role  : "",
        uid   : ""
      }
    },
    deactivateUser(user){
      this.deactivateUserDialog = true
      this.selectedUser     = user
    },
    resetPassword(user){
      this.selectedUser     = user
      this.resetPassDialog  = true
    }
  },
  computed: {
    getActiveUsers(){
      return this.$store.getters.getUsersAndRoles.filter(usr => {
        return usr.role !== "inactive"
      })
    },
    getInactiveUsers(){
      return this.$store.getters.getUsersAndRoles.filter(usr => {
        return usr.role === "inactive"
      })
    },
    getValues(){
      return this.$store.getters.getDbVariables[0].paymentAmts
    }
  }
}
</script>

<style lang="css">
.tableRow:nth-child(odd){
  background: #e0e0e0;
}
</style>
