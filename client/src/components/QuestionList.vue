<template>
  <v-list class="elevation-3" three-line>
    <template v-for="(question, index) in questionList">
      <v-list-tile :key="question._id">
        <v-layout row wrap>
          <v-flex xs12 md2>
            <v-layout row justify-space-between>
              <v-btn fab small flat light color="success" @click.prevent="questionUpvote(question._id, index)">
                <v-icon dark>thumb_up</v-icon>
              </v-btn>

              <span style="align-self:center;">{{ question.votes }}</span>

              <v-btn fab small flat light color="error" @click.prevent="questionDownvote(question._id, index)">
                <v-icon dark>thumb_down</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>

          <v-flex xs12 md8 pa-3>
            <v-list-tile-content>
              <v-list-tile-title class="v-list__tile--link" @click.prevent="goToThread(question._id, question.slug)">
                <div class="subheading text-truncate pr-5 blue--text">{{ question.title }}</div>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <div class=" body-2 pr-5">
                  <v-chip small label v-for="tag in question.tags" :key="tag">{{tag}}</v-chip>
                </div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>

          <v-flex xs12 md2>
            <v-list-tile-content>
              <v-list-tile-title>
                <div class="body-2">Posted by: {{ question.userId.username }}</div>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <div class="caption grey--text">{{ dateFormat(question.createdAt) }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider inset v-if="index < questions.length - 1" :key="`div1-${index}`"></v-divider>
      <v-divider inset v-if="index < questions.length - 1" :key="`div2-${index}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import moment from "moment";
import backend from '@/api/backend';

export default {
  name: "QuestionList",
  props: ['keyword'],
  data() {
    return {
      questionList: [],
    };
  },
  created() {
    if(this.$route.fullPath === "/") {
      this.fetchQuestions()
        .then(() => {
          this.questionList = [...this.questions];
        });
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestions',
      'fetchQuestionsByQuery',
    ]),
    ...mapMutations([
      'UPDATE_QUESTIONS',
    ]),
    goToThread(id, slug) {
      this.$router.push({ name: 'thread', params: { id, slug }});
    },
    dateFormat(date) {
      return moment(date).format("LLLL");
    },
    questionUpvote(id, index) {
      backend({
        method: 'PATCH',
        url: `actions/upvote/question/${id}`,
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
        .then(({ data }) => {
          this.questionList.forEach((question) => {
            if(question._id === data._id) {
              question = {...data};
            }
          })
          this.questionList[index].votes += 1;
          this.UPDATE_QUESTIONS(data);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    questionDownvote(id, index) {
      backend({
        method: 'PATCH',
        url: `actions/downvote/question/${id}`,
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
        .then(({ data }) => {
          this.questionList[index].votes -= 1;
          this.UPDATE_QUESTIONS(data);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    searchQuestion() {
      
    },
  },
  computed: {
    ...mapState([
      'questions',
      'search',
    ]),
  },
  watch: {
    keyword (value)  {
      console.log(value);
      this.fetchQuestionsByQuery(value)
        .then(() => {
          this.questionList = [...this.search];
        });
    },
  }
};
</script>

<style>
</style>