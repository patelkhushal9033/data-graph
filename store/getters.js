export const getters = {
  getChartData: state => {
    var obj = state.csv.map(function (data) {
      return data.STATE
    })
    if(obj.length === 0) return []
    var count = []
    count['state'] = 'Orders'
    obj.forEach(function(i) {
      count[i] = (count[i]||0) + 1
    })
    
    var result = Object.keys(count).map(function(key) {
      return [String(key), count[key]]
    })
    return result
  },

  filterState: state => (filteredState) => {
    return state.csv.filter(
      csv => csv.STATE.match(filteredState)
    )
  },

  getStateName: state => {
    var obj = state.csv.map(function (data){
      return data.STATE
    })

    var uniqueState = function (arr) {
      return arr.filter(function(item, index){
        return arr.indexOf(item) >= index
      })
    }
    return uniqueState(obj)
  }
}

export default getters