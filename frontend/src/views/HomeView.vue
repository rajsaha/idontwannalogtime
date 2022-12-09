<script setup lang="ts">
import LogTimeForm from "@/components/LogTimeForm.vue"
import WorkDone from "@/components/WorkDone.vue"
import LogCalendar from "@/components/LogCalendar.vue"
</script>

<template>
    <main class="h-screen p-4">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div class="md:justify-self-end"><LogCalendar /></div>
            <div>
                <LogTimeForm />
                <WorkDone />
            </div>
        </section>
    </main>
</template>

<style scoped></style>
