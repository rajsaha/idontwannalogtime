import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AuthView from "@/views/AuthView.vue"
import { authApi } from "@/api/auth.api"

async function routeGuard(to, from, next) {
    const isSessionHealthy = await authApi.sessionHealth()
    console.log(isSessionHealthy)
    if (isSessionHealthy && to.name === "auth") {
        return next({ name: "/" })
    }

    if (!isSessionHealthy) {
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
            path: "/auth",
            name: "auth",
            component: AuthView,
            meta: {
                authRequired: false,
            },
        },
    ],
})

export default router
