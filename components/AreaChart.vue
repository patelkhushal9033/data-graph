<template>
  <v-card light>
    <v-card-title class="blue white--text">Stepped Area Chart</v-card-title>
    <GChart
      type="SteppedAreaChart"
      :data="chartData"
      :options="chartOptions"
    />
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  components: {
    GChart
  },
  computed: {
    chartData() {
      return this.$store.getters.getChartData
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          title: 'Shipment Details',
          subtitle: 'State, Numbers of shipments',
        },
        vAxis: {title: 'Orders'},
        hAxis: {title: 'State'}
      }
    }
  }
}
</script>