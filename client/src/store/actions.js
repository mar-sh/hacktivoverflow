import backend from '@/api/backend';

export default {
  fetchQuestions(context) {
    return backend({
      method: 'GET',
      url: '/questions',
    })
      .then(({ data }) => {
        context.commit('SET_QUESTIONS', data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchUserQuestions(context) {
    return backend({
      method: 'GET',
      url: '/questions/users',
      headers: { Authorization: localStorage.getItem('accessToken') }
    })
      .then(({ data }) => {
        context.commit('SET_USER_QUESTIONS', data);
      })
      .catch((error) => {
        console.log(error);
      })
  },
  fetchQuestion(context, questionId) {
    return backend({
      method: 'GET',
      url: `/questions/${questionId}`,
    })
      .then(({ data }) => {
        context.commit('SET_QUESTION', data);
      })
      .catch((error) => {
        console.log(error);
      })
  },
  fetchQuestionsByQuery(context, query) {
    return backend({
      method: 'GET',
      url: `/questions/?title=${query}&tags=${query}`,
    })
      .then(({ data }) => {
        console.log(data, 'query');
        context.commit('SET_SEARCH', data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  fetchTags(context) {
    backend({
      method: 'GET',
      url: 'actions/tags',
    })
      .then(({ data }) => {
        context.commit('SET_TAGS', data);
      })
      .catch((error) => {
        console.log(error);
      })
  },
  
};
