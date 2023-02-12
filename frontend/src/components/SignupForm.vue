<template>
    <div class="auth-form">
        <h1 class="font-black uppercase mb-4 text-lg">💖 Create an account</h1>
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
                type="email"
                label="What's your email?"
                name="email"
                validation="required|email"
                :validation-messages="{
                    required: 'Required',
                }"
            />
            <FormKit
                type="password"
                label="What's your password?"
                name="password"
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
import { authApi } from "@/api/auth.api"
import { createToaster } from "@meforma/vue-toaster"
const toaster = createToaster()

export default {
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
            try {
                if (!this.node.context.state.valid) {
                    this.node.submit()
                    return false
                }

                this.submitted = true
                const response = await authApi.signup(
                    this.$formkit.get(this.formId).value.email,
                    this.$formkit.get(this.formId).value.password
                )
                if (response.data) {
                    this.$formkit.reset(this.formId)
                    this.goToLogin()
                }
            } catch (error) {
                toaster.error(error.response.data.message)
                this.$formkit.get(this.formId).reset()
            }
        },
        makeId() {
            return Math.random().toString(36).slice(2, 7)
        },
        goToLogin() {
            this.$emit("goToLogin")
        },
    },
}
</script>

<style scoped>
.auth-form {
    display: grid;
    height: 100%;
}

.auth-form small {
    align-self: end;
}
</style>
