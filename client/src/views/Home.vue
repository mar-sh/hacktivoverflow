<template>
  <v-container fluid>

    <v-layout id="main" row wrap>
      <v-flex xs9>
        <v-layout row wrap justify-space-between>
          <v-flex class="pb-2" xs12 md10>
            <h1 class="pl-3 display-1 font-weight-light">Questions</h1>
          </v-flex>
          <v-flex class="pl-3 pb-2" xs6 md2 :align-self-center="true">
            <v-btn small flat outline to="/new">Ask Question</v-btn>
          </v-flex>
        </v-layout>
        <v-divider class="pr-3"></v-divider>

        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 md8 :align-self-center="true">
              <v-form @submit.prevent="getSearch">
                <v-text-field
                  clearable
                  @input="clearSearch"
                  v-model="key"
                  full-width
                  append-outer-icon="search"
                  @click:append-outer="clearSearch"
                  box
                  label="Search for questions by title..."
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex xs12>
              <!-- question -->
              <QuestionList :keyword="searchKey"></QuestionList>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex  v-show="authenticated" xs3 px-4 align-self-start>
        <!-- watched tag -->
        <WatchedTags @search-tag="searchByWatchTag"></WatchedTags>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import QuestionList from "@/components/QuestionList";
import WatchedTags from "@/components/WatchedTags";

export default {
  name: "Home",
  components: {
    QuestionList,
    WatchedTags,
  },
  created() {
    this.isLoading = true;
    this.fetchQuestions()
      .then(() => this.isLoading = false)
  },
  data() {
    return {
      key: '',
      searchKey: '',
    };
  },
  methods: {
    ...mapActions([
      'fetchQuestions',
    ]),
    getSearch() {
      this.searchKey = this.key;
    },
    searchByWatchTag(keyword) {
      this.searchKey = keyword;
    },
    clearSearch() {
      this.searchKey = '';
    },
  },
  computed: {
    ...mapState([
      'authenticated',
      'questions',
    ]),
  },
};
</script>

<style>
</style>
