<template>
  <v-card light>
    <v-card-title>Column Chart</v-card-title>
    <GChart
      type="ColumnChart"
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
        }
      }
    }
  }
}
</script>