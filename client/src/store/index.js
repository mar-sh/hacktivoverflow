import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    questions: [],
    question: {},
    tags: [],
    watchedTags: [],
    search: [],
  },
  mutations,
  actions,
  getters,
})
