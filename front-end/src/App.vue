<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <router-link class="navbar-brand" to="/">extremepayne</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </nav>
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
body {
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
}
@media only screen and (min-width: 1200px){
  .navbar {
    max-width: 1140px;
  }
}
</style>
