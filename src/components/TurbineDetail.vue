<template>
  <div class="relative w-full h-full">
    <!-- Close button -->
    <div 
      class="absolute h-10 w-10 top-3 right-3 text-3xl hover:bg-gray-200 rounded-full cursor-pointer text-center"
      @click="$emit('close')"
    >
      <span class="relative" style="bottom: 2px">&times;</span>
    </div>
    <div class="p-4 w-full h-full max-w-full overflow-auto flex flex-col">
      <h1 class="text-3xl">Turbine {{turbine.name}}</h1>
      <hr class="border-gray-200 my-4">

      <h3 class="text-xl">Hva skal vi ha her?</h3>

      <h3 class="text-lg text-gray-500 font-semibold mt-auto">Turbin-JSON:</h3>
      <p class="break-words text-gray-500">{{JSON.stringify(turbine)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    turbine: {
      type: Object,
      required: false,
      default: () => ({})
    },
  },
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