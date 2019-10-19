<template>
  <v-app-bar
    color="deep-purple accent-4"
    dense
    dark
    >
    <v-toolbar-title>DashBoard</v-toolbar-title>
    <v-spacer></v-spacer>
    <input
    type="file" 
    accept=".csv"
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
      vm.parse_header = lines[0].split(",")
      
      lines.map(function(line, indexLine){
        if (indexLine < 1) return // Jump header line
        
        var obj = {}
        var currentline = line.split(",")
        
        headers.map(function(header, indexHeader){
          obj[header] = currentline[indexHeader]
        })
        
        result.push(obj)
      })
      console.log(result[2].LAT );
      result.pop()
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