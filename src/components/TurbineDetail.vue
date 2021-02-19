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
      <h1 class="text-3xl">Vindmølle {{turbine.name}}</h1>
      <hr class="border-gray-200 my-4">

      <h3 class="text-xl">Vedlikehold</h3>
      <h3 class="font-semibold text-gray-500 mt-4">Planlagt vedlikehold</h3>
      <table class="table-fixed text-left w-full max-w-full bg-gray-100 rounded-lg shadow-md mt-2">
        <thead class="text-gray-600">
          <tr>
            <th class="p-2 w-2/5" colspan="2">Oppgavebeskrivelse</th>
            <th class="p-2 w-1/5">Tidsstempel</th>
            <th class="p-2 w-2/5">Mekaniker</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="maintenance in plannedMaintenances" :key="maintenance.id" class="odd:bg-gray-50">
            <td class="p-2 truncate" colspan="2" :title="maintenance.task_description">
              <span class="bg-green-700 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Preventivt vedlikehold" v-if="maintenance.preventive">Preventivt</span>
              <span class="bg-yellow-500 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Svikt (redusert funksjon)" v-else-if="maintenance.fault_mode === 'Svikt'">Svikt</span>
              <span class="bg-red-700 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Defekt (null funksjon)" v-else-if="maintenance.fault_mode === 'Defekt'">Defekt</span>
              <span class="bg-gray-500 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Ukjent" v-else>Ukjent</span>

              <span class="truncate">{{maintenance.task_description}}</span>
            </td>
            <td class="p-2 truncate">{{maintenance.timestamp}}</td>
            <td class="p-2 truncate">{{maintenance.mechanic.name}}</td>
          </tr>
        </tbody>
      </table>
      <h3 class="font-semibold text-gray-500 mt-4">Gjennomført vedlikehold</h3>
      <table class="table-fixed text-left w-full max-w-full bg-gray-100 rounded-lg shadow-md mt-2">
        <thead class="text-gray-600">
          <tr>
            <th class="p-2 w-2/5" colspan="2">Oppgavebeskrivelse</th>
            <th class="p-2 w-1/5">Tidsstempel</th>
            <th class="p-2 w-1/5">Mekaniker</th>
            <th class="p-2 w-1/5">Kommentar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="maintenance in completedMaintenances" :key="maintenance.id" class="odd:bg-gray-50">
            <td class="p-2 truncate" colspan="2" :title="maintenance.task_description">
              <span class="bg-green-700 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Preventivt vedlikehold" v-if="maintenance.preventive">Preventivt</span>
              <span class="bg-yellow-500 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Svikt" v-else-if="maintenance.fault_mode === 'Svikt'">Svikt</span>
              <span class="bg-red-700 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Defekt" v-else-if="maintenance.fault_mode === 'Defekt'">Defekt</span>
              <span class="bg-gray-500 text-white font-bold px-1.5 pb-0.5 mr-2 rounded-full" title="Ukjent formål" v-else>Ukjent</span>

              <span class="truncate">{{maintenance.task_description}}</span>
            </td>
            <td class="p-2 truncate">{{maintenance.timestamp}}</td>
            <td class="p-2 truncate">{{maintenance.mechanic.name}}</td>
            <td class="p-2 truncate" :title="maintenance.comment">{{maintenance.comment || '-'}}</td>
          </tr>
        </tbody>
      </table>

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
    mechanics: {
      type: Array,
      required: false,
      default: () => ([])
    },
    maintenances: {
      type: Array,
      required: false,
      default: () => ([])
    },
  },
  data: () => ({
    
  }),
  computed: {
    plannedMaintenances() {
      return this.maintenances.filter(mt => mt.comment === null)
    },
    completedMaintenances() {
      return this.maintenances.filter(mt => mt.comment !== null)
    }
  },
  methods: {

  },
  mounted() {
    console.log(this.turbineMaintenances)
  },
  watch: {},
}
</script>

<style>
</style>