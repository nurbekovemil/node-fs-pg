<template>
    <b-navbar type="dark" variant="dark" container class="mb-3">
      <b-navbar-brand href="#">4mhw</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/" :class="{active: $route.path === '/'}">Главная</b-nav-item>
        <b-nav-item-dropdown to="/" text="Категории">
          <b-dropdown-item 
            v-for="(c, i) in getCategories" 
            :key="i"
            @click="getById(c.category_id)"
            >
            {{c.category_name}} - {{c.products_quantity}}
          </b-dropdown-item>
          <b-dropdown-item @click="getById('')">Все</b-dropdown-item>
        
          
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="getIsAuth">
        <b-nav-item to="/user" :class="{active: $route.path == '/user'}"><b-icon-person-fill/>{{getUser.user_name}}</b-nav-item>
        <b-nav-item @click="onLogout"><b-icon-power/>Выйти</b-nav-item>
      </b-navbar-nav>
        
      <b-navbar-nav class="ml-auto" v-else>
        <template v-for="(menu, index) in publicMenus">
          <template>
            <b-nav-item :key="index" :to="menu.route" :class="{active: $route.path === menu.route}"><b-icon :icon="menu.icon"/>{{menu.title}}</b-nav-item>
          </template>
        </template>        
      </b-navbar-nav>
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { BIconPersonFill, BIconPower} from 'bootstrap-vue'

export default {
  name:'Navbar',
  components:{
    BIconPersonFill,
    BIconPower
  },
  data:()=>({
    publicMenus:[
      {title:'Войти', route: '/login', icon:'person-fill'},
      {title:'Регистрация', route: '/register', icon:'person-plus-fill'},
    ]
  }),
  computed: mapGetters(['getIsAuth', 'getUser', 'getCategories']),
  methods: {
    ...mapActions(['logout', 'GET_ALL_CATEGORIES','GET_ALL_PRODUCTS']),
    onLogout(){
      this.logout()
    },
    getById(id){
      console.log(id)
      this.GET_ALL_PRODUCTS(id)
    }

  },
  async mounted() {
    await this.GET_ALL_CATEGORIES()
  },
}
</script>
