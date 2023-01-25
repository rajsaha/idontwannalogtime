<script lang="ts">
import LogTimeForm from "@/components/LogTimeForm.vue"
import WorkDone from "@/components/WorkDone.vue"
import LogCalendar from "@/components/LogCalendar.vue"
import router from "@/router"

export default {
    components: { LogCalendar, LogTimeForm, WorkDone },
    methods: {
        async logout() {
            localStorage.setItem("access_token", "")
            await router.push("/auth")
        },
    },
}
</script>

<template>
    <main class="p-4">
        <nav class="py-4 grid justify-end">
            <ul class="uppercase font-bold cursor-pointer" @click="logout">
                Logout
            </ul>
        </nav>
        <section class="grid home-grid gap-x-6">
            <div class="md:justify-self-end"><LogCalendar /></div>
            <div class="p-4 content shadow-2xl">
                <LogTimeForm ref="logTimeForm" />
                <WorkDone />
            </div>
        </section>
    </main>
</template>

<style scoped>
.home-grid {
    grid-template-columns: min-content max-content;
    justify-content: center;
}

.content {
    background-color: white;
    border-radius: 0.5rem;
}
</style>
