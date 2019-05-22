export default {
  USER_SIGNIN(state) {
    state.authenticated = true;
  },
  USER_SIGNOUT(state) {
    state.authenticated = false;
  },
  SET_QUESTIONS(state, payload) {
    state.questions = [...payload];
  },
  SET_QUESTION(state, payload) {
    state.question = {...payload};
  },
  UPDATE_QUESTIONS(state, payload) {
    state.questions.forEach((question) => {
      if(question._id === payload._id) {
        question = {...payload};
      }
    })
  },
  SET_SEARCH(state, payload) {
    state.search = [...payload];
  },
};
