<template>
    <div>
        <h1 class="font-bold text-2xl mb-4">Change Password</h1>
        <FormKit
            type="form"
            :id="formId"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Log"
            :actions="false"
            incomplete-message=""
        >
            <FormKit
                type="password"
                label="Current Password"
                name="password"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
            <FormKit
                type="password"
                label="New Password"
                name="newPassword"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
            <FormKit
                type="password"
                label="Confirm New Password"
                name="newPassword_confirm"
                validation="required|confirm"
                :validation-messages="{
                    required: 'Required',
                }"
                validation-label="Confirmation"
            />
        </FormKit>
        <button
            class="bg-[#665687] hover:bg-[#331268] active:bg-[#190933] transition-[background-color] text-white text-sm font-bold py-2 px-4 rounded w-full"
            @click="submitHandler"
        >
            Change Password
        </button>
    </div>
</template>

<script>
import { userApi } from "@/api/user.api"
import { createToaster } from "@meforma/vue-toaster"
const toaster = createToaster()

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
            try {
                if (!this.node.context.state.valid) {
                    this.node.submit()
                    return false
                }

                const data = {
                    password: this.node.value.password,
                    newPassword: this.node.value.newPassword,
                    confirmNewPassword: this.node.value.newPassword_confirm,
                }

                const response = await userApi.updatePassword(data)

                if (response.data) {
                    toaster.success("Password changed")
                    this.$formkit.get(this.formId).reset()
                }
            } catch (error) {
                toaster.error(error.response.data.message)
            }
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
