<template>
  <div class="about">
    <h1>Admin page</h1>
    <h2>Add a theme</h2>
    <div>
      <div class="form">
        <input v-model="themeName" placeholder="Name">
        <p></p>
        <input v-model="themeDescription" placeholder="Description">
        <p></p>
        <input v-model="color" placeholder="Hex of color">
        <p></p>
        <button @click="createTheme">Create</button>
      </div>
    </div>
    <h2>Edit/Delete a Theme</h2>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectTheme(s)">{{s.name}}
          </div>
        </div>
        <div class="upload" v-if="findTheme">
          <input v-model="findTheme.name">
          <p></p>
          <input v-model="findTheme.description">
          <p></p>
          <input v-model="findTheme.color">
        </div>
      </div>
      <div class="actions" v-if="findTheme">
        <button @click="deleteTheme(findTheme)">Delete</button>
        <button @click="editTheme(findTheme)">Edit</button>
      </div>
      <div v-if="findTheme">
        <h2>Add a creation to {{findTheme.name}}</h2>
        <div class="form">
          <input v-model="creationName" placeholder="Name">
          <p></p>
          <input v-model="creationDescription" placeholder="Description">
          <p></p>
          <input v-model="instagramLink" placeholder="Link to instagram page">
          <p></p>
          <input type="file" name="photo" @change="fileChanged">
          <p></p>
          <button @click="createCreation">Create</button>
        </div>
      </div>
      <h2>Edit/Delete a Creation</h2>
      <input v-model="findCreationName" placeholder="Search">
      <div class="suggestions" v-if="creationSuggestions.length > 0">
        <div class="suggestion" v-for="s in creationSuggestions" :key="s.id" @click="selectCreation(s)">{{s.name}}
        </div>
      </div>
      <div v-if="findCreation">
        <input v-model="findCreation.name">
        <p></p>
        <input v-model="findCreation.description">
        <p></p>
        <input v-model="findCreation.instagramLink">
      </div>
      <div class="actions" v-if="findCreation">
        <button @click="deleteCreation(findCreation)">Delete</button>
        <button @click="editCreation(findCreation)">Edit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  margin-right: auto;
  margin-left: auto;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      themeName: "",
      instagramLink: "",
      creationName: "",
      themeDescription: "",
      creationDescription: "",
      color: "",
      themes: [],
      creations: [],
      addTheme: null,
      findName: "",
      findTheme: null,
      findCreationName: "",
      findCreation: null,
      file: null,
    }
  },
  created() {
    this.getThemes();
    this.getCreations();
  },
  computed: {
    suggestions() {
      let themes = this.themes.filter(theme => theme.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return themes.sort((a, b) => a.name > b.name);
    },
    creationSuggestions() {
      let creations = this.creations.filter(creation => creation.name.toLowerCase().startsWith(this.findCreationName.toLowerCase()));
      return creations.sort((a, b) => a.name > b.name);
    }
  },
  methods: {
    async createTheme() {
      try {
        await axios.post('/api/themes', {
          name: this.themeName,
          description: this.themeDescription,
          color: this.color,
        });
      } catch (error) {
        console.log(error)
      }
    },
    async createCreation() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        await axios.post('/api/themes/' + this.findTheme._id + '/creations', {
          name: this.creationName,
          description: this.creationDescription,
          instagramLink: this.instagramLink,
          photos: [r1.data.path],
        });
        this.getCreations();
        this.creationName = "";
        this.creationDescription = "";
        this.instagramLink = "";
        this.file = null;
      } catch (error) {
        console.log(error)
      }
    },
    async getThemes() {
      try{
        let r1 = await axios.get("/api/themes/");
        this.themes = r1.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getCreations() {
      try{
        let r1 = await axios.get("/api/creations/");
        this.creations = r1.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectTheme(theme) {
      this.findName = "";
      this.findTheme = theme;
    },
    selectCreation(creation) {
      this.findCreationName = "";
      this.findCreation = creation;
    },
    async deleteTheme(theme) {
      try {
        await axios.delete("/api/themes/" + theme._id);
        this.findTheme = null;
        this.getThemes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCreation(creation) {
      try {
        await axios.delete("/api/themes/" + creation.theme + "/creations/" + creation._id);
        this.findCreation = null;
        this.getCreations();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async editTheme(theme) {
      try {
        await axios.put("/api/themes/" + theme._id, {
          name: this.findTheme.name,
          description: this.findTheme.description,
          color: this.findTheme.color,
        });
        this.findTheme = null;
        this.getThemes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editCreation(creation) {
      try {
        await axios.put("/api/themes/" + creation.theme + "/creations/" + creation._id, {
          name: this.findCreation.name,
          description: this.findCreation.description,
          instagramLink: this.findCreation.instagramLink,
        });
        this.findCreation = null;
        this.getCreations();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
