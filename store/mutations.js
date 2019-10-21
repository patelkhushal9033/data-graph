export const mutations = {
  SET_CSV: (state, csv) => {
    state.csv = csv
  },
  //add another to save at [1]
  ADD_NEW_DATA: (state, newData) => {
    state.csv.splice(0,0, newData)
  },

  DELETE_DATA: (state, index) => {
    state.csv.splice(index, 1)
  },

  EDIT_DATA: (state, {index, editedData}) => {
    Object.assign(state.csv[index], editedData)
  }
}

export default mutations