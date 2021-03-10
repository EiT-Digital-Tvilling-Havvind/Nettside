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
      <div class="flex items-end justify-start">
        <h1 class="text-3xl">Vindmølle {{turbine.name}}</h1>
        <h3 
          class="ml-4 text-xl "
          :class="turbine.effect_mw === 0 ? 'text-red-800' : 'text-gray-600'"
        >
          ({{`Effekt: ${turbine.effect_mw} MW`}})
        </h3>
      </div>
      <hr class="border-gray-200 my-4">

      <!-- VEDLIKEHOLD -->
      <div class="flex justify-between">
        <h3 class="text-xl">Vedlikehold</h3>
        <button @click="showModal = true" class="eit-button text-xs">Opprett vedlikehold</button>
      </div>
      <div v-if="!plannedMaintenances.length && !completedMaintenances.length">
        <h3 class="font-semibold text-gray-400 mt-4">Det er ikke lagt inn noe vedlikehold for denne vindmøllen.</h3>
      </div>
      <div v-if="plannedMaintenances.length > 0">
        <h3 class="font-semibold text-gray-500 mt-4">Planlagt vedlikehold</h3>
        <MaintenanceTable 
          :maintenances="plannedMaintenances"
          @openMaintenance="openMaintenance"
        />
      </div>
      <div v-if="completedMaintenances.length > 0">
        <h3 class="font-semibold text-gray-500 mt-4">Gjennomført vedlikehold</h3>
        <MaintenanceTable 
          :maintenances="completedMaintenances"
          @openMaintenance="openMaintenance"
        />
      </div>

      <hr class="border-gray-200 my-4">


      <!-- KORROSJON -->
      <div class="flex justify-between">
        <h3 class="text-xl">Korrosjon i splash-sona</h3>
      </div>
      <div class="my-4">
        <img class="h-72" src="../assets/corrosion_mockup.png">
      </div>


    </div>

    <!-- VEDLIKEHOLD REDIGERING -->
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
import MaintenanceTable from './MaintenanceTable.vue'
import MaintenanceForm from './MaintenanceForm.vue'

export default {
  components: { Modal, MaintenanceTable, MaintenanceForm, },
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
        .sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
    },
    plannedMaintenances() {
      return this.maintenances.filter(mt => new Date(mt.timestamp) > new Date())
    },
    completedMaintenances() {
      return this.maintenances.filter(mt => new Date(mt.timestamp) <= new Date())
    },
  },
  methods: {
    ...mapActions([ 'updateMaintenance', 'addMaintenance', 'removeMaintenance' ]),
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