<template>
  <v-skeleton-loader
    ref="skeleton"
    type="card-heading, image"
    transition-group="scale-transition"
    :loading="isLoading"
    light
    >
    <v-card light>
      <v-card-title class="blue white--text">Column Chart</v-card-title>
      <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
      />
    </v-card>
  </v-skeleton-loader>
</template>


<script>
import { GChart } from "vue-google-charts";

export default {
  components: {
    GChart
  },
  computed: {
    chartData() {
      var data = this.$store.getters.getChartData
      if(data == ''){
        this.isLoading = true
      }
      else
      {
        this.isLoading = false
        return this.$store.getters.getChartData
      }
    }
  },
  data() {
    return {
      isLoading: true,
      chartOptions: {
        chart: {
          title: 'Shipment Details',
          subtitle: 'State, Numbers of orders',
        },
        vAxis: {title: 'Orders'},
        hAxis: {title: 'State'}
      }
    }
  }
}
</script>