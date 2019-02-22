import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home.vue";
import About from "@/components/about.vue";
import Dashboard from "@/components/dashboard.vue"
import New from "@/components/newCase.vue"
import Search from "@/components/searchCase.vue"
import Admin from "@/components/admin.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "/about",
      component: About
    },
    {
      path: "/new",
      name: "/new",
      component: New
    },
    {
      path: "/search",
      name: "/search",
      component: Search
    },
    {
      path: "/admin",
      name: "/admin",
      component: Admin
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: Dashboard
    }
  ]
});

// TO DO
// * Only allow logged in users to access the dashboard
// * Add routes to dashboard, newCase, searchCase and admin pages
