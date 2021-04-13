import axios from 'axios'
import router from '../../Routes'
export default {
  state:{
    isAuth: false,
    user:[],
    token: localStorage.getItem('token') || ''
    
  },
  mutations:{
    SET_USER(state, data){
      state.user = data
    },
    SET_IS_AUTH (state, data) {
      state.isAuth = data
    },
  },
  actions:{
    async register({commit},data) {
      await axios.post('/api/user/register', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        commit('SET_USER', res.data.user)
        commit('SET_IS_AUTH', true)
        localStorage.setItem('token', res.data.token)
        router.push('/user')
      })
      .catch(err => {
        commit('SET_IS_AUTH', false)
        router.push('/login')
      })
    },
    async login({commit, state}, data) {
      await axios.post('/api/user/login', data, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        commit('SET_USER', res.data.user)
        commit('SET_IS_AUTH', true)
        localStorage.setItem('token', res.data.token)
        router.push('/user')
      })
      .catch(err => {
        commit('SET_IS_AUTH', false)
        router.push('/login')
      })
    },
    async auth({commit, state}){
      if(!state.token) return
      await axios.get('/api/user/auth', {headers:{'Authorization':`Bearer ${state.token}`}})
       .then(res => {
          localStorage.setItem('token', res.data.token)
          commit('SET_USER', res.data.user)
          commit('SET_IS_AUTH', true)
          // commit('SET_IS_LOADING', false)
          router.push('/user')
       })
       .catch( err => {
         localStorage.removeItem('token')
         commit('SET_IS_AUTH', false)
        //  commit('SET_IS_LOADING', false)
         
         router.push('/login')
       })
    },
    logout({commit}){
      localStorage.removeItem('token')
      commit('SET_IS_AUTH', false)
      commit('SET_USER', [])
      router.push('/login')
    }
  },
  getters:{                   
    getIsAuth(state){
      return state.isAuth
    },
    getUser(state) {
      return state.user
    },
  }
}