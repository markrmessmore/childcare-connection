import Vue from "vue";
import Vuetify from "vuetify/lib";
// import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#78a1bb",
        secondary: "#424242",
        accent: "#394f49",
        accent2: "#8b786d",
        error: "#cf3a3a",
        info: "#ebf5ee"
      }
    }
  },
  icons: {
    iconfont: "fa"
  }
});
