<template>
    <div class="mb-12">
        <Transition name="slide-fade-future" mode="out-in">
            <h1
                id="selected-or-current-date"
                class="font-bold mb-4 text-[#5DD9C1]"
                :class="{ 'text-3xl': !inModal, 'text-lg': inModal }"
                :key="formattedDate"
            >
                {{ formattedDate }}
            </h1>
        </Transition>
        <FormKit
            type="form"
            :id="formId"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Log"
            @submit="submitHandler"
            :actions="false"
            incomplete-message=""
        >
            <FormKit
                type="text"
                label="What did you work on?"
                name="workedOn"
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
                name="timeSpentInPlainEnglish"
                help="2h 20m"
                :validation="[
                    ['required'],
                    [
                        'matches',
                        /^(\d{1,2})\s?(h|hr|hour[s]?|m|min|minute[s]?)\b\s?((\d{1,2})\s?(m|min|minute[s]?)\b)?$/gm,
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
                name="logType"
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
import { logTypeApi } from "@/api/log-type.api"

dayjs.extend(advancedFormat)

export default {
    created() {
        this.formId = this.makeId()
    },
    async mounted() {
        this.node = this.$formkit.get(this.formId)
        await this.getLogTypes()
        if (this.workLog) {
            this.node.input({
                workedOn: this.workLog.workedOn,
                timeSpentInPlainEnglish: this.workLog.timeSpentInPlainEnglish,
                logType: this.workLog.logType,
            })
        }
    },
    data() {
        return {
            date: dayjs().format("Do MMMM, YYYY"),
            logTypes: [],
            submitted: false,
            node: undefined,
            formId: null,
            animationClass: "slide-fade-future",
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
        async getLogTypes() {
            this.logTypes = (await logTypeApi.getLogTypes()).data
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
        workLog: {
            type: Object,
            default: null,
        },
    },
}
</script>

<style scoped>
.slide-fade-future-enter-active {
    transition: all 0.1s ease;
}
.slide-fade-future-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-future-enter, .slide-fade-future-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateY(50px);
    opacity: 0;
}
</style>
