import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '../store';
import Register from '@/views/Register'
import Login from '@/views/Login'
import QrCodes from "@/views/QrCodes";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: "Register",
        component: Register,
        meta: { guest: true },
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/qrCodes',
        name: QrCodes,
        component: QrCodes,
        meta: {requiresAuth: true},
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next("/qrCodes");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router
