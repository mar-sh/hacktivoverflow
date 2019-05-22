<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card flat>
          <v-toolbar flat light class="primary">
            <v-toolbar-title class="justify-center">SIGN UP</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form flat @submit.prevent="register">
              <v-text-field
                v-model="username"
                prepend-icon="person"
                name="username"
                label="username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="email"
                prepend-icon="email"
                name="email"
                label="email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
              <v-btn type="submit" class=" black--text" flat outline block @click.prevent="register">Sign up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import backend from '@/api/backend';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations([
      'USER_SIGNIN',
    ]),
    register() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      backend({
        method: 'POST',
        url: '/register',
        data,
      })
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('user', data.userLogin.userId);
          localStorage.setItem('email', data.userLogin.email);
          localStorage.setItem('username', data.userLogin.username);
          this.USER_SIGNIN();
          this.$router.push({ name: 'home' });
          alertify.success('Welcome to HOF');
        })
        .catch(({ response }) => {
          if(response) {
            alertify.error(response.data.message);
          };
        });
    },
  },
};
</script>

<style>
</style>
