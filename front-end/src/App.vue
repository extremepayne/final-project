<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">
          <img class="navbar-icon-image" width="30" height= "30" src="/other-images/Szeth-portrait.jpg"/>extremepayne</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-bind:class="{ active: this.$router.history.current.path == '/'}">
              <router-link class="nav-link" to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item v-bind:class="{ active: this.$router.history.current.path == '/stormlight'}">
              <router-link class="nav-link" to="/stormlight">Stormlight</router-link>
            </b-nav-item>
            <b-nav-item v-bind:class="{ active: this.$router.history.current.path == '/starwars'}">
              <router-link class="nav-link" to="/starwars">Star Wars</router-link>
            </b-nav-item>
            <b-nav-item v-bind:class="{ active: this.$router.history.current.path == '/other'}">
              <router-link class="nav-link" to="/other">Other</router-link>
            </b-nav-item>
            <b-nav-item v-bind:class="{ active: this.$router.history.current.path == '/admin'}">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main role="main" class="container">
      <router-view />
    </main>
    <footer class="footer">
      <div class="container">
        <a target="_blank" href="https://github.com/extremepayne/lego-photo-website">Code for this website</a>
      </div>
    </footer>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav.bg-primary, header {
  background-color: #34495e !important;
}

nav {
  margin-right: auto;
  margin-left: auto;
}

.navbar-icon-image {
  border-radius: 7px;
  margin: 0 .5rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
main {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}

@media only screen and (min-width: 768px){
  .navbar {
    max-width: 720px;
  }
}
@media only screen and (min-width: 992px){
  .navbar {
    max-width: 960px;
  }
  .navbar-brand {
    padding: .5rem 1rem;
  }
  .nav-link {
    padding: .75rem 1rem;
  }
  .nav-item {
    padding: 0;
  }
  .navbar {
    padding: 0 !important;
    margin-left: auto;
    margin-right: auto;
  }
  .nav-link:hover {
    background-color: #2c3e50 !important;
  }
}
@media only screen and (min-width: 1200px){
  .navbar {
    max-width: 1140px;
  }
}
</style>
