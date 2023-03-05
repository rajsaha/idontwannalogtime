<template>
    <DatePicker v-model="store.date" color="teal" @dayclick="updateDate" />
</template>

<script>
import { DatePicker } from "v-calendar"
import { useCounterStore } from "@/stores/state"
import dayjs from "dayjs"
export default {
    components: {
        DatePicker,
    },
    data() {
        return {
            date: new Date(),
        }
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
    methods: {
        updateDate(day) {
            this.store.setDate(
                dayjs(`${day.year}-${day.month}-${day.day}`).toDate()
            )
        },
    },
}
</script>

<style scoped></style>
