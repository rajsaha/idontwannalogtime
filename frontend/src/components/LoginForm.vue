<template>
    <div class="auth-form">
        <h1 class="font-black uppercase mb-4 text-lg">🔓 Get back in</h1>
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
                name="email"
                validation="required"
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
            <FormKit type="submit" label="Login" />
        </FormKit>

        <small
            >Don't have an account?
            <a class="font-bold cursor-pointer" @click="goToSignup"
                >Sign Up</a
            ></small
        >
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { authApi } from "@/api/auth.api"
import router from "@/router"
import { createToaster } from "@meforma/vue-toaster"
const toaster = createToaster()

export default defineComponent({
    name: "LoginForm",
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
                const accessToken = await authApi.login(
                    this.$formkit.get(this.formId).value
                )
                if (accessToken) {
                    localStorage.setItem(
                        "access_token",
                        accessToken.access_token
                    )
                    this.$formkit.get(this.formId).reset()
                    await router.push("/")
                }
            } catch (error) {
                toaster.error("Email/Password Incorrect")
                this.$formkit.get(this.formId).reset()
            }
        },
        makeId() {
            return Math.random().toString(36).slice(2, 7)
        },
        goToSignup() {
            this.$emit("goToSignup")
        },
    },
})
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
