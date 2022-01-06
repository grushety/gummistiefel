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
import {Line} from 'vue-chartjs';
Vue.component('line-chart', {
    extends: Line,
    props: {
        labels: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        },
        datasets: Array,
		options: {
			type: Object,
			default: null
		}
    },
    watch: {
        'datasets.length'() {
            this.renderChartData()
        },
        'labels.length'(){
            this.renderChartData()
        },
        options: {
			deep: true,
			handler(){
				console.log("watchaaa", this.options)
				this.renderChartData()
			}
		}
    },
    mounted() {
        this.renderChartData()
    },
    methods: {
        renderChartData() {
			console.log(this.options)
            this.renderChart({
                labels: this.labels,
                datasets: this.datasets,
            }, { responsive: true, maintainAspectRatio: false, ...this.options })
        }
    }

});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
