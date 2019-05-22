<template>
  <v-container fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6>
        <h1 class="text-xs-center headline text-uppercase">Ask a question</h1>
        <v-form @submit.prevent="submitQuestion">
          <v-text-field label="Title" v-model="title"></v-text-field>

          <v-combobox
            multiple
            v-model="tags"
            label="Tags"
            append-icon
            chips
            small-chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          ></v-combobox>

          <wysiwyg v-model="body"></wysiwyg>
          <div class="d-flex justify-space-between">
            <!-- <v-btn id="preview-question" type="submit" flat outline>Preview Question</v-btn> -->
            <v-btn id="submit-question" type="submit" flat outline @click.prevent="submitQuestion">Submit Question</v-btn>
          </div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import backend from "@/api/backend";

export default {
  name: "NewQuestion",
  components: {},
  data() {
    return {
      title: "",
      tags: [],
      items: [],
      search: "",
      body: ""
    };
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        if (this.search) {
          this.tags.push(...this.search.split(","));
        }
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    submitQuestion() {
      const question = {
        title: this.title,
        tags: this.tags,
        body: this.body
      };

      alertify.confirm(
        "Submit Question",
        "Submit this question ?",
        () => {
          backend({
            method: 'POST',
            url: "/questions",
            headers: { Authorization: localStorage.getItem("accessToken") },
            data: question,
          })
            .then(({ data }) => {
              console.log(data);
              console.log('hue')
              this.$router.push({ name: "home" });
              alertify.success("Posted!");
            })
            .catch(({ response }) => {
              console.log(response.data.message);
            });
        },
        () => {
          alertify.message("Cancelled");
        }
      );
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

#preview-question {
  margin-left: 0 !important;
}

#submit-question {
  margin-right: 0 !important;
}
</style>
