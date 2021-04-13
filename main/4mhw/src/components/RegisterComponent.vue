<template>
  <div class="w-50 mx-auto mt-5">
    <b-form class="w-100">
      <b-form-group id="input-group-1" label="Ваше имя" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="username"
          type="text"
          placeholder="Введите ваше имя"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email адрес" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="email"
          type="email"
          placeholder="Введите email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Пароль" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="password"
          placeholder="Введите пароль"
        ></b-form-input>
      </b-form-group>

      <b-button variant="secondary" @click="onRegister">Регистрация</b-button>
    </b-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name:'RegisterComponent',
  data:() => ({
        username: '',
        email: '',
        password: ''
      }),
    methods: {
      ...mapActions(['register']),
      async onRegister() {
        await this.register({
          username:this.username,
          email:this.email,
          password:this.password

          })
      }
    }
}
</script>