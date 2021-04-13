import Vue from 'vue'
import VueRouter from 'vue-router'
import {HomePage, LoginPage, RegisterPage, UserPage} from './pages'
import store from './store'

Vue.use(VueRouter)

  const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/user', component: UserPage, meta: {requiresAuth: true}}
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth) && (!store.getters.getIsAuth)){
    next('/login')
    return
  }
  if(to.path === '/login' && store.getters.getIsAuth){
    next('/user')
    return
  }
  if(to.path === '/register' && store.getters.getIsAuth){
    next('/user')
    return
  }
  next()
})

export default router

