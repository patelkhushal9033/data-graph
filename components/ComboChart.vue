<template>
  <v-card light>
    <v-card-title class="blue white--text">Combo Chart</v-card-title>
    <GChart
      type="ComboChart"
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
      chartData1: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Shipment Details',
          subtitle: 'State, Numbers of shipments',
          },
        seriesType: 'bars',
        series: {1: {type: 'line'}},
        vAxis: {title: 'Orders'},
        hAxis: {title: 'State'}
      }
    }
  }
}
</script>