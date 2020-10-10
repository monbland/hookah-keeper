import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shift: {
      open: false,
      openTables: [],
      closedTables: [],
      checkedTables: [],
      allCost: null,
      name: '',
    },
    history: [],
  },
  mutations: {
    openShift(state) {
      if (!state.shift.open)
        state.shift = {
          open: true,
          openTables: [],
          closedTables: [],
          checkedTables: [],
          allCost: null,
          name: new Date().toLocaleDateString(),
        }
    },
    closeShift(state) {
      if (state.shift.open) {
        state.history.push(state.shift)
        state.shift = {
          open: false,
        }
      }
    },
    addTable(state, payload) {
      state.shift.openTables.push(payload)
    },
    checkTable(state, payload) {
      payload.orders.forEach((order) => {
        state.shift.allCost += order.value
      })
      const index = state.shift.openTables.findIndex(
        (table) => table === payload
      )
      state.shift.checkedTables.push(payload)
      state.shift.openTables.splice(index, 1)
    },
    closeTable(state, payload) {
      const index = state.shift.openTables.findIndex(
        (table) => table === payload
      )
      state.shift.closedTables.push(payload)
      state.shift.openTables.splice(index, 1)
    },
    addToTable(state, payload) {
      const index = state.shift.openTables.findIndex(
        (table) => table === payload.table
      )
      state.shift.openTables[index].orders.push(payload.order)
    },
    removeFromTable(state, payload) {
      const index = state.shift.openTables.findIndex(
        (table) => table === payload.table
      )
      const subIndex = state.shift.openTables[index].orders.findIndex(
        (order) => order === payload.order
      )
      state.shift.openTables[index].orders.splice(subIndex, 1)
    },
    deleteFromChecked(state, payload) {
      payload.orders.forEach((order) => {
        state.shift.allCost -= order.value
      })
      const index = state.shift.checkedTables.findIndex(
        (table) => table === payload
      )
      state.shift.closedTables.push(payload)
      state.shift.checkedTables.splice(index, 1)
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
})
