import axios from 'axios'
export default {
  state: {
    products: [],
    token:localStorage.getItem('token') || ''
    
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
    },
    async ADD_PRODUCTS({commit, state}, data){
      await axios.post('/api/product/', data, {headers:{'Authorization':`Bearer ${state.token}`}})
      .then( res => {
        console.log(res.data)
      })
      .catch(err => {

      })
    },
    async REMOVE_PRODUCT({commit, dispatch, state}, data){
      await axios.delete(`/api/product/${data}`, {headers:{'Authorization':`Bearer ${state.token}`}})
      .then( res => {
        dispatch('GET_ALL_PRODUCTS')
      })
      .catch( err => {

      })
    }
  },
  getters: {
    getProducts(state) {
      return state.products
    }
  },
}