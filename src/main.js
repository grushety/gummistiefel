import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"

Vue.config.productionTip = false;
import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBROKNbW4uEZWZFnEXp-B1m0NoNYqMYEjQ",
    libraries: "places"
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
