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
                <button
                    @click="updateWorkUnitDialog"
                    class="py-2 px-4 rounded custom-button"
                >
                    Edit
                </button>
            </div>
        </Transition>

        <Teleport to="body">
            <Transition name="modal">
                <div v-if="open" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <slot name="header">Update Work</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body"
                                    ><LogTimeForm></LogTimeForm
                                ></slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button
                                        class="modal-default-button"
                                        @click="$emit('cancel')"
                                    >Cancel</button>
                                    <button
                                        class="modal-default-button"
                                        @click="$emit('update')"
                                    >Update</button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { WorkUnit } from "@/models/WorkUnit"
import LogTimeForm from "@/components/LogTimeForm.vue"

export default defineComponent({
    components: { LogTimeForm },
    props: {
        work: {
            type: WorkUnit,
        },
    },
    data() {
        return {
            isBeingHovered: false,
            open: false,
        }
    },
    computed: {
        getTruncatedDescription() {
            return `${this.work.duration} on ${this.work.description}`
        },
    },
    methods: {
        updateWorkUnitDialog() {
            this.open = true
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

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    max-width: 28rem;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

</style>
