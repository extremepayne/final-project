<template>
  <div class="about">
    <h1>Admin page</h1>
    <h2>Add a theme</h2>
    <div>
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <input v-model="description" placeholder="Description">
        <p></p>
        <input v-model="color" placeholder="Hex of color">
        <p></p>
        <button @click="createTheme">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      name: "",
      description: "",
      color: "",
    }
  },
  methods: {
    async createTheme() {
      try {
        await axios.post('api/items', {
          name: this.name,
          description: this.description,
          color: this.color,
        });
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
