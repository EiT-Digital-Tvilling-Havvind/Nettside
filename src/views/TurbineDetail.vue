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
          :class="!turbine.effect_mw ? 'text-red-700' : 'text-gray-600'"
        >
          (Effekt: {{turbine.effect_mw || 0}} MW)
        </h3>
      </div>
      <hr class="border-gray-200 border my-4">

      <!-- VEDLIKEHOLD -->
      <div class="flex justify-between">
        <h3 class="text-xl">Vedlikeholdsstyring</h3>
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

      <hr class="border-gray-200 border my-4">

      <div class="flex justify-between">
        <!-- KORROSJON -->
        <div class="flex-1">
          <h3 class="text-xl mb-4">Korrosjon i skvalpsona</h3>
          <CorrosionModel :upper="turbine.splashZoneUpper" :lower="turbine.splashZoneLower"/>
        </div>
        <div class="flex justify-start flex-1" v-if="turbine.windmilldata">
          <hr class="border-gray-200 border w-px h-full inline-block m-4">
          <div class="flex-1">
            <h3 class="text-xl mb-4">Annen informasjon</h3>
            <div 
              v-for="[key, value] in Object.entries(JSON.parse(turbine.windmilldata))"
              :key="key + value"
              class="flex justify-between"
            >
              <p class="text-gray-600 font-semibold">{{key}}</p>
              <p>{{value}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="chartDatas">
        <hr class="border-gray-200 border my-4">
        <div
          v-for="(chartData, idx) in chartDatas"
          :key="idx"
        >
          <h4 class="font-semibold text-gray-600 mb-2 text-center">{{chartData.title}}</h4>
          <LineGraph
            class="h-40 w-full"
            :chartData="chartData"
          />
        </div>
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
import CorrosionModel from '../components/CorrosionModel'
import LineGraph from '../components/LineGraph.vue'

export default {
  components: { Modal, MaintenanceTable, MaintenanceForm, CorrosionModel, LineGraph},
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
      windmillId: null,
      peopleId: null,
      date: null,
      preventive: false,
      faultMode: null,
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
        .filter(maintenance => maintenance.windmillId === this.turbineId)
        .map(maintenance => ({
          ...maintenance,
          mechanic: this.getMechanics.find(mechanic => mechanic.id === maintenance.peopleId)
        }))
        .sort((a, b) => a.date < b.date ? 1 : -1)
    },
    plannedMaintenances() {
      return this.maintenances.filter(mt => new Date(mt.date) > new Date())
    },
    completedMaintenances() {
      return this.maintenances.filter(mt => new Date(mt.date) <= new Date())
    },
    chartDatas() {
      return !this.turbine.graphs ? null : JSON.parse(this.turbine.graphs).map(graphData => ({
        title: graphData.title,
        labels: graphData.data[0].map(label => label.slice(-8)),
        datasets: [{
          label: graphData.title,
          data: graphData.data[1].map(dataPoint => Number.parseFloat((dataPoint).toFixed(2))),
          borderWidth: 1,
          borderColor: '#3388ff',
          backgroundColor: '#3388ff66',
          lineTension: 0,
        }]
      }))
    }
  },
  methods: {
    ...mapActions([ 'updateMaintenance', 'addMaintenance', 'removeMaintenance' ]),
    closeModal() {
      this.showModal = false
      this.editMaintenance = {
        id: null,
        windmillId: null,
        peopleId: null,
        date: null,
        preventive: false,
        faultMode: null,
        comment: null,
      }
    },
    openMaintenance(maintenanceId) {
      const maintenance = this.getMaintenances.find(maint => maint.id === maintenanceId)
      this.editMaintenance = JSON.parse(JSON.stringify(maintenance))
      this.showModal = true
    },
    async saveMaintenance() {
      this.editMaintenance.windmillId = this.turbineId
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