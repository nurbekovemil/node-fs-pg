<template>
  <b-row align-v="stretch">
    <loading v-if="getIsLoading"/>
    <b-col cols="12" md="4" v-for="(p, index) in getProducts" :key="index" class="mb-3" v-else>
      <b-card align-self="stretch" :style="{height:'10rem'}">
        <b-card-title v-if="p.product_name.length > 20">
         {{p.product_name.slice(0, 20)}}...
        </b-card-title>
        <b-card-title v-else>
          {{p.product_name}}
        </b-card-title>
        <b-card-text>
          category id: {{p.category_id}}
        </b-card-text>
        <template v-if="getIsAuth">
          <b-button class="mr-3" variant="primary" align-self="end" @click="addInFavorites(p.product_id)">В избранное</b-button>
          <b-button variant="danger" align-self="end" @click="removeProduct(p.product_id)">Удалить</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Loading from './Loading'
export default {
  name:'products-component',
  components:{
    Loading
  },
  computed: mapGetters(['getProducts', 'getIsLoading','getIsAuth']),
  methods: {
    ...mapActions(['GET_ALL_PRODUCTS', 'ADD_FAVORITES', 'REMOVE_PRODUCT']),
    addInFavorites(id){
      this.ADD_FAVORITES({product_id:id})
    },
    removeProduct(id){
      this.REMOVE_PRODUCT(id)
    }
  },
  async mounted(){
    await this.GET_ALL_PRODUCTS()
  }
}
</script>
<style lang="">
  
</style>