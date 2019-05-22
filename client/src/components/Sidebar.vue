<template>
  <v-navigation-drawer light permanent app clipped width="205">
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="item.action" v-show="showItem(item.title)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>
    <!-- <div v-for="i in 2"  style="background-color: black; height:30%; width: 150px; margin:2px auto; font-size: 30px; color:white; text-align: center; padding: 5px; border: 1px solid white;" :key="i"> AD SPACE</div> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  created() {},
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          action: () => {
            this.$router.push({ name: "home" });
          }
        },
        {
          title: "My Threads",
          icon: "question_answer",
          action: () => {
            this.$router.push({ name: "my-threads" });
          }
        },
        {
          title: "My Answer",
          icon: "comment",
          action: () => {
            this.$router.push({ name: "my-answers" });
          }
        }
      ]
    };
  },
  methods: {
    showItem(title) {
      if(title === 'Home') {
        return true;
      }
      return (this.authenticated && title !== 'Home');
    },
  },
  computed: {
    ...mapState([
      "authenticated",
    ]),
  },
};
</script>

<style>
</style>
