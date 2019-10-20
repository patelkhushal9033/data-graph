<template>
  <v-skeleton-loader
    ref="skeleton"
    type="card-heading, table-thead, table-tbody, table-tfoot"
    transition-group="scale-transition"
    :loading="isLoading"
    light
    >
    <v-card light>
      <v-card-title class="blue white--text">
        Data Table
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          single-line
          hide-details
          dark
          color="white"
        >
        </v-text-field>
        <v-menu
          v-model="value"
          close-on-click
          close-on-content-click
          >
          <template v-slot:activator="{ on }">
            <v-icon
              color="white"
              v-on="on"
              >
              mdi-filter-menu
            </v-icon>
          </template>
          <v-list
            light>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="filterState(index)" 
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="!isFiltered ? csv : filteredData "
        :items-per-page="5"
        :search="search"
        multi-sort
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  computed: {
    csv() {
      var data = this.$store.state.csv 
      if(data == ''){
        this.isLoading = true
      }
      else
      {
        this.isLoading = false
        return this.$store.state.csv
      }
    }
  },
   data () {
      return {
        isLoading: true,
        search: '',
        value: false,
        isFiltered: false,
        filteredData: [],
        items: [
        { title: 'ALL' },
        { title: 'ACT' },
        { title: 'NT' },
        { title: 'SA' },
        { title: 'WA' },
        { title: 'NSW' },
        { title: 'QLD' },
        { title: 'VIC' },
        { title: 'TAS' },
        ],
        headers: [
          { text: 'Postcode', value: 'POSTCODE'},
          { text: 'Suburb', value: 'SUBURB'},
          { text: 'State', value: 'STATE'},
          { text: 'Po Box', value: 'PO BOX' },
          { text: 'Country', value: 'COUNTRY'},
          { text: 'Longitude', value: 'LONG'},
          { text: 'Latitude', value: 'LAT' },
        ]
      }
    },
    methods: {
      filterState(i) {
        if(i === 0)
        {
          this.isFiltered = false
        }
        else 
        {          
          this.isFiltered = true
          this.filteredData = this.$store.getters.filterState(this.items[i].title)
        }
      }
    }
  }
</script>