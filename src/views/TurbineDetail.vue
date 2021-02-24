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

      <div class="flex justify-between">
        <h3 class="text-xl">Vedlikehold</h3>
        <button @click="showModal = true" class="eit-button text-xs">Opprett vedlikehold</button>
      </div>
      <div v-if="plannedMaintenances.length > 0">
        <h3 class="font-semibold text-gray-500 mt-4">Planlagt vedlikehold</h3>
        <table class="table-fixed text-left w-full max-w-full bg-gray-100 rounded shadow-md mt-2">
          <thead class="text-gray-500 uppercase tracking-wider text-sm">
            <tr>
              <th class="p-2 w-2/5 font-semibold" colspan="2">Oppgavebeskrivelse</th>
              <th class="p-2 w-1/5 font-semibold">Tidsstempel</th>
              <th class="p-2 w-2/5 font-semibold">Mekaniker</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="maintenance in plannedMaintenances" :key="maintenance.id" class="odd:bg-gray-50 hover:bg-blue-100 cursor-pointer" @click="openMaintenance(maintenance.id)">
              <td class="p-2 truncate" colspan="2" :title="maintenance.task_description">
                <span v-if="maintenance.preventive" class="bg-green-700 eit-pill" title="Preventivt vedlikehold" >Preventivt</span>
                <span v-else-if="maintenance.fault_mode === 'Defekt'" class="bg-yellow-500 eit-pill" title="Defekt">Defekt</span>
                <span v-else-if="maintenance.fault_mode === 'Svikt'" class="bg-red-700 eit-pill" title="Systemsvikt">Svikt</span>
                <span v-else class="bg-gray-500 eit-pill" title="Ukjent">Ukjent</span>

                <span>{{maintenance.task_description}}</span>
              </td>
              <td class="p-2 truncate">{{timestampToTimestring(maintenance.timestamp)}}</td>
              <td class="p-2 truncate">{{maintenance.mechanic.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="completedMaintenances.length > 0">
        <h3 class="font-semibold text-gray-500 mt-4">Gjennomført vedlikehold</h3>
        <table class="table-fixed text-left w-full max-w-full bg-gray-100 rounded shadow-md mt-2">
          <thead class="text-gray-500 uppercase tracking-wider text-sm">
            <tr>
              <th class="p-2 w-2/5 font-semibold" colspan="2">Oppgavebeskrivelse</th>
              <th class="p-2 w-1/5 font-semibold">Tidsstempel</th>
              <th class="p-2 w-1/5 font-semibold">Mekaniker</th>
              <th class="p-2 w-1/5 font-semibold">Kommentar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="maintenance in completedMaintenances" :key="maintenance.id" class="odd:bg-gray-50 hover:bg-blue-100 cursor-pointer" @click="openMaintenance(maintenance.id)">
              <td class="p-2 truncate" colspan="2" :title="maintenance.task_description">
                <span v-if="maintenance.preventive" class="bg-green-700 eit-pill" title="Preventivt vedlikehold" >Preventivt</span>
                <span v-else-if="maintenance.fault_mode === 'Defekt'" class="bg-yellow-500 eit-pill" title="Defekt">Defekt</span>
                <span v-else-if="maintenance.fault_mode === 'Svikt'" class="bg-red-700 eit-pill" title="Systemsvikt">Svikt</span>
                <span v-else class="bg-gray-500 eit-pill" title="Ukjent">Ukjent</span>

                <span class="truncate">{{maintenance.task_description}}</span>
              </td>
              <td class="p-2 truncate">{{timestampToTimestring(maintenance.timestamp)}}</td>
              <td class="p-2 truncate">{{maintenance.mechanic.name}}</td>
              <td class="p-2 truncate" :title="maintenance.comment">{{maintenance.comment || '-'}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>


    <Modal :show="showModal" @close="closeModal">
      <MaintenanceForm 
        v-model="editMaintenance" 
        @save="saveMaintenance"
        @delete="deleteMaintenance"
        @cancel="closeModal"
      />
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import { mapActions, mapGetters } from 'vuex'
import MaintenanceForm from './MaintenanceForm.vue'

export default {
  components: { Modal, MaintenanceForm },
  props: {
    turbineId: {
      type: Number,
      required: false,
      default: -1
    },
  },
  data: () => ({
    showModal: false,
    editMaintenance: {
      id: null,
      turbine_id: null,
      mechanic_id: null,
      timestamp: null,
      preventive: false,
      fault_mode: null,
      task_description: null,
      comment: null,
    },
  }),
  computed: {
    ...mapGetters([ 'getTurbines', 'getMaintenances', 'getMechanics' ]),
    turbine() {
      return this.getTurbines.find(turb => turb.id === this.turbineId) || {}
    },
    maintenances() {
      return this.getMaintenances
        .filter(maintenance => maintenance.turbine_id === this.turbineId)
        .map(maintenance => ({
          ...maintenance,
          mechanic: this.getMechanics.find(mechanic => mechanic.id === maintenance.mechanic_id)
        }))
        .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
    },
    plannedMaintenances() {
      return this.maintenances.filter(mt => mt.comment === null)
    },
    completedMaintenances() {
      return this.maintenances.filter(mt => mt.comment !== null)
    },
  },
  methods: {
    ...mapActions([ 'updateMaintenance', 'addMaintenance', 'removeMaintenance' ]),
    timestampToTimestring(timestamp) {
      return (new Date(timestamp)).toLocaleString()
    },
    closeModal() {
      this.showModal = false
      this.editMaintenance = {
        id: null,
        turbine_id: null,
        mechanic_id: null,
        timestamp: null,
        preventive: false,
        fault_mode: null,
        task_description: null,
        comment: null,
      }
    },
    openMaintenance(maintenanceId) {
      const maintenance = this.getMaintenances.find(maint => maint.id === maintenanceId)
      this.editMaintenance = JSON.parse(JSON.stringify(maintenance))
      this.showModal = true
    },
    async saveMaintenance() {
      this.editMaintenance.turbine_id = this.turbineId
      // if editing (not creating)
      if(this.editMaintenance.id !== null) {
        await this.updateMaintenance(this.editMaintenance)
      } else {
        await this.addMaintenance(this.editMaintenance)
      }
      this.closeModal()
    },
    async deleteMaintenance() {
      // assume edit-mode
      if(this.editMaintenance.id !== null) {
        await this.removeMaintenance(this.editMaintenance)
      }
      this.closeModal()
    }
  },
  mounted() {
  },
  watch: {},
}
</script>

<style>
</style>