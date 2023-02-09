import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AuthView from "@/views/AuthView.vue"
import { authApi } from "@/api/auth.api"
import SettingsView from "@/views/ManageView.vue"

async function routeGuard(to, from, next) {
    const isSessionHealthy = await authApi.sessionHealth()

    if (isSessionHealthy && !to.meta.authRequired) {
        return next({ name: "home" })
    }

    if (isSessionHealthy && to.meta.authRequired) {
        return next()
    }

    if (!isSessionHealthy && to.meta.authRequired) {
        return next({ name: "auth" })
    }

    return next()
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                authRequired: true,
            },
            beforeEnter: routeGuard,
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsView,
            meta: {
                authRequired: true,
            },
            beforeEnter: routeGuard,
        },
        {
            path: "/auth",
            name: "auth",
            component: AuthView,
            meta: {
                authRequired: false,
            },
            beforeEnter: routeGuard,
        },
    ],
})

export default router
