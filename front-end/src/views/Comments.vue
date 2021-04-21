<template>
<div>
  <h1>Comments</h1>
  <div v-if="user">
    <p class="callToAction">Share your thoughts!</p>
    <textarea class="commentBox" v-model="comment" placeholder="Comment your thoughts..." />
    <button class="commentButton" @click="submitComment">Submit</button>
    <p class="error" v-if="error">Error: {{error}}</p>
  </div>
  <div v-else>
    <p>Log in to post comments!</p>
  </div>
  <br /><br />
  <div v-for="comment in comments" :key="comment._id">
    <div class="commentContainer">
      <p class="commentText">{{comment.comment}}</p>
      <pre> </pre>
      <p class="commentAuthor">&mdash;{{comment.user.username}},</p>
      <pre> </pre>
      <p class="commentDate">{{formatDate(comment.created)}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Comments",
  data() {
    return {
      comment: "",
      comments: [],
      error: "",
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getComments();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 14)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async submitComment() {
      try {
        await axios.post("/api/comments", {
          comment: this.comment
        });
        this.comment = "";
        this.getComments();
      } catch (error) {
        this.error = error.repsonse.data.message;
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments");
        this.comments = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>

<style scoped>
p.callToAction {
  text-align: left;
  margin-top: 2rem;
}
textarea.commentBox {
  width: 100%;
  height: 5rem;
}
button.commentButton {
  float: right;
  margin: 0.25rem;
  border-radius: 5px;
  border: 0;
  padding: 0.25rem 0.5rem;
  color: #eee;
  background-color: #3498db;
}
button:hover {
  background-color: #2980b9;
}
p.commentText {
  text-align: left;
}
p.commentAuthor, p.commentDate {
  text-align: left;
  float: left;
  color: #777;
}
div.commentContainer {
  display: flex;
}
</style>
