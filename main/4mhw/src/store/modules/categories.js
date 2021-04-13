import axios from "axios"

export default {
  state: {
    categories: []
  },
  mutations:{
    SET_CATEGORIES(state, data){
      state.categories = data
    }
  },
  actions:{
    async GET_ALL_CATEGORIES({commit}){
      await axios.get('/api/category/')
        .then( res => {
          commit('SET_CATEGORIES', res.data.categories)
        })
        .catch( err => {
          console.log(err)
        })
    }
  },
  getters:{
    getCategories(state){
      return state.categories
    }
  }
}