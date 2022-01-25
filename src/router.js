import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/StartPage.vue")
    },
   ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkExactActiveClass: "active"
});

export default router
