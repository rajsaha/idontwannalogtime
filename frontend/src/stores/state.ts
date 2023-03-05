import { defineStore } from "pinia"
import dayjs from "dayjs"

export const useCounterStore = defineStore("state", {
    state: () => ({
        date: dayjs().format("YYYY-MM-DD"),
    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        setDate(date: string): void {
            this.date = date
        },
    },
})
