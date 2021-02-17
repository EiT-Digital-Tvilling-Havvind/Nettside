<template>
  <div 
    class="bg-white min-w-min min-h-min rounded-lg absolute w-120 h-80 z-1000 transition-shadow duration-300"
    :class="dragX === null ? 'shadow-md' : 'shadow-xl'"
    :style="positionStyle"
  >
    <div
      class="h-12 cursor-move bg-gray-100 rounded-t-lg relative shadow"
      @dragstart="dragstartHandler"
      @drag="dragHandler"
      @dragend="dragendHandler"
      draggable
    >
      <h1 class="text-2xl py-2 px-4 text-gray-500 font-semibold">{{title}}</h1>
      <div 
        class="absolute h-8 w-8 top-2 right-2 text-2xl hover:bg-gray-200 rounded-full cursor-pointer text-center"
        @click="$emit('close')"
      >
        <span class="relative" style="bottom: 3px;">&times;</span>
      </div>
    </div>
    <div class="p-4">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    }
  },
  data: () => ({
    parentWidth: 0,
    parentHeight: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    dragX: null,
    dragY: null,
  }),
  computed: {
    positionStyle() {
      return `left: ${this.left}px; top: ${this.top}px;`
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    dragHandler(event) {
      if(event.x === 0 && event.y === 0) {
        // this happens on the next to last event. Not really a problem to simply do this.
        return
      }
      const diffX = event.x - this.dragX
      const diffY = event.y - this.dragY
      this.left += diffX
      this.top += diffY
      // make sure the dialog isn't outside the parent window (the map-area)
      this.left = Math.min(Math.max(this.left, 0), this.parentWidth - this.width)
      this.top = Math.min(Math.max(this.top, 0), this.parentHeight - this.height)
      this.dragX = event.x
      this.dragY = event.y

      localStorage.setItem('dialog_position', JSON.stringify([this.left, this.top]))
    },
    dragstartHandler(event) {
      // overwrite the "ghost"-image with a blank image. 
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      event.dataTransfer.setDragImage(img, 0, 0);
      this.dragX = event.x
      this.dragY = event.y
    },
    dragendHandler(event) {
      document.documentElement.style.cursor = null
      this.dragHandler(event)
      this.dragX = this.dragY = null
    },
    resizeHandler() {
      this.parentWidth = this.$el.parentElement.clientWidth
      this.parentHeight = this.$el.parentElement.clientHeight
      this.left = Math.min(Math.max(this.left, 0), this.parentWidth - this.width)
      this.top = Math.min(Math.max(this.top, 0), this.parentHeight - this.height)
    },
  },
  mounted() {
    if(localStorage.getItem('dialog_position')) {
      [this.left, this.top]  = JSON.parse(localStorage.getItem('dialog_position'))
    }

    this.width = this.$el.clientWidth
    this.height = this.$el.clientHeight
    this.resizeHandler()
    addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    removeEventListener('resize', this.resizeHandler)
  },
  watch: {},
}
</script>

<style>
</style>