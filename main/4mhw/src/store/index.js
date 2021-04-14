import Vue from 'vue'
import Vuex from 'vuex'
import {products, auth, categories, favorites} from './modules'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    isLoading: true,

  },
  mutations:{
    SET_IS_LOADING(state, data){
      state.isLoading = data
    }
  },
  getters:{
    getIsLoading(state){
      return state.isLoading
    }
  },
  modules:{
    products,
    auth,
    categories,
    favorites
  }
})