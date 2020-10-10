<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    cost(table) {
      let result = 0
      table.orders.forEach((order) => {
        result += order.value
      })
      return result
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      Рассчитанные столы
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <thead>
          <tr>
            <th>Стол</th>
            <th>Сумма</th>
            <th>Удалить из рассчитанных</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(table, index) in value" :key="`${index}-table`">
            <th>{{ table.name }}</th>
            <th>{{ cost(table) }}</th>
            <th>
              <v-btn icon @click="$store.commit('deleteFromChecked', table)">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </th>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
