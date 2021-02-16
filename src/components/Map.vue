<template>
  <div class="w-full h-full">
    <LMap 
      ref="map" 
      :zoom="zoom"
      :center="center"
      @update:zoom="updateZoom"
      @update:center="updateCenter"
      @update:bounds="updateBounds"
    >
      <LControlLayers position="topright" />

      <LTileLayer 
        :url="backgroundMap" 
      />
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
        @click="clickGeoJson"
      />
      <LGeoJson 
        name="Blocks"
        :visible="false"
        :geojson="blockGeoJson"
        :options="geoJsonOptions('Block')"
        layer-type="overlay"
        @click="clickGeoJson"
      />

      <LMarker 
        v-for="turbine in turbines" 
        :key="turbine.name" 
        :lat-lng="turbine.latLng" 
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
              class="w-full h-full rounded-full ring-2 ring-gray-900 bg-white"
              :src="turbine.image" 
              alt=""
            >
            <div 
              class="rounded-full w-3 h-3 ring-2 ring-gray-900 absolute bottom-0 right-0" 
              :style="`background-color: ${statusColor(turbine)};`"
            />
          </div>

        </LIcon>
      </LMarker>
    </LMap>

    <!-- Info pane -->
    <Modal :show="showModal" @close="showModal = false">
      <div class="w-96 rounded" v-if="selectedTurbine">
        <h1 class="text-gray-700 font-semibold text-2xl">{{selectedTurbine.name}}</h1>
        <hr class="border-gray-300 border my-2">
        <p>
          <span class="font-semibold text-gray-500">Current output: </span>
          <span>{{selectedTurbine.effect_mw}} MW </span>
        </p>
        
        <p>
          <span class="font-semibold text-gray-500">Current direction: </span>
          <span>{{selectedTurbine.direction}}&deg; {{cardinalDirection(selectedTurbine.direction)}}</span>
        </p>

        <hr class="border-gray-300 my-2">
        
        <div v-if="selectedTurbine.last_service">
          <p class="font-semibold text-gray-500">Last service: </p>
          <p class="text-sm">
            <span class="pl-2 font-semibold text-gray-500">Technician: </span>
            <span>{{selectedTurbine.last_service.technician}}</span>
          </p>
          <p class="text-sm">
            <span class="pl-2 font-semibold text-gray-500">Timestamp: </span>
            <span>{{selectedTurbine.last_service.timestamp}}</span>
          </p>
          <p class="text-sm">
            <span class="pl-2 font-semibold text-gray-500">Comment: </span>
            <span>{{selectedTurbine.last_service.comment}}</span>
          </p>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LControlLayers, LGeoJson, LTooltip } from 'vue2-leaflet';
import database from '../database'
import Modal from './Modal'

// These files are LARGE. 
import quadAreas from '../assets/json/quadAreas.geo.json' // 12 MB (595 334 lines)
import blockAreas from '../assets/json/blockAreas.geo.json' // 37 MB (1 874 966 lines)

export default {
  components: { Modal, LMap, LTileLayer, LMarker, LIcon, LControlLayers, LGeoJson, LTooltip },
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
    zoom: 10,
    center: [ 59.357346, 5.3098297 ],
    bounds: null,
    turbines: database.turbines,
    selectedTurbine: null,
    quadGeoJson: quadAreas,
    blockGeoJson: blockAreas,
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
    updateZoom(zoom) { this.zoom = zoom },
    updateCenter(center) { this.center = center },
    updateBounds(bounds) { this.bounds = bounds },
    markerClick(turbine) {
      this.selectedTurbine = turbine
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
    closeModal() {
      this.showModal = false
    },
    async fetchQuads() {
      // Norsk petroleum: https://www.norskpetroleum.no/interaktivt-kart-og-arkiv/interaktivt-kart/
      // Ligger masse geoJSON i Network-tabben, som vi gjerne kunne rendret 
      // Disse må hentes serverside (kanskje bare en gang), og så serveres oss derfra
      // på grunn av CORS.

      const response = await fetch('https://www.norskpetroleum.no/factpages/mapv2_quadAreas.geo.json')
      const body = response.json()
      this.quadGeoJson = body

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
    clickGeoJson(event, a, b) {
      console.log(event, a, b)
    }

  },
  mounted() {
  },
  watch: {
  },
}
</script>

<style>
</style>