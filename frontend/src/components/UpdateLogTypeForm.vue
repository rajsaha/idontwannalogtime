<template>
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
            placeholder="Update Log Type"
            name="description"
            validation="required"
            :validation-messages="{
                required: 'Required',
            }"
        />
    </FormKit>
</template>

<script>
export default {
    created() {
        this.formId = this.makeId()
    },
    async mounted() {
        this.node = this.$formkit.get(this.formId)
        if (this.logType) {
            this.node.input({
                description: this.logType.description,
            })
        }
    },
    data() {
        return {
            submitted: false,
            node: undefined,
            formId: null,
        }
    },
    methods: {
        async submitHandler() {
            if (!this.node.context.state.valid) {
                this.node.submit()
                return false
            }

            return this.node.value
        },
        getFormValue() {
            return this.node.value
        },
        resetForm() {
            this.node.reset()
        },
        makeId() {
            return Math.random().toString(36).slice(2, 7)
        },
    },
    props: {
        logType: {
            type: Object,
            default: null,
        },
    },
}
</script>

<style scoped></style>
