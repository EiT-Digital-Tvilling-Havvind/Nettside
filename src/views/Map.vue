<template>
  <div class="h-full">
    <LMap ref="map" >
      <LControlLayers position="topright" />
       <LControl position="topleft">
        <div class="flex flex-col ring-2 ring-black ring-opacity-20 rounded-sm overflow-hidden" style="margin-left: 2px;">
          <button 
            class="p-0.5 bg-white focus:outline-none hover:bg-gray-100 active:bg-gray-200" 
            style="height: 30px; width: 30px;"
            title="Vis hele Norge"
            @click="setBoundsNorway"
          >
            <img src="https://i.imgur.com/gGF1nRK.png">
          </button>
          <!-- <hr class="border-gray-300">
          <button 
            class="p-0.5 bg-white focus:outline-none hover:bg-gray-100 active:bg-gray-200" 
            style="height: 30px; width: 30px;"
            title="Vis hele Norge"
            @click="setBoundsNorway"
          >
            <img src="https://i.imgur.com/gGF1nRK.png">
          </button> -->
        </div>
      </LControl>

      <LTileLayer :url="backgroundMap" />
      
      <LTileLayer 
        v-for="map in baseMaps" 
        :key="map.url" 
        :name="map.name"
        :visible="map.visible"
        :url="map.url" 
        :attribution="map.attribution"
        layer-type="base"
      />
      
      <LTileLayer 
        v-for="map in overlayMaps" 
        :key="map.url" 
        :name="map.name"
        :visible="map.visible"
        :url="map.url" 
        :attribution="map.attribution"
        layer-type="overlay"
      />

      <LGeoJson 
        name="Quadrants"
        :visible="false"
        :geojson="quadGeoJson"
        :options="geoJsonOptions('Quadrant')"
        layer-type="overlay"
      />
      <LGeoJson 
        name="Blocks"
        :visible="false"
        :geojson="blockGeoJson"
        :options="geoJsonOptions('Block')"
        layer-type="overlay"
      />
      <LMarkerCluster 
        :options="{
          iconCreateFunction: clusterDrawingFunction,
          polygonOptions: { color: '#222' },
        }"
      >
        <LMarker 
          v-for="turbine in turbines" 
          :key="turbine.id" 
          :lat-lng="[turbine.coordsLat, turbine.coordsLong]" 
          @click="markerClick(turbine)"
        >
          <LTooltip
            :content="turbine.name" 
            :options="{ direction: 'top', sticky: true }"
          />
          <LIcon 
            :icon-anchor="[20,20]"
            :icon-size="[40, 40]"
          >
            <div class="relative w-10 h-10">
              <img 
                class="absolute -z-1 -inset-3 h-16 w-16 pointer-events-none"
                :style="`transform: rotate(${turbine.windFromDirection || 0}deg) scaleX(0.8);`"
                src="../assets/arrow.png" 
              >
              <img 
                class="w-full h-full rounded-full ring-2 ring-gray-900 bg-white"
                :src="turbine.image" 
              >
              <div 
                class="rounded-full w-3 h-3 ring-2 ring-gray-900 absolute bottom-0 right-0" 
                :style="`background-color: ${statusColor(turbine)};`"
              />
            </div>

          </LIcon>
        </LMarker>
      </LMarkerCluster>
    </LMap>

    <!-- Info pane -->
    <Dialog 
      v-if="showModal" 
      @close="selectedTurbine = null"
      :title="selectedTurbine.name"
    >
      <TurbineDialog :turbine="selectedTurbine" @openTurbineDetail="openTurbineDetail" />
    </Dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LControlLayers, LControl, LGeoJson, LTooltip } from 'vue2-leaflet';
import L from 'leaflet'
import LMarkerCluster from 'vue2-leaflet-markercluster'
import Dialog from '@/components/Dialog'
import TurbineDialog from '@/views/TurbineDialog'

