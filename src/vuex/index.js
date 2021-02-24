import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import database from '../database'

export default new Vuex.Store({
  state: {
    turbines: [],
    mechanics: [],
    maintenances: [],
    
  },

  mutations: {
    SET_TURBINES(state, newVal) {
      state.turbines = newVal
    },
    SET_MECHANICS(state, newVal) {
      state.mechanics = newVal
    },
    SET_MAINTENANCES(state, newVal) {
      state.maintenances = newVal
    },
  },

  actions: {
    initialFetch({commit}) {
      // await fetch(...) 
      commit('SET_TURBINES', database.turbines)
      commit('SET_MECHANICS', database.mechanics)
      commit('SET_MAINTENANCES', database.maintenances)
    },

    addMechanic({commit, getters}, mechanic) {
      // await fetch(...) 
      const id = Math.max(...getters.getMechanics.map(mech => mech.id)) + 1
      commit('SET_MECHANICS', [...getters.getMechanics, { ...mechanic, id }])
    },

    addMaintenance({commit, getters}, maintenance) {
      // await fetch(...) 
      const id = Math.max(...getters.getMaintenances.map(maint => maint.id)) + 1
      commit('SET_MAINTENANCES', [...getters.getMaintenances, { ...maintenance, id }])
    },
    updateMaintenance({commit, getters}, maintenance) {
      // await fetch(...) 
      const maintenances = [
        ...getters.getMaintenances.filter(maint => maint.id !== maintenance.id),
        maintenance,
      ]
      commit('SET_MAINTENANCES', maintenances)
    },
    removeMaintenance({commit, getters}, maintenance) {
      // await fetch(...)
      commit('SET_MAINTENANCES', getters.getMaintenances.filter(maint => maint.id !== maintenance.id))
    }

  },

  getters: {
    getTurbines: state => state.turbines,
    getMechanics: state => state.mechanics,
    getMaintenances: state => state.maintenances,
  }

})