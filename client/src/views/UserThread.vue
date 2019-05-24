<template>
<v-container fluid>
    <v-layout id="main" row wrap >
      <v-flex xs9>
        <v-layout row wrap justify-space-between>
          <v-flex class="pb-2" xs12 md10>
            <h1 class="pl-3 display-1 font-weight-light">Your List of Threads</h1>
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
    </v-layout>
  </v-container>
</template>

<script>
import QuestionList from '@/components/QuestionList';

export default {
  name: 'UserThread',
  components: {
    QuestionList,
  },
  data() {
    return {
      searchKey: '',
    }
  },
  methods: {
    getSearch() {
      this.searchKey = this.key;
    },
  }
}
</script>

<style>

</style>
