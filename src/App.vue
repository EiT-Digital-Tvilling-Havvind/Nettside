<template>
  <div id="app" class="w-full h-screen flex flex-row">
    <div class="flex-grow">
      <Map 
        :turbines="turbines"
        @openTurbineDetail="openTurbineDetail"
      />
    </div>
    <transition name="">
      <div 
        class="transition-all duration-100 border-gray-300 overflow-hidden"
        :class="showDetail ? 'w-1/2 border-l-2' : 'w-0 border-l-0'"
      >
        <TurbineDetail 
          :turbine="selectedTurbine"
          @close="closeDetail"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Map from './components/Map'
import TurbineDetail from './components/TurbineDetail'
import database from './database'

export default {
  name: 'App',
  components: { Map, TurbineDetail },
  data: () => ({
    turbines: database.turbines,
    selectedTurbineId: null,
  }),
  computed: {
    selectedTurbine() {
      return this.turbines.find(turb => turb.id === this.selectedTurbineId) ?? {}
    },
    showDetail() {
      return this.selectedTurbineId !== null
    }
  },
  methods: {
    openTurbineDetail(turbineId) {
      this.selectedTurbineId = turbineId
    },
    closeDetail() {
      this.selectedTurbineId = null
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
