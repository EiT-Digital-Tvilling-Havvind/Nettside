<template>
  <div id="app" class="w-full h-screen">
    <Three />
  </div>
</template>

<script>
import Three from './components/Three'

export default {
  name: 'App',
  components: {
    Three
  }
}
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
