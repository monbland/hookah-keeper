<script>
import Table from './table.vue'
import Checked from './checked.vue'
export default {
  components: {
    Table,
    Checked,
  },
  computed: {
    costWithOpen() {
      let result = this.$store.state.shift.allCost
      this.$store.state.shift.openTables.forEach((table) => {
        table.orders.forEach((order) => {
          result += order.value
        })
      })
      return result
    },
  },
  data() {
    return {
      dialog: {
        show: false,
        text: '',
        confirm: () => ({}),
      },
      newTable: {},
      dialogTable: false,
    }
  },
  methods: {
    confirmDialog(text, callback) {
      this.dialog.show = true
      this.dialog.text = text
      this.dialog.confirm = () => {
        callback()
        this.dialog.show = false
      }
    },
    openTableDialog() {
      this.newTable = {}
      this.dialogTable = true
    },
    addTable() {
      this.$store.commit('addTable', {
        name: `${new Date().toLocaleTimeString()} - ${this.newTable.number}`,
        orders: [],
      })
      this.dialogTable = false
    },
  },
}
</script>

<template>
  <v-container>
    <v-card v-if="$store.state.shift.open">
      <v-toolbar color="#0037EE" dark flat>
        <v-toolbar-title class="headline pt-3 pl-3">
          Смена - {{ $store.state.shift.name }}
        </v-toolbar-title>
        <template v-slot:extension>
          <v-btn fab bottom left absolute @click="openTableDialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            fab
            bottom
            right
            absolute
            @click="$router.push({ name: 'history' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-card-title>
        <v-row>
          <v-col cols="4"
            >Касса за смену: {{ $store.state.shift.allCost }}</v-col
          >
          <v-col cols="4">Касса с открытыми столами: {{ costWithOpen }}</v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(table, index) in $store.state.shift.openTables"
            :key="`${index}-table`"
            cols="12"
          >
            <Table
              :value="table"
              @check="(event) => confirmDialog(event.text, event.confirm)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="
            confirmDialog('закрыть смену', () => $store.commit('closeShift'))
          "
          >Закрыть смену</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card v-if="$store.state.shift.open">
      <Checked :value="$store.state.shift.checkedTables" />
    </v-card>
    <v-card v-else>
      <v-card-title>Смена закрыта</v-card-title>
      <v-card-text>Чтобы откыть смену нажмите кнопку ниже</v-card-text>
      <v-card-actions>
        <v-btn text @click="$store.commit('openShift')">Открыть смену</v-btn>
        <v-btn text @click="$router.push({ name: 'history' })">История</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog.show">
      <v-card>
        <v-card-title> Вы уверены что хотите {{ dialog.text }}? </v-card-title>
        <v-card-actions>
          <v-btn text @click="dialog.confirm">Подтвердить</v-btn>
          <v-btn text color="red" @click="dialog.show = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTable">
      <v-card>
        <v-card-title> Добавить стол </v-card-title>
        <v-card-text>
          <v-text-field v-model="newTable.number" type="number" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="addTable">Подтвердить</v-btn>
          <v-btn text color="red" @click="dialogTable = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
