import { defineStore } from "pinia"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export const useCounterStore = defineStore("state", {
    state: () => ({
        date: dayjs().utc().format("YYYY-MM-DD"),
    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        setDate(date: string): void {
            this.date = date
        },
    },
})
