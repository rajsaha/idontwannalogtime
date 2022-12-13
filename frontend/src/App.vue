<template>
    <div>
        <div class="application-sections h-screen">
            <nav class="p-4 flex">
                <h1 class="font-bold">idontwannalogtime</h1>
                <small style="margin-top: 4px">v0.1</small>
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

<style scoped>
.application-sections {
    display: grid;
    grid-template-areas:
        "navigation"
        "main"
        "footer";
    overflow-x: hidden;
    overflow-y: auto;
}

.application-sections nav {
    grid-area: navigation;
    display: flex;
    align-items: center;
    justify-content: center;
}

.application-sections nav h1 {
    font-family: "Rancho", cursive;
    font-size: 1.5rem;
}

.application-sections nav h1 span {
    font-family: inherit;
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
</style>
