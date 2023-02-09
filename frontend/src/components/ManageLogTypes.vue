<template>
    <div>
        <h1 class="font-bold text-2xl uppercase mb-4">Manage Log Types</h1>
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
                label="Log Type"
                name="logType"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
        </FormKit>
    </div>
</template>

<script>
export default {
    created() {
        this.formId = this.makeId()
    },
    async mounted() {
        this.node = this.$formkit.get(this.formId)
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
}
</script>

<style scoped></style>
