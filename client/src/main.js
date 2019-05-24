import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import wysiwyg from 'vue-wysiwyg';

Vue.config.productionTip = false

Vue.use(wysiwyg, {
  image: {
    // uploadURL: "http://localhost:3000",
    uploadURL: "https://api-hof.demarsh.dev",
    dropzoneOptions: {}
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
