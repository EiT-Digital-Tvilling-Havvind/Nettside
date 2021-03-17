import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    async initialFetch({commit}) {
      const turbineResponse = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/getWindmill')
      const turbines = await turbineResponse.json()
      commit('SET_TURBINES', turbines)

      const mechanicResponse = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/getPerson')
      const mechanics = await mechanicResponse.json()
      commit('SET_MECHANICS', mechanics)
      
      
      const maintenanceResponse = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/getMaintanance')
      const maintenances = await maintenanceResponse.json()
      commit('SET_MAINTENANCES', maintenances)
    },
    
    addMechanic({commit, getters}, mechanic) {
      // await fetch(...) 
      const id = Math.max(...getters.getMechanics.map(mech => mech.id)) + 1
      commit('SET_MECHANICS', [...getters.getMechanics, { ...mechanic, id }])
    },

    async addMaintenance({commit, getters}, maintenance) {
      delete maintenance.id
      const response = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/createMaintanance', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(maintenance) 
      })
      if(response.ok) {
        maintenance = await response.json()

        commit('SET_MAINTENANCES', [...getters.getMaintenances, maintenance ])
      }
    },
    async updateMaintenance({commit, getters}, maintenance) {
      const response = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/updateMaintanance', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(maintenance) 
      })

      if(response.ok) {
        const maintenances = [
          ...getters.getMaintenances.filter(maint => maint.id !== maintenance.id),
          maintenance,
        ]
        commit('SET_MAINTENANCES', maintenances)
      }
    },
    async removeMaintenance({commit, getters}, maintenance) {
      const id = maintenance.id
      const response = await fetch('https://eit-backend20210303144131.azurewebsites.net/home/removeMaintanance/' + id, { method: 'DELETE' })
      if(response.ok) {
        commit('SET_MAINTENANCES', getters.getMaintenances.filter(maint => maint.id !== maintenance.id))
      }
    }

  },

  getters: {
    getTurbines: state => state.turbines,
    getMechanics: state => state.mechanics,
    getMaintenances: state => state.maintenances,
  }

})