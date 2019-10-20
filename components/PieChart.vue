<template>
  <v-skeleton-loader
    ref="skeleton"
    type="card-heading, image"
    transition-group="scale-transition"
    :loading="isLoading"
    light
    >
    <v-card light>
      <v-card-title class="blue white--text">
        <span>Pie Chart</span>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
            >
              <v-icon>mdi-filter-menu</v-icon>
            </v-btn>
          </template>

          <v-list light>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="filterChart(i)"
              >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <GChart
        type="PieChart"
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
          subtitle: 'State, Numbers of shipments',
        },
        sliceVisibilityThreshold: 0
      },
      items: [
        {title: 'All', value: 0},
        { title: '> 5%', value: 0.05 },
        { title: '> 10%', value: 0.1},
        { title: '> 20%', value: 0.2  },
        { title: '> 30%', value: 0.3 },
        { title: '> 40%', value: 0.4 },
        { title: '> 50%', value: 0.5 },
        { title: '> 60%', value: 0.6 },
        { title: '> 70%', value: 0.7 },
        { title: '> 80%', value: 0.8 },
        { title: '> 90%', value: 0.9 }
      ],
    }
  },
  methods: {
    filterChart(i) {
      this.chartOptions.sliceVisibilityThreshold = this.items[i].value
    }
  }
}
</script>