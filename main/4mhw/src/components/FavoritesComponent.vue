<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center mb-3">
      <b-col md="8" sm="12">
        <b-card :title="getUser.user_name">
          <b-card-text>
            {{getUser.user_email}}
          </b-card-text>
            <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Добавить товар</b-button>
              <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title>
                  Добавить товар
                </template>
                <b-form-select
                  v-model="category_id"
                  :options="getCategories"
                  class="mb-3"
                  value-field="category_id"
                  text-field="category_name"
                  disabled-field="notEnabled"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Выберите категорию --</b-form-select-option>
                  </template>
                </b-form-select>
                <template>
                  <b-form-input v-model="product_name" placeholder="Название товара"></b-form-input>
                  
                </template>
                <b-button class="mt-3 mr-3" variant="light" @click="$bvModal.hide('bv-modal-example')">Закрыть</b-button>
                <b-button class="mt-3" variant="success" @click="onAddProduct">Добавить</b-button>
              </b-modal>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center">
      <b-col md="8" sm="12">
        <h5>Избранные</h5>
        <b-list-group>
          <b-list-group-item
            v-for="(f, i) in getFavorites" :key="i"
            class="d-flex justify-content-between align-items-center">
            {{f.product_name}}
            <b-button size="sm" variant="light">
              <b-icon-trash-fill aria-hidden="true" @click="onRemove(f.product_id)"/>
            </b-button>
          </b-list-group-item>
          <b-list-group-item v-if="getFavorites.length == 0">
            Вы еще не добавили товар в избранное! <router-link to="/">добавить</router-link>
          </b-list-group-item>
          
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { BIconTrashFill } from 'bootstrap-vue'
export default {
  data: () => ({
    product_name: '',
    category_id: null,
  }),
  components:{
    BIconTrashFill
  },
  computed: {
    ...mapGetters(['getUser', 'getFavorites', 'getCategories'])
  },
  methods: {
    ...mapActions(['GET_ALL_FAVORITES', 'REMOVE_FAVORITE', 'ADD_PRODUCTS']),
    onRemove(id){
        this.REMOVE_FAVORITE(id)
    },
    onAddProduct(){
      this.ADD_PRODUCTS({product_name: this.product_name, category_id: this.category_id})
    }
  },
  async mounted() {
    await this.GET_ALL_FAVORITES()
  },
}
</script>
<style lang="">
  
</style>