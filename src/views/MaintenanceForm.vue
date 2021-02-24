<template>
  <form class="grid grid-cols-2 max-w-120 w-full gap-2">
    <h2 class="col-span-2 font-semibold text-gray-700 text-lg">{{isEditing ? 'Rediger' : 'Nytt'}} vedlikehold</h2>
    <div class="flex flex-col">
      <label for="mechanic_id">Mekaniker</label>
      <select 
        v-model="maintenance.mechanic_id"
        name="mechanic_id"
        class="eit-input"
      >
        <option hidden disabled :value="null">Velg mekaniker</option>
        <option v-for="mechanic in getMechanics" :key="mechanic.id" :value="mechanic.id" v-text="mechanic.name" />
      </select>
    </div>
    <div class="flex flex-col">
      <label for="timestamp">Tidsstempel</label>
      <input 
        v-model="maintenance.timestamp"
        type="datetime-local" name="timestamp"
        class="eit-input"
      />
    </div>
    <div class="col-span-2 flex flex-col">
      <label for="task_description">Oppgavebeskrivelse</label>
      <textarea 
        v-model="maintenance.task_description"
        name="task_description"
        class="eit-input"
        rows="3"
      />
    </div>
    <div class="flex flex-col">
      <label for="preventive">Preventivt</label>
      <EitSwitch 
        v-model="maintenance.preventive"
        type="checkbox" name="preventive"
      />
    </div>
    <div class="flex flex-col">
      <label for="fault_mode">Feilmode</label>
      <select 
        v-model="maintenance.fault_mode"
        :disabled="maintenance.preventive"
        name="fault_mode"
        class="eit-input"
      >
        <option :value="null">Ingen</option>
        <option value="Defekt">Defekt</option>
        <option value="Svikt">Svikt</option>
      </select>
    </div>
    <div class="col-span-2 flex flex-col">
      <label for="comment">Kommentar <span class="text-gray-400">(etter endt arbeid)</span></label>
      <textarea 
        v-model="maintenance.comment"
        name="comment"
        class="eit-input"
        rows="3"
      />
    </div>
    <div class="flex justify-start">
      <button class="eit-button" @click.prevent="cancel">Avbryt</button>
    </div>
    <div class="flex justify-end space-x-2">
      <button class="eit-button eit-button-red" @click.prevent="destroy" v-if="isEditing">Slett</button>
      <button class="eit-button eit-button-green" @click.prevent="save">Lagre</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    value: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    maintenance: {},
  }),
  computed: {
    ...mapGetters([ 'getMechanics' ]),
    isEditing() {
      return this.maintenance.id !== null
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('save')
    },
    destroy() {
      this.$emit('delete')
    },
  },
  mounted() {
    this.maintenance = this.value
  },
  watch: {
    maintenance: {
      deep: true,
      handler(newVal) {
        this.$emit('input', newVal)
      }
    }
  },
}
</script>

<style>
</style>