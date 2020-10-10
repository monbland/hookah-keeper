<script>
import Timer from './timer.vue'
export default {
  components: {
    Timer,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    allCost() {
      let result = 0
      this.value.orders.forEach((order) => {
        result += order.value
      })
      return result
    },
  },
  data() {
    return {
      dialog: false,
      newItem: {},
    }
  },
  methods: {
    openDialog() {
      this.newItem = {}
      this.dialog = true
    },
    confirmAdd() {
      this.$store.commit('addToTable', {
        table: this.value,
        order: {
          text: this.newItem.text,
          value: parseInt(this.newItem.value),
          timestamp: new Date(),
        },
      })
      this.dialog = false
    },
    checkTable() {
      const payload = this.value
      this.$emit('check', {
        text: `рассчитать стол (сумма: ${this.allCost}руб.)`,
        confirm: () => {
          this.$store.commit('checkTable', payload)
        },
      })
    },
    deleteTable() {
      this.$emit('check', {
        text: 'удалить стол',
        confirm: () => {
          this.$store.commit('closeTable')
        },
      })
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      {{ value.name }}
    </v-card-title>
    <v-card-text>
      <v-btn outlined @click="openDialog">Добавить позицию к столу</v-btn>
      <v-simple-table>
        <thead>
          <tr>
            <th>Позиция</th>
            <th>Стоимость</th>
            <th>Таймер</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in value.orders" :key="`${index}-order`">
            <th>{{ order.text }}</th>
            <th>{{ order.value }}</th>
            <th>
              <Timer :value="order.timestamp" />
            </th>
            <th>
              <v-btn
                icon
                @click="
                  $store.commit('removeFromTable', {
                    table: value,
                    order: order,
                  })
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </th>
          </tr>
          <tr>
            <th class="font-weight-bold">Итого:</th>
            <th class="font-weight-bold">{{ allCost }}</th>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="checkTable">Рассчитать стол</v-btn>
      <v-btn text color="red" @click="deleteTable">Удалить стол</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Добавить позицию к столу</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newItem.text" label="Название позиции" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.value"
                label="Стоимость позиции"
                type="number"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="confirmAdd">Добавить</v-btn>
          <v-btn text color="red" @click="dialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
