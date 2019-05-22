<template>
  <v-card class="elevation-3">
    <v-container fluid my-2>
      <v-layout row wrap justify-space-between>
        <v-flex xs4 md2 align-self-start pt-2>
          <v-layout column wrap align-content-space-around>
            <v-btn icon depressed :ripple="false" small flat @click.prevent="upvote(content._id)">
              <v-icon large>arrow_drop_up</v-icon>
            </v-btn>
            <span style="align-self: center;" class="subheading pt-2">{{ content.votes }}</span>
            <v-btn icon depressed :ripple="false" small flat @click.prevent="downvote(content._id)">
              <v-icon large>arrow_drop_down</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs8 md10>
          <v-card-text>
            <template>
              <div v-html="content.body"></div>
            </template>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-show="editButton"
              :disabled="editable"
              flat
              color="warning"
              @click.prevent="editContent(content._id)"
            >Edit</v-btn>
            <v-btn
              v-show="deleteButton"
              :disabled="editable"
              flat
              color="error"
              @click.prevent="deleteContent(content._id)"
            >Delete</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import moment from "moment";
import backend from "@/api/backend";

export default {
  name: "ContentCard",
  props: {
    content: {
      type: Object
    },
    model: {
      type: String
    }
  },
  methods: {
    upvote(id) {
      backend({
        method: "PATCH",
        url: `actions/upvote/${this.model}/${id}`,
        headers: { Authorization: localStorage.getItem("accessToken") }
      })
        .then(({ data }) => {
          this.content.votes = data.votes;
        })
        .catch(error => {
          console.log(error);
        });
    },
    downvote(id) {
      backend({
        method: "PATCH",
        url: `actions/downvote/${this.model}/${id}`,
        headers: { Authorization: localStorage.getItem("accessToken") }
      })
        .then(({ data }) => {
          this.content.votes = data.votes;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editContent(id) {
      if (this.model == "answer") {
        this.$emit("edit-content", this.content);
      } else {
        this.$router.push({ name: "edit-question", params: { id } });
      }
    },
    deleteContent(id) {
      alertify.confirm("Delete Question ?",
        "You sure you want to delete this question ? You won't be able to revert this",
        () => {
        backend({
          method: "PATCH",
          url: `questions/${id}`,
          headers: { Authorization: localStorage.getItem("accessToken") }
        })
          .then(({ data }) => {
             alertify.success("Removed");
            this.$router.push({ name: "home" });
          })
          .catch(error => {
            console.log(error);
          });
         
        },
        () => {
          alertify.message("Cancelled");
        }
      );

      
    }
  },
  computed: {
    deleteButton() {
      return (
        this.model === "question" &&
        this.content.userId._id == localStorage.getItem("user")
      );
    },
    editButton() {
      return this.content.userId._id == localStorage.getItem("user");
    },
    editable() {
      if (this.model == "answer") {
        return false;
      }
      return !this.content.editable;
    }
  }
};
</script>

<style>
</style>
