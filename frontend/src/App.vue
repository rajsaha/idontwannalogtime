<template>
    <div>
        <div
            class="application-sections h-screen gradient"
            :class="isLoggedIn ? 'logged-in' : 'logged-out'"
        >
            <div class="p-4 flex app-title">
                <h1 class="font-bold">idontwannalogtime</h1>
                <small style="margin-top: 4px">v0.1</small>
            </div>
            <nav
                class="p-2 flex gap-4 bg-white rounded navigation ml-auto mr-auto self-center mb-8 min-w-fit text-xs sm:text-sm md:text-base"
                v-if="isLoggedIn"
            >
                <router-link
                    class="uppercase font-bold cursor-pointer rounded px-4 py-2 hover:bg-[#665687] hover:text-[#fff]"
                    to="/"
                    :active-class="'active-navigation-item'"
                >
                    Home
                </router-link>
                <router-link
                    class="uppercase font-bold cursor-pointer rounded px-4 py-2 hover:bg-[#665687] hover:text-[#fff]"
                    to="/settings"
                    :active-class="'active-navigation-item'"
                >
                    Manage
                </router-link>
                <ul
                    class="uppercase font-bold cursor-pointer ml-auto rounded px-4 py-2"
                    @click="logout"
                    @mouseover="logoutHover = true"
                    @mouseleave="logoutHover = false"
                >
                    <div v-if="!logoutHover">
                        <span class="font-bold">Logout&nbsp;&nbsp;</span>
                    </div>
                    <div class="logout-button" v-if="logoutHover">
                        <span class="font-bold">Logout&nbsp;&nbsp;</span>
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-right-from-bracket"
                            shake
                        />
                    </div>
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
            logoutHover: false,
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

.logout-button {
    transition: width 0.2s ease-in-out;
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
    border: 1px solid transparent;
    background-color: #b084cc;
    color: white;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
        drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

.active-navigation-item:hover {
    background-color: #a255d2;
}
</style>
