import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home.vue";
import About from "@/components/about.vue";
import Dashboard from "@/components/dashboard.vue"
import New from "@/components/newCase.vue"
import Search from "@/components/searchCase.vue"
import Reports from "@/components/reports.vue"
import Admin from "@/components/admin.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "/",
      component: Home,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/about",
      name: "/about",
      component: About,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/new",
      name: "/new",
      component: New,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/search",
      name: "/search",
      component: Search,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/admin",
      name: "/admin",
      component: Admin,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: Dashboard,
      meta: {layout: "defaultLayout"}
    },
    {
      path: "/reports",
      name: "/reports",
      component: Reports,
      meta: {layout: "defaultLayout"}
    }
  ]
});


// TO DO
// * Only allow logged in users to access the dashboard
// * Only allow admin to access the admin page.
