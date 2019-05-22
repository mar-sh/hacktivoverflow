import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

// component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/SignIn.vue'),
    },
    {
      path: '/new',
      name: 'new-question',
      component: () => import(/* webpackChunkName: "about" */ './views/NewQuestion.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit-question',
      component: () => import(/* webpackChunkName: "about" */ './views/EditQuestion.vue'),
    },
    {
      path: '/my-threads',
      name: 'my-threads',
      component: () => import(/* webpackChunkName: "about" */ './views/UserThread.vue'),
    },
    {
      path: '/my-answers',
      name: 'my-answers',
      component: () => import(/* webpackChunkName: "about" */ './views/UserAnswer.vue'),
    },
    {
      path: '/thread/:id/:slug',
      name: 'thread',
      component: () => import(/* webpackChunkName: "about" */ './views/Thread.vue'),
    },
  ],
});

export default router;

