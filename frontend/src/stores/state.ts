import { defineStore } from "pinia"

export const useCounterStore = defineStore("state", {
    state: () => ({
        date: new Date(),
    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        setDate(date: Date): void {
            this.date = date
        },
    },
})
