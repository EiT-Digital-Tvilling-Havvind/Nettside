<template>
  <div class="w-full h-full">
    <l-map 
      ref="map" 
      :zoom="zoom"
      :center="center"
      @update:zoom="updateZoom"
      @update:center="updateCenter"
      @update:bounds="updateBounds"
      @ready="onReady"
    >
      <l-tile-layer :url="mapUrl" />
      <l-marker v-for="location in locations" :key="location[0]" :lat-lng="location">
        <l-icon />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    zoom: 5,
    center: [ 63.446827, 10.421906 ],
    bounds: null,
    locations: [
      [ 63.447, 10.426 ],
      [ 63.445, 10.421 ],
      [ 63.443, 10.423 ],
    ],
  }),
  computed: {

  },
  methods: {
    updateZoom(zoom) {
      this.zoom = zoom
    },
    updateCenter(center) {
      this.center = center
    },
    updateBounds(bounds) {
      this.bounds = bounds
    },
    onReady() {

    },
  },
  mounted() {
  },
  watch: {
  },
}
</script>

<style>
</style>