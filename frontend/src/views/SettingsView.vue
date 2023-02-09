<template>
    <div class="p-4 content shadow-2xl">
        <ChangePasswordForm></ChangePasswordForm>
    </div>
</template>

<script>
import ChangePasswordForm from "@/components/ChangePasswordForm.vue"
export default {
    components: { ChangePasswordForm },
}
</script>

<style scoped>
.content {
    min-width: 400px;
    background-color: white;
    border-radius: 0.5rem;
}
</style>
