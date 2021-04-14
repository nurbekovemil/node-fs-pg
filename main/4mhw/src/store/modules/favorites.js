import axios from 'axios'
export default {
  state: {
    favorites: [],
    token: localStorage.getItem('token') || ''
  },
  mutations:{
    SET_FAVORITES(state, data){
      state.favorites = data
    }
  },
  actions:{
    async GET_ALL_FAVORITES({commit, state}){
      await axios.get('/api/favorites/', {headers:{'Authorization':`Bearer ${state.token}`}})
        .then(res => {
          commit('SET_FAVORITES', res.data.products)          
        })
        .catch(err => {

        })
    },
    async ADD_FAVORITES({commit, state}, data){
      await axios.post('/api/favorites/', data, {headers:{'Authorization':`Bearer ${state.token}`}})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {

        })
    },
    async REMOVE_FAVORITE({commit, dispatch, state}, data){
      await axios.delete(`/api/favorites/${data}`, {headers:{'Authorization':`Bearer ${state.token}`}})
      .then(res => {
        dispatch('GET_ALL_FAVORITES')
      })
      .catch(err => {

      })
    }
  },
  getters: {
    getFavorites(state){
      return state.favorites
    }
  }
}