<template>
    <div class="grid">
        <div class="p-4 content shadow-2xl mb-4">
            <ManageLogTypes></ManageLogTypes>
        </div>
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
