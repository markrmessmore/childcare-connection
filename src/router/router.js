import  Vue       from "vue"
import  Router    from "vue-router"
import  AuthGuard from './authguard.js'
import  AdminGuard from './adminguard.js'
// COMPONENTS
const   Home      = () => import("@/components/home.vue")
const   About     = () => import("@/components/about.vue")
const   Dashboard = () => import("@/components/dashboard.vue")
const   New       = () => import("@/components/newCase.vue")
const   Search    = () => import("@/components/searchCase.vue")
const   Reports   = () => import("@/components/reports.vue")
const   Admin     = () => import("@/components/admin.vue")
const   Providers = () => import("@/components/providers.vue")
const   accountDeactivated = () => import("@/components/accountDeactivated.vue")

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
      meta: {layout: "defaultLayout"},
      beforeEnter: AuthGuard
    },
    {
      path: "/search",
      name: "/search",
      component: Search,
      meta: {layout: "defaultLayout"},
      beforeEnter: AuthGuard
    },
    {
      path: "/admin",
      name: "/admin",
      component: Admin,
      meta: {layout: "defaultLayout"},
      beforeEnter: AdminGuard
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: Dashboard,
      meta: {layout: "defaultLayout"},
      beforeEnter: AuthGuard
    },
    {
      path: "/providers",
      name: "/providers",
      component: Providers,
      meta: {layout: "defaultLayout"},
      beforeEnter: AuthGuard
    },
    {
      path: "/reports",
      name: "/reports",
      component: Reports,
      meta: {layout: "defaultLayout"},
      beforeEnter: AuthGuard
    },
    {
      path: "/accountDeactivated",
      name: "/accountDeactivated",
      component: accountDeactivated,
      meta: {layout: "defaultLayout"},
    }
  ]
});


// TO DO
// * Only allow logged in users to access the dashboard
// * Only allow admin to access the admin page.
