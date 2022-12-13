<template>
    <section>
        <h1 class="font-bold text-3xl mb-4">Work Log</h1>
        <div class="progress-bar-container mb-2">
            <progress class="w-full" v-bind:value="percentageDone" max="100">
                {{ percentageDone }}
            </progress>
        </div>
        <small class="block mb-4 text-right"
            >{{ totalMinutes }} of 540 minutes (standard 8 hour workday)</small
        >
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
                    durationInMinutes: 260,
                    description:
                        "Reviewing tech design doc with Chun Weng (1447 - user attributes)",
                    logType: "Development",
                    createdAt: dayjs().format("h:m:s a"),
                },
                {
                    duration: "40m",
                    durationInMinutes: 40,
                    description: "Standup",
                    logType: "Meeting",
                    createdAt: dayjs().format("h:m:s a"),
                },
                {
                    duration: "40m",
                    durationInMinutes: 40,
                    description: "Meeting with Mike",
                    logType: "Meeting",
                    createdAt: dayjs().format("h:m:s a"),
                },
                {
                    duration: "1h 10m",
                    durationInMinutes: 70,
                    description: "Meeting with Mike",
                    logType: "Meeting",
                    createdAt: dayjs().format("h:m:s a"),
                },
            ],
        }
    },
    computed: {
        totalMinutes() {
            let minutes = 0
            for (const item of this.items) {
                minutes += item.durationInMinutes
            }
            return minutes
        },
        percentageDone() {
            const percentage = (this.totalMinutes / 540) * 100
            return `${percentage.toFixed(0)}`
        },
    },
})
</script>

<style scoped>
.progress-bar-container {
    display: flex;
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    height: min-content;
}

progress::-moz-progress-bar {
    background: #6bcb77;
}
progress::-webkit-progress-value {
    background: #6bcb77;
}
progress {
    color: #6bcb77;
}
</style>
