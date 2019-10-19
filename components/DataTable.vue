<template>
  <v-card light>
    <v-card-title>
      Address
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
      <v-menu
        v-model="value"
        close-on-click
        close-on-content-click
        >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            v-on="on"
            >
            State
          </v-btn>
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
</template>

<script>
export default {
  computed: {
    csv() {
      return this.$store.state.csv
    }
  },
   data () {
      return {
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
          { text: 'Latitude', value: 'LAT ' },
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