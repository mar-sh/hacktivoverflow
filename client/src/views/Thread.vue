<template>
  <v-container fluid>
    <v-layout id="main" row wrap>
      <v-flex xs12>
        <v-layout row wrap justify-space-between>
          <v-flex class="pb-2" xs12 md10>
            <h1 class="pl-3 display-1 font-weight-light">{{ question.title }}</h1>
          </v-flex>
          <v-flex class="pl-3 pb-2" xs6 md2 :align-self-center="true">
            <v-btn small flat outline to="/new">Ask Question</v-btn>
          </v-flex>
        </v-layout>
        <v-divider class="pr-3"></v-divider>

        <v-container fluid fill-height>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 md8 lg6>
              <!-- content -->
              <ContentCard :content="question" :model="'question'"></ContentCard>
              <span class="title font-weight-medium">{{ answers.length }} Answers</span>
              <v-divider inset class="py-2"></v-divider>
              <ContentCard
                v-for="answer in answers"
                :key="answer._id"
                :content="answer"
                :model="'answer'"
                @edit-content="showEdit"
              ></ContentCard>
              <wysiwyg id="editor" v-model="body"></wysiwyg>
              <v-divider v-for="(i, index) in 5" :key="index" class="pa-1"></v-divider>
              <v-btn v-if="!edit" flat outline large @click.prevent="postAnswer">Post Answer</v-btn>
              <v-btn v-else flat outline large @click.prevent="editAnswer()">Edit Answer</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import backend from "@/api/backend";
import ContentCard from "@/components/ContentCard";

export default {
  name: "Thread",
  components: {
    ContentCard
  },
  data() {
    return {
      answers: [],
      body: "",
      edit: false,
      editId: ""
    };
  },
  created() {
    this.fetchQuestion(this.$route.params.id).then(() => {
      this.answers = [...this.question.answers];
    });
  },
  methods: {
    ...mapActions(["fetchQuestion"]),
    postAnswer() {
      backend({
        method: "POST",
        url: `/answers`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          threadId: this.$route.params.id,
          body: this.body
        }
      })
        .then(({ data }) => {
          this.answers.push(data);
          this.body = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    showEdit(content) {
      location.href = "#editor";
      this.body = content.body;
      this.edit = true;
      this.editId = content._id;
    },
    editAnswer() {
      backend({
        method: "PUT",
        url: `/answers/${this.editId}`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          body: this.body,
          threadId: this.$route.params.id
        }
      })
        .then(({ data }) => {
          this.answers.forEach(answer => {
            if (answer._id === data._id) {
              answer = { ...data };
              this.body = "";
            }
          });
          return this.fetchQuestion(this.$route.params.id);
        })
        .then(() => {
          this.answers = [...this.question.answers];
          location.href="#main"
          this.edit = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState(["question"]),
    editButton() {
      return this.edit;
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
