<template>
  <v-container
    justify-center
    align-center
  >
    <DataTable/>
    <v-row>
      <v-col cols="12" sm="6">
        <PieChart/>
      </v-col>
      <v-col cols="12" sm="6">
        <BarChart/>
      </v-col>
      <v-col cols="12" sm="6">
        <ComboChart/>
      </v-col>
      <v-col cols="12" sm="6">
        <AreaChart/>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import PieChart from '~/components/PieChart.vue'
import BarChart from '~/components/BarChart.vue'
import ComboChart from '~/components/ComboChart.vue'
import AreaChart from '~/components/AreaChart.vue'

export default {
  components: {
    DataTable,
    PieChart,
    BarChart,
    ComboChart,
    AreaChart
  }
}
</script>

<style>

.v-content {
  background-color: #e5e5e5;
}

</style>
