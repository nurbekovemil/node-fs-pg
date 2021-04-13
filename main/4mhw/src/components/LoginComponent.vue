<template>
  <div class="w-50 mx-auto mt-5">
    <b-form class="w-100">
      <b-form-group id="input-group-1" label="Email адрес" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Введите email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="password"
          placeholder="Введите пароль"
          required
        ></b-form-input>
      </b-form-group>

      <b-button variant="secondary" @click="onLogin">Войти</b-button>
    </b-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name:'Login',
  data:() => ({
        email: '',
        password: ''
      }),
    methods: {
      ...mapActions(['login']),
      onLogin() {
        this.login({
          email: this.email,
          password: this.password
        })
      }
    }
}
</script>