import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Stormlight from "../views/Stormlight.vue";
import StarWars from "../views/StarWars.vue";
import Other from "../views/Other.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/stormlight",
    name: "Stormlight",
    component: Stormlight,
  },
  {
    path: "/starwars",
    name: "Star Wars",
    component: StarWars,
  },
  {
    path: "/other",
    name: "Other",
    component: Other,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
