<template>
  <div class="w-16 h-9 rounded relative overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-100 border-gray-400 border-2" @click="valueComp = !valueComp">
    <div 
      class="absolute h-full w-32 transition-all duration-100 flex"
      :class="valueComp ? '-left-1 bg-green-600' : '-left-12'"
    >
      <div class="h-full w-12 bg-green-600" />
      <div 
        class="h-full w-4 border-2 rounded transition-colors duration-100"
        :class="valueComp ? 'bg-green-700 border-green-800 ' : 'bg-gray-200 border-gray-300 '"
      />
      <div class="h-full w-12 bg-white" />
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean, 
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean, 
      required: false,
      default: false,
    },
  },
  computed: {
    valueComp: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  },
}
</script>

<style>
</style>