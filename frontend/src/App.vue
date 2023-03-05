<template>
    <div>
        <div class="application-sections h-screen gradient" :class="isLoggedIn ? 'logged-in' : 'logged-out'">
            <div class="p-4 flex app-title">
                <h1 class="font-bold">idontwannalogtime</h1>
                <small style="margin-top: 4px">v0.1</small>
            </div>
            <nav
                class="p-2 flex gap-4 bg-white rounded navigation ml-auto mr-auto self-center mb-8"
                v-if="isLoggedIn"
            >
                <router-link
                    class="uppercase font-bold cursor-pointer rounded px-4 py-2"
                    to="/"
                    :active-class="'active-navigation-item'"
                >
                    Home
                </router-link>
                <router-link
                    class="uppercase font-bold cursor-pointer rounded px-4 py-2"
                    to="/settings"
                    :active-class="'active-navigation-item'"
                >
                    Manage
                </router-link>
                <ul
                    class="uppercase font-bold cursor-pointer ml-auto rounded px-4 py-2"
                    @click="logout"
                >
                    Logout
                </ul>
            </nav>
            <div class="pages flex self-center justify-self-center">
                <RouterView />
            </div>
            <footer class="p-4">
                <p class="self-center">
                    Made with ❤️ by
                    <a href="https://rajsaha.dev/" target="_blank">Raj Saha</a>
                </p>
            </footer>
        </div>
    </div>
</template>

<script>
import router from "@/router"

export default {
    created() {
        this.isLoggedIn = localStorage.getItem("access_token")
    },
    methods: {
        async logout() {
            localStorage.setItem("access_token", "")
            this.isLoggedIn = false
            await router.go()
        },
    },
    data() {
        return {
            isLoggedIn: true,
        }
    },
}
</script>

<style scoped>
.application-sections {
    display: grid;
    overflow-x: hidden;
    overflow-y: auto;
}

.logged-out {
    grid-template-areas:
        "app-title"
        "main"
        "footer";
}

.logged-in {
    grid-template-areas:
        "app-title"
        "navigation"
        "main"
        "footer";
    grid-template-rows: min-content min-content 1fr min-content;
}

.application-sections .app-title {
    grid-area: app-title;
    display: flex;
    align-items: center;
    justify-content: center;
}

.application-sections .app-title h1 {
    font-family: "Rancho", cursive;
    font-size: 1.5rem;
}

.application-sections .app-title h1 span {
    font-family: inherit;
}

.application-sections .navigation {
    grid-area: navigation;
    height: min-content;
    width: min-content;
}

.application-sections .pages {
    grid-area: main;
}

.application-sections footer {
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gradient {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.navigation ul {
    border-radius: 5px;
    border: 1px solid transparent;
    color: #373d3f;
}

.navigation ul:hover {
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.navigation ul:active {
    background-color: rgba(0, 0, 0, 0.1);
}

.active-navigation-item {
    background-color: #b084cc;
    color: white;
}
</style>
