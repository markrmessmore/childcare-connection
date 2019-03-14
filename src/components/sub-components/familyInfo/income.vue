<template lang="html">
  <v-card flat>
    <v-card-text>
      <p class="subheading">
        Click into the appropriate cell. Calculations will be performed automatically.
      </p>
      <v-expansion-panel>
        <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
          <div slot="header" class="subheading">Primary Applicant</div>
          <v-data-table
            :headers="incomeHeaders"
            :items="applicant"
            hide-actions
            item-key="id"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left subheading">{{props.item.title}}</td>
              <td class="" @blur="calcTotal(props.item)">
                <v-text-field
                  prepend-inner-icon="attach_money"
                  v-model="props.item.weekly"
                >
                </v-text-field>
              </td>
              <td class="" @blur="calcTotal(props.item)">
                <v-text-field
                  prepend-inner-icon="attach_money"
                  v-model="props.item.biWeekly"
                >
                </v-text-field>
              </td>
              <td class="" @blur="calcTotal(props.item)">
                <v-text-field
                  prepend-inner-icon="attach_money"
                  v-model="props.item.monthly"
                >
                </v-text-field>
              </td>
              <td class="" @blur="calcTotal(props.item)">
                <v-text-field
                  prepend-inner-icon="attach_money"
                  v-model="props.item.annually"
                >
                </v-text-field>
              </td>
              <td class="text-xs-right">${{calcTotal(props.item)}}</td>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br>
<!-- FINANCIAL INFO: CO-APPLICANT -->
    <v-expansion-panel>
      <v-expansion-panel-content lazy class="elevation-3 accent2 white--text">
        <div slot="header" class="subheading">Co-applicant</div>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="incomeHeaders"
                :items="coapplicant"
                hide-actions
                item-key="id"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left subheading">{{props.item.title}}</td>
                  <td class="subheading" @blur="calcTotal(props.item)">
                    <v-text-field
                      prepend-inner-icon="attach_money"
                      v-model="props.item.weekly"
                    >
                    </v-text-field>
                  </td>
                  <td class="subheading" @blur="calcTotal(props.item)">
                    <v-text-field
                      prepend-inner-icon="attach_money"
                      v-model="props.item.biWeekly"
                    >
                    </v-text-field>
                  </td>
                  <td class="subheading" @blur="calcTotal(props.item)">
                    <v-text-field
                      prepend-inner-icon="attach_money"
                      v-model="props.item.monthly"
                    >
                    </v-text-field>
                  </td>
                  <td class="subheading" @blur="calcTotal(props.item)">
                    <v-text-field
                      prepend-inner-icon="attach_money"
                      v-model="props.item.biWeekly"
                    >
                    </v-text-field>
                  </td>
                  <td class="text-xs-right subheading">{{calcTotal(props.item)}}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    appIncome: Array,
    coAppIncome: Array
  },
  data(){
    return{
      applicant: this.appIncome,
      coapplicant: this.coAppIncome,
      incomeHeaders: [
        {sortable: false},
        {
          text: 'Weekly',
          align: 'center',
          sortable: false,
          value: 'weekly',
          class: "subheading"
        },
        {
          text: 'Bi-Weekly',
          align: 'center',
          sortable: false,
          value: 'biweekly',
          class: "subheading"
        },
        {
          text: 'Monthly',
          align: 'center',
          sortable: false,
          value: 'monthly',
          class: "subheading"
        },
        {
          text: 'Annually',
          align: 'center',
          sortable: false,
          value: 'annually',
          class: "subheading"
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total',
          class: "subheading"
        }
      ]
    }
  },
  methods: {
    calcTotal(values){
      return (Number(values.weekly) * 52) + (Number(values.biWeekly) * 26) + (Number(values.monthly) * 12) + Number(values.annually)
    }
  },
}
</script>

<style lang="css">
</style>
