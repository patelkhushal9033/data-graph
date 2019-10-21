import state from "./state"

export const getters = {
  getOrdersCount: state => {
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

  getCountryOrder: state => {
    var obj = state.csv.map(function (data) {
      return data.COUNTRY
    })
    if(obj.length === 0) return []
    var count = []
    count['Country'] = 'Orders'
    obj.forEach(function(i) {
      count[i] = (count[i]||0) + 1
    })
    
    var result = Object.keys(count).map(function(key) {
      return [String(key), count[key]]
    })
    return result
  },

  getSuburbCount: state => {

    var obj = state.csv.map(function (data){
      return data.STATE
    })

    var uniqueState = function (arr) {
      return arr.filter(function(item, index){
        return arr.indexOf(item) >= index
      })
    }
    var states = uniqueState(obj)

    if(obj.length === 0) return []
    var suburbs = []
    suburbs['State'] = 'Suburbs'
    states.forEach(function(data, index){
      var obj = state.csv.filter(function(data){
        return data.STATE == states[index]
      })
  
      var name = obj.map(function(data){
        return data.SUBURB
      })
  
      var unique = function(arr) {
        return arr.filter(function(item, index){
          return arr.indexOf(item) >= index
        })
      }
      suburbs[states[index]] = unique(name).length
    })

    var result = Object.keys(suburbs).map(function(key) {
      return [String(key), suburbs[key]]
    })
    return result
  },

  filterState: state => (filteredState) => {
    return state.csv.filter(
      csv => csv.STATE.match(filteredState)
    )
  }
}

export default getters