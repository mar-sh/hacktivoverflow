<template>
  <v-card class="elevation-3">
    <v-card-title primary-title style="margin-bottom: 0; padding-bottom:0;">
      <div style="display: flex; flex-direction: column wrap; align-content: space-between;">
        <h3 class="headline mb-0">
          Watched tags
          <i :class="icon" @click.prevent="searchByTag('')"></i>
        </h3>
      </div>
    </v-card-title>
    <v-card-text style="padding-top:5px;">
      <hr>
      <div>
        <v-chip
          label
          small
          close
          @input="removeTag(tag)"
          @click.prevent="searchByTag(tag)"
          v-for="tag in userTags"
          :key="tag"
        >{{ tag }}</v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-text-field label="Watch a tag" v-model="tag" @keyup.enter="addTag"></v-text-field>
    </v-card-actions>
    <v-btn flat outline @click.prevent="addTag">Add tag</v-btn>
  </v-card>
</template>

<script>
import backend from "@/api/backend";

export default {
  name: "WatchedTags",
  data() {
    return {
      tag: "",
      search: "",
      userTags: [],
      icon: "fas fa-eye v-list__tile--link"
    };
  },
  created() {
    this.getUserTags();
  },
  methods: {
    //   test() {
    //   console.log('chip')
    // },
    getUserTags() {
      backend({
        method: "GET",
        url: "actions/user/tags",
        headers: { Authorization: localStorage.getItem("accessToken") }
      })
        .then(({ data }) => {
          console.log(data);
          this.userTags = [...data];
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    addTag() {
      backend({
        method: "POST",
        url: `actions/add/tags`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          tag: this.tag
        }
      })
        .then(({ data }) => {
          this.userTags.push(this.tag);
          this.tag = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeTag(tag) {
      backend({
        method: "DELETE",
        url: `actions/remove/tags`,
        headers: { Authorization: localStorage.getItem("accessToken") },
        data: {
          tag
        }
      })
        .then(({ data }) => {
          this.userTags = this.userTags.filter(ownTag => ownTag !== tag);
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchByTag(tag) {
      this.$emit("search-tag", tag);
      this.icon = 'far fa-eye v-list__tile--link' 
      if (tag == "") {
        if (this.icon == "fas fa-eye v-list__tile--link") {
          this.icon = "far fa-eye v-list__tile--link";
        } else {
          this.icon = "fas fa-eye v-list__tile--link";
        }
      }
    }
  }
};
</script>

<style>
</style>
