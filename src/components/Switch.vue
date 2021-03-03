<template>
  <div 
    class="h-9 rounded relative overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-100 border-gray-400 border-2" 
    :class="showLabels ? 'w-full' : ''"
    @click="valueComp = !valueComp"
  >
    <div 
      class="absolute h-full transition-all duration-100 flex select-none"
      :class="valueComp ? 'bg-green-600' : ''"
      :style="'width: calc(200% - 16px);' + (valueComp ? 'left: 0;' : 'left: calc(-100% + 16px);')"
    >
      <div class="h-full pl-2 bg-green-600 text-white" style="width: calc(50% - 8px);">
        <p v-if="showLabels" class="relative top-1 w-full text-center">{{onLabel}}</p>
      </div>
      <div 
        class="h-full w-4 min-w-4 border-2 rounded transition-colors duration-100"
        :class="valueComp ? 'bg-green-700 border-green-800 ' : 'bg-gray-200 border-gray-300 '"
      />
      <div class="h-full pr-2 bg-white" style="width: calc(50% - 8px);">
        <p v-if="showLabels" class="relative top-1 w-full text-center">{{offLabel}}</p>
      </div>
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
    labels: {
      validator: val => (typeof val === 'object' && typeof val['on'] === "string" && typeof val['off'] === "string") || val === null,
      required: false,
      default: null,
    }
  },
  computed: {
    valueComp: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    },
    showLabels() {
      return this.labels !== null
    },
    onLabel() {
      return this.showLabels ? this.labels['on'] : null
    },
    offLabel() {
      return this.showLabels ? this.labels['off'] : null
    },
  },
}
</script>

<style>
</style>