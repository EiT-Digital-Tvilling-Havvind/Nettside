<template>
  <table class="table-fixed text-left w-full max-w-full bg-gray-100 rounded shadow-md mt-2">
    <thead class="text-gray-500 uppercase tracking-wider text-sm">
      <tr>
        <th class="p-2 w-1/4 font-semibold">Oppgavebeskrivelse</th>
        <th class="p-2 w-1/4 font-semibold">Tidsstempel</th>
        <th class="p-2 w-1/4 font-semibold">Mekaniker</th>
        <th class="p-2 w-1/4 font-semibold">Kommentar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="maintenance in maintenances" :key="maintenance.id" class="odd:bg-gray-50 hover:bg-blue-100 cursor-pointer" @click="openMaintenance(maintenance.id)">
        <td class="p-2 truncate" :title="maintenance.task_description">
          <span v-if="maintenance.preventive">Forebyggende vedlikehold</span>
          <span v-else>{{getFailureMode(maintenance.faultMode)}}</span>
        </td>
        <td class="p-2 truncate">{{timestampToTimestring(maintenance.date)}}</td>
        <td class="p-2 truncate">{{maintenance.mechanic.name}}</td>
        <td class="p-2 truncate" :title="maintenance.comment">{{maintenance.comment}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import failureModes from '@/failureModes'
export default {
  components: {},
  props: {
    maintenances: {
      type: Array,
      required: true,
    }
  },
  data: () => ({

  }),
  computed: {

  },
  methods: {
    openMaintenance(id) {
      this.$emit('openMaintenance', id)
    },
    timestampToTimestring(date) {
      return (new Date(date)).toLocaleString()
    },
    getFailureMode(failureModeKey) {
      const group_id = failureModeKey.split('.')[0]
      const group = failureModes.find(gr => gr.id === group_id)
      if(group === null) {
        return '-';
      }
      const mode = group.modes.find(md => md.id === failureModeKey)
      if(group === null) {
        return '-';
      }
      return mode.title;
    },
  },
  mounted() {
  },
  watch: {},
}
</script>

<style>
</style>