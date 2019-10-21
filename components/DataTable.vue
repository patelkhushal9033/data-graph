<template>
  <v-card light>
    <v-card-title class="blue white--text">
      Data Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        dark
        :disabled="isDisabled"
        color="white"
        >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-menu
        v-model="value"
        close-on-click
        close-on-content-click
        :disabled="isDisabled"
        >
        <template v-slot:activator="{ on }">
          <v-icon
            color="white"
            v-on="on"
            :disabled="isDisabled"
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
      <v-dialog 
        light
        persistent 
        v-model="dialog" 
        max-width="500px">
      <template v-slot:activator="{ on }">
        <v-icon
            color="white"
            v-on="on"
            :disabled="isDisabled"
            style="margin-left: 1%"
            >
            mdi-plus-thick
          </v-icon>
      </template>
      <v-form v-model="form">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.SUBURB" :rules="[rules.required]" label="Suburb"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.STATE" :rules="[rules.required]" label="State"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.POSTCODE" :rules="[rules.required]" label="Postcode"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.POBOX" :rules="[rules.required]" label="Po Box"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.COUNTRY" :rules="[rules.required]" label="Country"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.LONG" label="Longitude"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.LAT" label="Latitude"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
            <!-- save using mutation -->
            <v-btn color="blue darken-1" :disabled="!form" text @click="save()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="!isFiltered ? csv : filteredData "
      :items-per-page="5"
      :search="search"
      multi-sort
      class="elevation-1"
      >
      <template v-slot:item.action="{ item }">
        <v-layout class="d-flex flex-row">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </v-layout>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
export default {
  computed: {
    csv() {
      var data = this.$store.state.csv
      if(data == ''){
        this.isDisabled = true
      }
      else
      {
        this.isDisabled = false
        return data
      }
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
   data () {
      return {
        dialog: false,
        editedIndex: -1,
        isDisabled: true,
        search: '',
        value: false,
        isFiltered: false,
        filteredData: [],
        form: false,
        rules: {
          length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
          required: v => !!v || 'This field is required',
        },
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
          { text: 'Po Box', value: 'POBOX' },
          { text: 'Country', value: 'COUNTRY'},
          { text: 'Longitude', value: 'LONG'},
          { text: 'Latitude', value: 'LAT' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        editedItem: {
          COUNTRY: '',
          LAT: '',
          LONG: '',
          POBOX: '',
          POSTCODE: '',
          STATE: '',
          SUBURB: ''
        },
        defaultItem: {
          COUNTRY: '',
          LAT: '',
          LONG: '',
          POBOX: '',
          POSTCODE: '',
          STATE: '',
          SUBURB: ''
        }
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
      },
      close () {
        this.dialog = false
        setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        }, 300)
      },
      save() {
        if(this.editedIndex > -1) {
          const index = this.editedIndex
          const editedData = this.editedItem
          this.$store.commit('EDIT_DATA', {index, editedData})
        }
        else 
        {
          this.$store.commit('ADD_NEW_DATA',this.editedItem)
        }
        this.close()
      },
      deleteItem(item) {
        const index = this.csv.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.$store.commit('DELETE_DATA',index)   
      },
      editItem(item) {
        const index = this.csv.indexOf(item)
        this.editedIndex = index
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      }
    }
  }
</script>