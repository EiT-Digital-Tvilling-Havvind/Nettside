<template>
  <div class="relative w-full h-full">
        <p>
          <span class="font-semibold text-gray-500">Nåværende effekt: </span>
          <span>{{turbine.effect_mw}} MW </span>
        </p>
        
        <p>
          <span class="font-semibold text-gray-500">Nåværende retning: </span>
          <span>{{turbine.direction}}&deg; {{cardinalDirection(turbine.direction)}}</span>
        </p>

        <hr class="border-gray-300 my-2">
        
        <div v-if="lastMaintenance !== null">
          <p class="font-semibold text-gray-500">Siste vedlikehold: </p>
          <p class="text-sm">
            <span class="pl-2 font-semibold text-gray-500">Mekaniker: </span>
            <span>{{lastMaintenance.mechanic ? lastMaintenance.mechanic.name : '-' }}</span>
          </p>
          <p class="text-sm">
            <span class="pl-2 font-semibold text-gray-500">Tidsstempel: </span>
            <span>{{timestampToTimestring(lastMaintenance.timestamp)}}</span>
          </p>
          <p class="text-sm" v-if="lastMaintenance.comment">
            <span class="pl-2 font-semibold text-gray-500">Kommentar: </span>
            <span>{{lastMaintenance.comment}}</span>
          </p>
        </div>
        <div class="mt-4 flex justify-end">
          <button 
            class="eit-button"
            @click="$emit('openTurbineDetail', turbine.id)"
          >
            Vis detaljer
          </button>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    turbine: {
      type: Object,
      required: false,
      default: {}
    }
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters([ 'getMaintenances', 'getMechanics', ]),
    lastMaintenance() {
      console.log(this.getMaintenances
        .filter(maintenance => maintenance.turbine_id === this.turbine.id)
        .map(maintenance => ({
          ...maintenance,
          mechanic: this.getMechanics.find(mechanic => mechanic.id === maintenance.mechanic_id)
        }))
        .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))
      return this.getMaintenances
        .filter(maintenance => maintenance.turbine_id === this.turbine.id)
        .map(maintenance => ({
          ...maintenance,
          mechanic: this.getMechanics.find(mechanic => mechanic.id === maintenance.mechanic_id)
        }))
        .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
        .find(() => true) || null // get the first element that matches the stuff above here or return null
    },
  },
  methods: {
    cardinalDirection(degrees) {
      if(degrees < 22.5 || degrees > 337.5) { return 'N' }
      if(degrees <= 67.5)  { return 'NE' }
      if(degrees <= 112.5) { return 'E' }
      if(degrees <= 157.5) { return 'SE' }
      if(degrees <= 202.5) { return 'S' }
      if(degrees <= 247.5) { return 'SW' }
      if(degrees <= 292.5) { return 'W' }
      if(degrees <= 237.5) { return 'W' }
      else { return '-' }
    },
    timestampToTimestring(timestamp) {
      return (new Date(timestamp)).toLocaleString()
    },
  },
  mounted() {
  },
  watch: {},
}
</script>

<style>
</style>