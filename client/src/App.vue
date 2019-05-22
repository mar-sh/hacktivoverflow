<template>
  <v-app>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  created() {
    if (localStorage.getItem('accessToken')) {
      this.USER_SIGNIN();
    } else {
      this.USER_SIGNOUT();
    };
  },
  data () {
    return {
      ...mapMutations([
        'USER_SIGNIN',
        'USER_SIGNOUT'
      ]),
    }
  },
  computed: {
    ...mapState([
      'authenticated',
    ]),
  }
};

</script>

<style>
</style>
