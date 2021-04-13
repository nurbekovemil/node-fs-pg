import axios from 'axios'
export default {
  state: {
    products: [],
    
  },
  mutations: {
    SET_ALL_PRODUCT(state, data) {
      state.products = data
    },
  },
  actions: {
    async GET_ALL_PRODUCTS ({commit}, c_id){
      const id = c_id || ''
      await axios.get(`/api/product/${id}`)
      .then(res => {
        commit('SET_ALL_PRODUCT', res.data.products)
        commit('SET_IS_LOADING', false)
      })
      .catch(err => {
        commit('SET_IS_LOADING', false)
      })
    }
  },
  getters: {
    getProducts(state) {
      return state.products
    }
  },
}