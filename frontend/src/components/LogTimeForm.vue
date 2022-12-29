<template>
    <div class="mb-12">
        <h1
            id="selected-or-current-date"
            class="font-bold mb-4"
            :class="{ 'text-3xl': !inModal }"
        >
            {{ formattedDate }}
        </h1>
        <FormKit
            type="form"
            :id="formId"
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
                :options="logTypes"
                validation="required"
                :validation-messages="{ required: 'Required' }"
            />
            <FormKit type="submit" label="Log Work" v-if="!inModal" />
        </FormKit>
    </div>
</template>

<script>
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { useCounterStore } from "@/stores/state"

dayjs.extend(advancedFormat)

export default {
    created() {
        this.formId = this.makeId()
    },
    mounted() {
        this.node = this.$formkit.get(this.formId)
    },
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
            node: undefined,
            formId: null,
        }
    },
    computed: {
        formattedDate() {
            return dayjs(this.store.date).format("Do MMMM, YYYY")
        },
    },
    methods: {
        async submitHandler() {
            if (!this.node.context.state.valid) {
                this.node.submit()
                return false
            }

            this.submitted = true
            this.$formkit.reset(this.formId)
            return this.$formkit.get(this.formId).value
        },
        makeId() {
            return Math.random().toString(36).slice(2, 7)
        },
    },
    setup() {
        const store = useCounterStore()

        return { store }
    },
    watch: {
        date() {
            this.$formkit.reset(this.formId)
        },
    },
    props: {
        inModal: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style scoped>
#selected-or-current-date {
    color: #6bcb77;
}
</style>
