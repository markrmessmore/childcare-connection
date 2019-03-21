
export default {
  allUsers: [],
  cases: [],
  loading: false,
  nav     : [
    {
      item: "Dashboard",
      link: "/dashboard",
      icon: "dashboard",
      access: "user",
      color: "primary darken-1",
      dark: true
    },
    {
      item: "New Case",
      link: "/new",
      icon: "add_circle",
      access: "user",
      color: "secondary lighten-1",
      dark: true
    },
    {
      item: "Search Case",
      link: "/search",
      icon: "search",
      access: "user",
      color: "accent1",
      dark: false
    },
    {
      item: "Providers",
      link: "/providers",
      icon: "fas fa-child",
      access: "user",
      color: "primary lighten-2",
      dark: false
    },
    {
      item: "Run Reports",
      link: "/reports",
      icon: "view_carousel",
      access: "user",
      color: "secondary lighten-3",
      dark: true
    },
    {
      item: "About",
      link: "/about",
      icon: "info",
      access: "all",
      color: "accent2",
      dark: true
    },
    {
      item: "Admin",
      link: "/admin",
      icon: "person_outline",
      access: "admin",
      color: "info",
      dark: false
    }
  ],
  providers: [],
  signInStatus  : false,
  signOutStatus : false,
  toast         : {
    status    : false,
    msg       : ""
  },
  user          : null,
  userRole      : null
}
