<template>
    <DatePicker
        v-model="store.date"
        color="teal"
        @dayclick="updateDate"
        v-if="width > 768"
    />
    <DatePicker
        v-model="store.date"
        color="teal"
        @dayclick="updateDate"
        v-if="width < 768"
        :masks="masks"
    >
        <template v-slot="{ inputValue, inputEvents }">
            <h1 class="font-bold mb-2">Select a date</h1>
            <input
                class="bg-white border px-2 py-1 rounded w-full mb-4"
                :value="inputValue"
                v-on="inputEvents"
            />
        </template>
    </DatePicker>
</template>

<script>
import { DatePicker } from "v-calendar"
import { useCounterStore } from "@/stores/state"
import dayjs from "dayjs"
export default {
    components: {
        DatePicker,
    },
    mounted() {
        window.addEventListener("resize", this.getWindowWidth)
        this.getWindowWidth()
    },
    data() {
        return {
            date: new Date(),
            width: 0,
            masks: {
                input: "DD-MM-YYYY",
            },
        }
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
    methods: {
        updateDate(day) {
            this.store.setDate(
                dayjs(`${day.year}-${day.month}-${day.day}`).format(
                    "YYYY-MM-DD"
                )
            )
        },
        getWindowWidth() {
            this.width = window.innerWidth
        },
    },
}
</script>

<style scoped></style>
