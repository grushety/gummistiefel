import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/StartPage.vue")
    },
    {
        path: '/oldStartPage',
        name: 'Events',
        component: () => import("@/components/OldStartPage.vue"),
    },

    {
        path: '/events/:id/eventDetails',
        name: 'Event Details',
        component: () => import("@/components/EventDetails.vue"),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkExactActiveClass: "active"
});

export default router
