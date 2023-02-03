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
            <WorkUnit v-for="log in logs" :key="log" :work="log"></WorkUnit>
        </li>
    </section>
</template>

<script>
import WorkUnit from "@/components/WorkUnit.vue"
import { logApi } from "@/api/log.api"
import { useCounterStore } from "@/stores/state"
import dayjs from "dayjs"

export default {
    components: { WorkUnit },
    data() {
        return {
            date: dayjs().format("YYYY-MM-DD"),
            logs: [],
        }
    },
    computed: {
        totalMinutes() {
            let minutes = 0
            for (const log of this.logs) {
                minutes += log.timeSpent
            }
            return minutes
        },
        percentageDone() {
            const percentage = (this.totalMinutes / 540) * 100
            return `${percentage.toFixed(0)}`
        },
    },
    mounted() {
        this.getLogs()
    },
    methods: {
        getLogs() {
            logApi
                .getLogs(dayjs(this.store.date).format("YYYY-MM-DD"))
                .then((result) => {
                    this.logs = result.data
                })
        },
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
    watch: {
        "store.date": {
            handler() {
                this.getLogs()
            },
        },
    },
}
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
    background: #acfcd9;
}
progress::-webkit-progress-value {
    background: #acfcd9;
}
progress {
    color: #acfcd9;
}
</style>
