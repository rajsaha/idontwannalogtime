import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AuthView from "@/views/AuthView.vue"
import { authApi } from "@/api/auth.api"

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

router.beforeEach(async (to, from, next) => {
    try {
        // const isSessionHealthy = await authApi.sessionHealth()
        // if (to.meta && to.meta.authRequired && isSessionHealthy.success) {
        //     return next()
        // }

        return next()
    } catch (error) {
        return next({ name: "auth" })
    }
})

export default router
