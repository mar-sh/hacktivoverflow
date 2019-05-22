<template>
  <v-toolbar dense light clipped-left app flat class="primary">
    <v-toolbar-title class="v-list__tile--link" @click.prevent="goHome" >HOF</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-show="!authenticated" flat @click.prevent="goSignUp">Sign Up</v-btn>
      <v-btn v-show="!authenticated" flat @click.prevent="goSignIn">Sign In</v-btn>
      <v-btn v-show="authenticated" @click.prevent="userSignOut" flat>Sign Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    ...mapMutations([
      'USER_SIGNOUT',
    ]),
    goSignUp() {
      this.$router.push({ name: 'signup' });
    },
    goSignIn() {
      this.$router.push({ name: 'signin' });
    },
    goHome() {
      this.$router.push({ name: 'home' });
    },
    userSignOut() {
      localStorage.clear();
      alertify.success('Bye, see you soon!');
      this.USER_SIGNOUT();
      this.$router.push({ name: 'signin' });
    }
  },
  computed: {
    ...mapState([
      'authenticated',
    ]),
  },
};
</script>

<style>
</style>
