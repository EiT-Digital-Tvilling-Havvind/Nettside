<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp, reactiveData } = mixins

export default {
  extends: Line,
  mixins: [ reactiveProp ],
  components: {},
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    
  }),
  computed: {
    chartDatas() {
      return this.chartData
    }
  },
  methods: {

  },
  mounted() {
    this.renderChart(this.chartData, {
    // this.renderChart(this.chartDatas, { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { yAxes: [{ ticks: { stepSize: 1, } }] },
      ...this.options, 
    })
  },
  watch: {},
}
</script>

<style>
</style>