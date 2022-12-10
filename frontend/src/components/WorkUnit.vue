<template>
    <div
        class="work-done-item p-3 mb-4 shadow"
        @mouseenter="isBeingHovered = true"
        @mouseleave="isBeingHovered = false"
    >
        <small>#{{ work.logType }}</small>
        <p class="max-w-max text-ellipsis">
            {{ getTruncatedDescription }}
        </p>
        <small class="mb-2">{{ work.createdAt }}</small>

        <Transition appear name="slide-fade">
            <div
                class="work-unit-buttons inline-grid grid-cols-2 w-full justify-content-end"
                v-if="isBeingHovered"
            >
                <button class="py-2 px-4 rounded custom-button">Delete</button>
                <button class="py-2 px-4 rounded custom-button">Edit</button>
            </div>
        </Transition>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { WorkUnit } from "@/models/WorkUnit"

export default defineComponent({
    props: {
        work: {
            type: WorkUnit,
            default: {},
        },
    },
    data() {
        return {
            isBeingHovered: false,
        }
    },
    computed: {
        getTruncatedDescription() {
            return `${this.work.duration} on ${this.work.description}`
        },
    },
})
</script>

<style scoped>
.work-done-item {
    max-width: 28rem;
    border: 1px solid #eeeeee;
    border-radius: 0.5rem;
    max-height: 85px;
    transition: max-height 0.15s ease-out;
}

.work-done-item:hover {
    max-height: 150px;
    transition: max-height 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}

.work-done-item p {
    width: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.work-done-item:hover p {
    white-space: inherit;
    text-overflow: inherit;
}

.work-done-item small {
    display: block;
    color: #b2b2b2;
}

.work-done-item .work-unit-buttons button:nth-of-type(1) {
    color: #f67280;
}

.work-done-item .work-unit-buttons button:nth-of-type(2) {
    background-color: #355c7d;
    color: white;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
