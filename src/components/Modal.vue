<template>
  <div
    v-if="show"
    class="absolute bg-black bg-opacity-30 inset-0 flex items-center justify-center"
    style="z-index: 10000;"
    @click.self="close"
  >
    <div class="bg-white min-w-min min-h-min rounded p-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  },
  data: () => ({
  }),
  computed: {

  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
  mounted() {
  },
  watch: {},
}
</script>

<style>
</style>