export default {
  components: { Dialog, TurbineDialog, LMap, LTileLayer, LMarker, LIcon, LControlLayers, LControl, LGeoJson, LTooltip, LMarkerCluster },
  props: {
    turbines: {
      type: Array,
      required: false,
      default: () => [],
    }
  },
  data: () => ({
    backgroundMap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    baseMaps: [
      {
        name: 'OpenStreetMap',
        visible: true, // default on
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a>',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      {
        name: 'OpenTopoMap',
        visible: false, 
        attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="http://viewfinderpanoramas.org">SRTM</a> | <a href="https://opentopomap.org">OpenTopoMap</a>',
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      },
      {
        name: 'Kartverket: Norgeskart bagrunn',
        visible: false, 
        attribution: '<a href="Kartverkethttp://www.statkart.no/">Kartverket</a>',
        url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
      },
      {
        name: 'Kartverket: Havbunn grunnkart',
        visible: false, 
        attribution: '<a href="Kartverkethttp://www.statkart.no/">Kartverket</a>',
        url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=havbunn_grunnkart&zoom={z}&x={x}&y={y}',
      },
      {
        name: 'Kartverket: Stedsnavnskart',
        visible: false, 
        attribution: '<a href="Kartverkethttp://www.statkart.no/">Kartverket</a>',
        url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster4&zoom={z}&x={x}&y={y}',
      },
    ],
    overlayMaps: [
      // When we have some overlays to show here
      // {
      //   name: 'Kartverket: Norgeskart bagrunn',
      //   visible: false, 
      //   attribution: '<a href="Kartverkethttp://www.statkart.no/">Kartverket</a>',
      //   url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn2&zoom={z}&x={x}&y={y}',
      // },
    ],
    selectedTurbine: null,
    quadGeoJson: [],
    blockGeoJson: [],
    fixMapSizeInterval: null,
  }),
  computed: {
    showModal: {
      get() {
        return this.selectedTurbine !== null
      },
      set(newVal) {
        if(!newVal) {
          this.selectedTurbine = null
        }
      }
    },
  },
  methods: {
    markerClick(turbine) {
      this.selectedTurbine = turbine
    },
    openTurbineDetail(turbineId) {
      this.$emit('openTurbineDetail', turbineId)
    },
    statusColor(turbine) {
      switch(turbine.status) {
        case 'running': 
          return 'green'
        case 'error': 
          return 'red'
        default:
          return 'yellow'
      }
    },
    closeModal() {
      this.showModal = false
    },
    async fetchQuadsAndBlocks() {
      // Norsk petroleum: https://www.norskpetroleum.no/interaktivt-kart-og-arkiv/interaktivt-kart/
      // Ligger masse geoJSON i Network-tabben, som vi gjerne kunne rendret 
      // Disse må hentes serverside (kanskje bare en gang), og så serveres oss derfra
      // på grunn av CORS.
      // const response = await fetch('https://www.norskpetroleum.no/factpages/mapv2_quadAreas.geo.json')

      const quadResponse = await fetch('/json/quadAreas.geo.json')
      const quadBody = await quadResponse.json()
      this.quadGeoJson = quadBody

      const blockResponse = await fetch('/json/blockAreas.geo.json')
      const blockBody = await blockResponse.json()
      this.quadGeoJson = blockBody

    },
    geoJsonOptions(type) {
      return { 
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(
            `<label>${type} ${feature.properties.name}</label>`,
            { permanent: false, sticky: true }
          )
        }
      }
    },
    fixMapSize() {
      this.$refs.map.mapObject.invalidateSize()
    },
    clusterDrawingFunction(cluster) {
      const childCount = cluster.getChildCount();
      return new L.DivIcon({ html: `<div><span>${childCount}</span></div>`, className: 'marker-cluster eit-marker-cluster' , iconSize: new L.Point(40, 40) });
    },
    focusAroundAllMarkers() {
      if(this.turbines.length === 0) {
        return this.setBoundsNorway()
      }

      const minLatLong = [ 90,  180]
      const maxLatLong = [-90, -180]

      for (const turbine of this.turbines) {
        minLatLong[0] = Math.min(turbine.coordsLat, minLatLong[0])
        minLatLong[1] = Math.min(turbine.coordsLong, minLatLong[1])
        
        maxLatLong[0] = Math.max(turbine.coordsLat, maxLatLong[0])
        maxLatLong[1] = Math.max(turbine.coordsLong, maxLatLong[1])
      }

      this.$refs.map.mapObject.fitBounds([minLatLong, maxLatLong])
    },
    setBoundsNorway() {
      // these coordinates are for norway. 
      const minLatLong = [57.961503, 3.985399]
      const maxLatLong = [71.371109,31.810323]
      this.$refs.map.mapObject.fitBounds([minLatLong, maxLatLong])
    },

  },
  async mounted() {
    this.fetchQuadsAndBlocks()
    this.fixMapSizeInterval = setInterval(this.fixMapSize, 200)
    this.focusAroundAllMarkers()
  },
  beforeDestroy() {
    clearInterval(this.fixMapSizeInterval)
  },
  watch: {
    turbines: {
      deep: true,
      handler: function (newVal, oldVal) {
        if(newVal.length) {
          this.focusAroundAllMarkers()
        }
      }
    }
  },
}
</script>

<style lang="scss">
  .eit-marker-cluster {
    @apply bg-gray-700;
    @apply ring-gray-500;
    @apply ring-8;
    @apply ring-opacity-30;
    @apply text-white;

    & div span {
      font-size: 1.25rem!important;
      @apply font-semibold;
    }
  }

  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>