<template>
  <div id="app" class="w-full h-screen">
    <Map />
  </div>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'App',
  components: { Map },
}
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
