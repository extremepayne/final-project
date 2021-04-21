<template>
<div>
  <div v-if="user">
    <h2>Welcome, {{user.username}}</h2>
    <button @click.prevent="logout" class="logout button">Log Out</button>
  </div>
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
export default {
  name: "dashboard",
  components: {
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 1rem;
}
</style>
