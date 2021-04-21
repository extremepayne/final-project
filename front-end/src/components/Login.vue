<template>
<div>
  <div>
    <form>
      <legend>Register for an account</legend>
      <fieldset>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" @click.prevent="register">Register</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form>
      <fieldset>
        <legend>Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" @click.prevent="login">Log in</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      usernameLogin: "",
      passwordLogin: "",
      errorLogin: "",
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.error {
  background-color: #e01923;
  color: #fff;
}
button {
  margin: .5rem;
}
</style>
