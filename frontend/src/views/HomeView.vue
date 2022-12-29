<script lang="ts">
import LogTimeForm from "@/components/LogTimeForm.vue"
import WorkDone from "@/components/WorkDone.vue"
import LogCalendar from "@/components/LogCalendar.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: { LogCalendar, LogTimeForm, WorkDone },
    methods: {
        async create() {
            const result = await this.$refs.logTimeForm.submitHandler()
            if (result) {
                // TODO: Run API call here
            }
        },
    },
})
</script>

<template>
    <main class="p-4">
        <section class="grid home-grid gap-x-6">
            <div class="md:justify-self-end"><LogCalendar /></div>
            <div>
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
</style>
