<template>
  <div class="stormlight">
     <h1 v-bind:style="{ color: headingColor }">Stormlight</h1>
     <p>{{ description }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Stormlight",
  data() {
    return{
      creations: [],
      name: "Stormlight",
      headingColor: "",
      description: "",
    }
  },
  created() {
    this.getCreations();
  },
  methods: {
    async getCreations() {
      try{
        let r1 = await axios.get("/api/themes/");
        let projects = r1.data;
        let currProject = projects.find(obj => { return obj.name === this.name });
        this.headingColor = currProject.color;
        this.description = currProject.description;
        let r2 = await axios.get("/api/themes/" + currProject._id + "/creations");
        this.creations = r2.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight:bold;
}
</style>
