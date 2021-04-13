<template>
  <div>
    <NavbarComponent/>
    <b-container>
      <router-view/>
    </b-container>
    <!-- tftyfyftfftyfyfyftyf -->
  </div>
</template>

<script>
import {NavbarComponent} from './components';
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    NavbarComponent,
  },
  computed: {
    ...mapGetters(['getIsLoading']),
  },
  methods: {
    ...mapActions(['auth'])
  },
  async mounted() {
    await this.auth()
  },
};
</script>
