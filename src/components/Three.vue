<template>
  <div id="three-container" class="h-full w-full">
    <vgl-namespace>
      <vgl-mesh-standard-material name="ex-material" />
      <vgl-box-geometry name="ex-geometry" />
      <!-- This scene is shared with 2 renderers. -->
      <vgl-scene name="ex-scene">
        <vgl-mesh geometry="ex-geometry" material="ex-material" />
        <vgl-directional-light position="1 2 3" />
      </vgl-scene>
      <!-- This creates left canvas and use the scene defined above. -->
      <vgl-renderer scene="ex-scene" camera="ex-camera-1" class="h-full w-full">
        <vgl-perspective-camera name="ex-camera-1" orbit-position="3 1 0.5" />
      </vgl-renderer>
    </vgl-namespace>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
  }),
  computed: {

  },
  methods: {

  },
  mounted() {
  },
  watch: {},
}
</script>

<style>
</style>