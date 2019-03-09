<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>person_outline</v-icon>
        Admin Control Panel
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout row>
        <v-spacer></v-spacer>
        <v-btn color="accent2" outline @click="addUserDialog = true">
          <v-icon left>add_circle</v-icon>
          Add User
        </v-btn>
      </v-layout>
      <v-data-table
        :headers="tableHeaders"
        :items="getAllUsers"
        hide-actions
        class="elevation-3"
        item-key="id"
      >
        <template v-slot:items="props">
          <tr class="tableRow">
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.role }}</td>
            <td class="text-xs-center">
              <v-btn color="accent" small icon @click="resetPassword(props.item)">
                <v-icon small>settings_backup_restore</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center">
              <v-btn color="accent" small icon @click="changeRole(props.item)">
                <v-icon small>security</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center">
              <v-btn color="accent" small icon @click="deleteUser(props.item)">
                <v-icon small>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
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
      v-model="deleteUserDialog"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <deleteUser :userData="selectedUser" @close="closeDialogs()"></deleteUser>
    </v-dialog>
  </v-card>
</template>

<script>
import addUser    from '@/components/admin/addUser'
import changeRole from '@/components/admin/changeRole'
import deleteUser from '@/components/admin/deleteUser'
import resetPass  from '@/components/admin/resetPass'

export default {
  components: {
    addUser, changeRole, deleteUser, resetPass
  },
  data(){
    return{
      addUserDialog: false,
      changeRoleDialog: false,
      deleteUserDialog: false,
      resetPassDialog: false,
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
        { text: "Delete User", align: 'center', value: "", sortable: false, class: ""}
      ]
    }
  },
  methods: {
    changeRole(user){
      this.changeRoleDialog = true
      this.selectedUser     = user
    },
    closeDialogs(){
      this.addUserDialog    = false
      this.deleteUserDialog = false
      this.changeRoleDialog = false
      this.resetPassDialog  = false
      this.selectedUser     = {
        email : "",
        role  : "",
        uid   : ""
      }
    },
    deleteUser(user){
      this.deleteUserDialog = true
      this.selectedUser     = user
    },
    resetPassword(user){
      this.selectedUser     = user
      this.resetPassDialog  = true
    }
  },
  computed: {
    getAllUsers(){
      return this.$store.getters.getUsersAndRoles
    }
  }
}
</script>

<style lang="css">
.tableRow:nth-child(odd){
  background: #e0e0e0;
}
</style>

<!--
Create user management interface to:
* Add users
* Set passwords
* Delete Users
* Delete Notes
* Edit Letters
-->
