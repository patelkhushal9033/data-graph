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
      let order = this.$store.getters.getOrdersCount
      let suburb = this.$store.getters.getSuburbCount
      if(order.length == 0 && suburb.length == 0) 
      {
        return []
        
      }
      let combine = []
      combine.push(['state','order','suburb'])
      order.forEach(function(item, i){
        if(item[0] == suburb[i][0])
        {
          combine.push([item[0],item[1],suburb[i][1]])
        }
      })
      
      return combine

    }
  },
  data() {
    return {
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