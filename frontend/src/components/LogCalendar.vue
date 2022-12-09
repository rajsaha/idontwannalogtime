<template>
    <DatePicker v-model="store.date" @dayclick="updateDate" />
</template>

<script>
import { DatePicker } from "v-calendar"
import { useCounterStore } from "@/stores/state"
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
            this.store.setDate(day.date)
        },
    },
}
</script>

<style scoped></style>
