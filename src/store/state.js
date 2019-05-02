
export default {
  allUsers: [],
  careType: ["Full Day", "Before School", "After School", "Summer Camp", "None"],
  cases: [],
  childStatus: ["Active", "Inactive", "Pending", "Terminated", "Waiting List"],
  dbVariables: [],
  incomeFrequency: ['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly'],
  incomeType: ['Wages & Salary', 'Pension/Retirement/Supplemental/Social Sec.', 'Unemployment/Workers Comp.', 'Public Assist./TANF', 'Child Support/Alimony', 'Other'],
  loading: false,
  locationItems: ['Work', 'School', 'Training Program'],
  locationStatus: ['Full Time', 'Part Time', 'Seasonal'],
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
  phoneTypes: ['Applicant Cell', 'Co-Applicant Cell', 'Home Phone'],
  providers: [],
  relationshipItems: ['Father', 'Mother', 'Legally Responsible Adult (proof of custody provided)'],
  signInStatus  : false,
  signOutStatus : false,
  toast         : {
    status    : false,
    msg       : ""
  },
  user          : null,
  userRole      : null
}
