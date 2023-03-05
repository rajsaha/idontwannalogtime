<script>
import LogTimeForm from "@/components/LogTimeForm.vue"
import WorkDone from "@/components/WorkDone.vue"
import LogCalendar from "@/components/LogCalendar.vue"
import { createToaster } from "@meforma/vue-toaster"
import { logApi } from "@/api/log.api"
import { useCounterStore } from "@/stores/state"
const toaster = createToaster()

export default {
    components: { LogCalendar, LogTimeForm, WorkDone },
    methods: {
        async logWork() {
            try {
                const formValue = await this.$refs.logTimeForm.getFormValue()
                const response = await logApi.createLog({
                    date: this.store.date,
                    ...formValue,
                })
                if (response.data) {
                    toaster.success("Logged work")
                    this.$refs.logTimeForm.resetForm()
                    await this.$refs.workDone.getLogs()
                }
            } catch (error) {
                toaster.error(error.message)
            }
        }
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
}
</script>

<template>
    <main class="p-4">
        <section class="grid home-grid gap-x-6">
            <div class="md:justify-self-end"><LogCalendar /></div>
            <div class="p-4 content shadow-2xl min-w-full">
                <LogTimeForm ref="logTimeForm" @logWork="logWork" />
                <WorkDone ref="workDone" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.home-grid {
    justify-content: center;
}

.content {
    background-color: white;
    border-radius: 0.5rem;
}

@media (min-width: 768px) {
    .home-grid {
        grid-template-columns: min-content minmax(300px, max-content);
    }
}
</style>
