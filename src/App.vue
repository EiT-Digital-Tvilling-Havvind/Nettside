<template>
  <div id="app" class="w-full h-screen flex flex-row">
    <div class="flex-grow">
      <Map 
        :turbines="getTurbines"
        @openTurbineDetail="openTurbineDetail"
      />
    </div>
    <div 
      class="transition-all duration-100 border-gray-400 overflow-hidden"
      :class="showDetail ? 'w-1/2 border-l-2' : 'w-0 border-l-0'"
    >
      <TurbineDetail 
        :turbineId="selectedTurbineId"
        @close="closeDetail"
      />
    </div>
  </div>
</template>

<script>
import Map from '@/views/Map'
import TurbineDetail from '@/views/TurbineDetail'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Map, TurbineDetail },
  data: () => ({
    selectedTurbineId: null,
  }),
  computed: {
    ...mapGetters([ 'getTurbines', 'getMaintenances', 'getMechanics' ]),
    showDetail() {
      return this.selectedTurbineId !== null
    }
  },
  methods: {
    ...mapActions([ 'initialFetch' ]),
    openTurbineDetail(turbineId) {
      this.selectedTurbineId = turbineId
    },
    closeDetail() {
      this.selectedTurbineId = null
    }
  },
  mounted() {
    this.initialFetch()
  },
}
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @import "@/eit-styles.scss";
</style>
