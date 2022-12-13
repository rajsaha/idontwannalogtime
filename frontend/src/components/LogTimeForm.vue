<template>
    <div class="mb-12">
        <h1 id="selected-or-current-date" class="font-bold mb-4 text-3xl">
            {{ formattedDate }}
        </h1>
        <FormKit
            type="form"
            id="log-time-form"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Log"
            @submit="submitHandler"
            :actions="false"
            incomplete-message="Please fill out all fields"
        >
            <FormKit
                type="text"
                label="What did you work on?"
                help="Worked on POST API"
                v-model="workedOn"
                validation="required|length:1, 75"
                :validation-messages="{
                    required: 'Required',
                    length: 'This field needs to be 1-75 characters long',
                }"
            />
            <FormKit
                type="text"
                label="How much time did you spend on it?"
                help="2h 20m"
                v-model="timeSpent"
                :validation="[
                    ['required'],
                    [
                        'matches',
                        /^\d{1,2}\s?(h|hr|hour[s]?|m|min|minute[s]?)\b\s?(\d{1,2}\s?(m|min|minute[s]?)\b)?$/,
                    ],
                ]"
                :validation-messages="{
                    required: 'Required',
                    matches: 'Format incorrect',
                }"
            />
            <FormKit
                type="select"
                label="What kind of work did you do?"
                placeholder="Select a type"
                v-model="logType"
                :options="logTypes"
                validation="required"
                :validation-messages="{ required: 'Required' }"
            />
            <FormKit type="submit" label="Log Work" />
        </FormKit>
    </div>
</template>

<script>
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { useCounterStore } from "@/stores/state"
dayjs.extend(advancedFormat)

export default {
    data() {
        return {
            date: dayjs().format("Do MMMM, YYYY"),
            logTypes: [
                {
                    value: 1,
                    label: "Development",
                },
                {
                    value: 2,
                    label: "Meeting",
                },
            ],
            submitted: false,
        }
    },
    computed: {
        formattedDate() {
            return dayjs(this.store.date).format("Do MMMM, YYYY")
        },
    },
    methods: {
        async submitHandler() {
            await new Promise((r) => setTimeout(r, 1000))
            this.submitted = true
            this.$formkit.reset("log-time-work")
        },
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
    watch: {
        date() {
            this.$formkit.reset("log-time-form")
        },
    },
}
</script>

<style scoped>
#selected-or-current-date {
    color: #6bcb77;
}
</style>
