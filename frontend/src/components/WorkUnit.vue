<template>
    <div class='work-done-item p-3 mb-4 shadow'>
        <small>#{{ work.logType }}</small>
        <p>{{ work.duration }} on {{ work.description }}</p>
        <small>{{ work.createdAt }}</small>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { WorkUnit } from '@/models/WorkUnit'

export default defineComponent({
    props: {
        work: {
            type: WorkUnit,
            default: {},
        },
    },
})
</script>

<style scoped>
.work-done-item {
    max-width: 375px;
    border: 1px solid #eeeeee;
    border-radius: 0.5rem;
}

.work-done-item small {
    display: block;
    color: #b2b2b2;
}
</style>
