<template>
    <div class="grid p-4">
        <h1 class="font-bold mb-4 text-[#8d8d8d]">Manage Custom Log Types</h1>
        <div class="p-4 content shadow-2xl mb-8">
            <ManageLogTypes></ManageLogTypes>
        </div>
        <h1 class="font-bold mb-4 text-[#8d8d8d]">Change Password</h1>
        <div class="p-4 content shadow-2xl">
            <ChangePasswordForm></ChangePasswordForm>
        </div>
    </div>
</template>

<script>
import ChangePasswordForm from "@/components/ChangePasswordForm.vue"
import ManageLogTypes from "@/components/ManageLogTypes.vue"

export default {
    components: { ChangePasswordForm, ManageLogTypes },
}
</script>

<style scoped>
.content {
    background-color: white;
    border-radius: 0.5rem;
}
</style>
