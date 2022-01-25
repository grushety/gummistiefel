import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"
import '@/plugins/apexcharts'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false;
import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDLgdbTYFsnVCZOIjpEmIX_h7xWVP1bJhg",
        libraries: "places"
    }
});

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

import axios from 'axios';

Vue.prototype.$axios = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
