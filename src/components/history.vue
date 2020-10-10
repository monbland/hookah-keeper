<script>
export default {
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
  <v-container>
    <v-card>
      <v-toolbar color="#0037EE" dark flat>
        <v-toolbar-title class="headline pt-3 pl-3">
          История смен
        </v-toolbar-title>
        <template v-slot:extension>
          <v-btn
            fab
            bottom
            right
            absolute
            @click="$router.push({ name: 'home' })"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-card-text>
        <v-row
          v-for="(shift, index) in $store.state.history"
          :key="`${index}-shift`"
        >
          <v-col cols="12" class="title">Смена: {{ shift.name }}</v-col>
          <v-col
            v-for="(table, subIndex) in shift.checkedTables"
            :key="`${index}-${subIndex}-table`"
            cols="12"
          >
            <span class="font-weight-bold">Стол: {{ table.name }}</span>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Позиция</th>
                  <th>Стоимость</th>
                </tr>
              </thead>
              <tbody
                v-for="(order, subSubIndex) in table.orders"
                :key="`${index}-${subIndex}-${subSubIndex}-order`"
              >
                <tr>
                  <th>{{ order.text }}</th>
                  <th>{{ order.value }}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Итого:</th>
                  <th>{{ cost(table) }}</th>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          <v-divider />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
