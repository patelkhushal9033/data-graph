<template>
  <v-app-bar
    color="blue"
    dense
    dark
    >
    <v-toolbar-title>DashBoard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      small
      elevation="0"
      color="pink"
      @click="$refs.file.click()">
      <v-icon>mdi-attachment</v-icon>
    </v-btn>
    
    <input
      type="file"
      ref="file" 
      accept=".csv"
      style="display: none"
      @change="loadCSV($event)">

  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      parse_header: [],
      parse_csv: []
    }
  },
  methods: {
     csvJSON(csv){
      var vm = this
      var lines = csv.split("\n")
      var result = []
      var headers = lines[0].split(",")
      
      headers.forEach(function(line, index){
        headers[index] = headers[index].replace(/ /g,"")
        return headers
      })
      vm.parse_header = headers
      
      lines.forEach(function(line, indexLine){
        if (indexLine < 1) return // Jump header line
        
        var obj = {}
        var currentline = line.split(",")
        if(currentline == ''|| undefined) return   
        headers.forEach(function(header, indexHeader) {
          let val = currentline[indexHeader].trim()
          obj[header.trim()] = val === "" ? "-" : val
        })
        
        result.push(obj)
      })
      vm.$store.commit('SET_CSV', result)
    },
    loadCSV(e) {
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader();
        // Handle errors
        if(e != undefined) {
          var file = e.target.files[0]
          if(file != null && file.size > 0)
          {
            reader.readAsText(file);
            //process file
          }
        }
        reader.onload = function(event) {
          var csv = event.target.result;
          vm.parse_csv = vm.csvJSON(csv)
        };
        reader.onerror = function(evt) {
          if(evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        
        };
      } else {
        alert('FileReader are not supported in this browser.');
      }
    }
  }
}
</script>