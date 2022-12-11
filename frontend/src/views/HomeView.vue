<script setup lang="ts">
import LogTimeForm from "@/components/LogTimeForm.vue"
import WorkDone from "@/components/WorkDone.vue"
import LogCalendar from "@/components/LogCalendar.vue"
</script>

<template>
    <main class="p-4">
        <section class="grid home-grid gap-x-6">
            <div class="md:justify-self-end"><LogCalendar /></div>
            <div>
                <LogTimeForm />
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
</style>
