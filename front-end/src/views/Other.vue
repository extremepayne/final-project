<template>
  <div class="other">
     <h1 v-bind:style="{ color: headingColor }">Other</h1>
     <p>{{ description }}</p>
     <div v-for="creation in creations" :key="creation._id">
       <CreationDisplay :creation="creation" />
     </div>
  </div>
</template>

<script>
import axios from 'axios';
import CreationDisplay from "@/components/CreationDisplay.vue";

export default {
  name: "Other",
  components: {
    CreationDisplay,
  },
  data() {
    return{
      creations: [],
      name: "Other",
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
