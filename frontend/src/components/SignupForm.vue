<template>
    <div>
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
                label="What's your email?"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
            <FormKit
                type="password"
                label="What's your password?"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
            <FormKit type="submit" label="Sign Up" />
        </FormKit>
        <small
            >Have an account already?
            <a class="font-bold cursor-pointer" @click="goToLogin"
                >Login</a
            ></small
        >
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    name: "SignupForm",
    created() {
        this.formId = this.makeId()
    },
    mounted() {
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

            this.submitted = true
            this.$formkit.reset(this.formId)
            return this.$formkit.get(this.formId).value
        },
        makeId() {
            return Math.random().toString(36).slice(2, 7)
        },
        goToLogin() {
            this.$emit("login")
        },
    },
})
</script>

<style scoped></style>
