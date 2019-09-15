import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import RepositoryDetails from "./views/RepositoryDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/:id",
      name: "repository-details",
      component: RepositoryDetails
    }
  ]
});
