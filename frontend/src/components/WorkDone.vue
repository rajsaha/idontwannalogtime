<template>
    <section>
        <h1 class="font-bold text-3xl mb-4">Work Done</h1>
        <li class="list-none">
            <WorkUnit v-for="item in items" :key="item" :work="item"></WorkUnit>
        </li>
    </section>
</template>

<script>
import { defineComponent } from "vue"
import dayjs from "dayjs"
import WorkUnit from "@/components/WorkUnit.vue"

export default defineComponent({
    components: { WorkUnit },
    data() {
        return {
            items: [
                {
                    duration: "4h 20m",
                    description:
                        "Reviewing tech design doc with Chun Weng (1447 - user attributes)",
                    logType: "Development",
                    createdAt: dayjs().format("h:m:s a"),
                },
                {
                    duration: "40m",
                    description: "Standup",
                    logType: "Meeting",
                    createdAt: dayjs().format("h:m:s a"),
                },
            ],
        }
    },
})
</script>

<style scoped></style>
