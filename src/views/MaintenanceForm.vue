<template>
  <form class="grid grid-cols-3 w-120 gap-2">
    <h2 class="col-span-3 font-semibold text-gray-700 text-lg">{{isEditing ? 'Rediger' : 'Nytt'}} vedlikehold</h2>
    <div class="flex flex-col">
      <label for="peopleId">Mekaniker</label>
      <select 
        v-model="maintenance.peopleId"
        name="peopleId"
        class="eit-input"
      >
        <option hidden disabled :value="null">Velg mekaniker</option>
        <option v-for="mechanic in getMechanics" :key="mechanic.id" :value="mechanic.id" v-text="mechanic.name" />
      </select>
    </div>
    <div class="flex flex-col">
      <label for="date">Tidsstempel</label>
      <input 
        v-model="maintenance.date"
        type="datetime-local" name="date"
        class="eit-input"
      />
    </div>
    <div class="flex flex-col">
      <label for="preventive">Vedlikeholdstype</label>
      <EitSwitch 
        v-model="maintenance.preventive"
        :labels="{on: 'Forebyggende', off: 'Korrektivt'}"
        type="checkbox" name="preventive"
      />
    </div>
    <div class="flex flex-col col-span-3" :title="maintenance.preventive ? 'Sviktmodus er ikke relevant på forebyggende vedlikehold.' : ''">
      <label for="faultMode" :class="maintenance.preventive ? 'text-gray-500' : ''">Sviktmodus</label>
      <select 
        v-model="maintenance.faultMode"
        :disabled="maintenance.preventive"
        name="faultMode"
        class="eit-input"
      >
        <option :value="null">Ingen</option>
        <optgroup v-for="(modeGroup, idx) in failureModes" :key="idx" :label="modeGroup.name">
          <option v-for="mode in modeGroup.modes" :key="mode.id" :value="mode.id">{{mode.title}}</option>
        </optgroup>
      </select>
    </div>

    <div class="flex flex-col col-span-3">
      <label for="comment">Kommentar</label>
      <textarea 
        v-model="maintenance.comment"
        name="comment"
        class="eit-input"
        rows="4"
        style="height: 104px;"
      />
    </div>
    
    <div class="flex justify-start col-span-1">
      <button class="eit-button" @click.prevent="cancel">Avbryt</button>
    </div>
    <div class="flex justify-end space-x-2 col-span-2">
      <button class="eit-button eit-button-red" @click.prevent="destroy" v-if="isEditing">Slett</button>
      <button class="eit-button eit-button-green" @click.prevent="save">Lagre</button>
    </div>
  </form>
</template>

<script>
import failureModes from '@/failureModes'
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
    failureModes, 
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
        if(newVal.preventive && newVal.faultMode !== null) {
          this.maintenance.faultMode = null
        }
      }
    },
  },
}
</script>

<style>
</style>