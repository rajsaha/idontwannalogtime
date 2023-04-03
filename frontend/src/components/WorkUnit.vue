<template>
    <div
        class="work-done-item p-3 mb-4"
        @mouseenter="isBeingHovered = true"
        @mouseleave="isBeingHovered = false"
    >
        <small class="font-bold text-[#665687]"
            >#{{ work.logTypeDescription }}</small
        >
        <p
            class="max-w-max text-ellipsis font-medium"
            :class="{ 'mb-2': work.note }"
        >
            {{ getTruncatedDescription }}
        </p>
        <p v-if="work.note" class="rounded-lg p-2 text-xs bg-yellow-100 mb-2">
            {{ work.note }}
        </p>
        <small class="text-gray-400" :class="{ 'mb-2': isBeingHovered }"
            >Last Updated: {{ getFormattedDate }}</small
        >

        <Transition appear name="slide-fade">
            <div
                class="work-unit-buttons inline-grid grid-cols-2 w-full justify-content-end"
                v-if="isBeingHovered"
            >
                <button
                    @click="openDeleteWorkUnitDialog"
                    class="py-2 px-4 rounded custom-button-no-fill font-bold"
                >
                    Delete
                </button>
                <button
                    @click="openUpdateWorkUnitDialog"
                    class="py-2 px-4 rounded custom-button shadow font-bold"
                >
                    Edit
                </button>
            </div>
        </Transition>

        <!--Update Work Modal-->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="openUpdateModal" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div
                                class="modal-header font-bold text-gray-600 text-2xl"
                            >
                                <slot name="header">Update Work</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    <LogTimeForm
                                        :inModal="true"
                                        :workLog="workLog"
                                        ref="logTimeForm"
                                    ></LogTimeForm>
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button
                                        class="custom-button-no-fill py-2 px-4 rounded font-bold"
                                        @click="cancelUpdate"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        class="custom-button py-2 px-4 rounded font-bold"
                                        @click="confirmUpdate"
                                    >
                                        Update
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!--Delete Work Modal-->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="openDeleteModal" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div
                                class="modal-header font-bold text-gray-600 text-2xl"
                            >
                                <slot name="header">Delete Work</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    <p>
                                        Are you sure you want to delete
                                        <b>{{ work.workedOn }}?</b>
                                    </p>
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button
                                        class="custom-button-no-fill py-2 px-4 rounded font-bold"
                                        @click="cancelDelete"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        class="custom-button py-2 px-4 rounded font-bold"
                                        @click="confirmDelete"
                                    >
                                        Delete
                                    </button>
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
import LogTimeForm from "@/components/LogTimeForm.vue"
import { logApi } from "@/api/log.api"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { createToaster } from "@meforma/vue-toaster"
const toaster = createToaster()

export default {
    components: { LogTimeForm },
    props: {
        work: {
            type: Object,
            default: null,
        },
        inModal: Boolean,
    },
    data() {
        return {
            isBeingHovered: false,
            openUpdateModal: false,
            openDeleteModal: false,
            workLog: Object,
        }
    },
    computed: {
        getTruncatedDescription() {
            return `${this.work.timeSpentInPlainEnglish} on ${this.work.workedOn}`
        },
        getFormattedDate() {
            return dayjs(this.work.updatedAt).utc().format("YYYY-MM-DD")
        },
    },
    methods: {
        async openUpdateWorkUnitDialog() {
            await this.getLog()
        },
        async openDeleteWorkUnitDialog() {
            this.openDeleteModal = true
        },
        cancelUpdate() {
            this.openUpdateModal = false
        },
        async confirmUpdate() {
            try {
                const formValue = await this.$refs.logTimeForm.submitHandler()
                const response = await logApi.updateLog({
                    _id: this.work._id,
                    ...formValue,
                })
                if (response.data) {
                    this.openUpdateModal = false
                    toaster.success("Work updated")
                    this.$emit("reloadLogs")
                }
            } catch (error) {
                toaster.error(error.message)
            }
        },
        async getLog() {
            try {
                this.workLog = (await logApi.getLog(this.work._id)).data
                this.openUpdateModal = true
            } catch (error) {
                toaster.error(error.message)
            }
        },
        cancelDelete() {
            this.openDeleteModal = false
        },
        async confirmDelete() {
            try {
                const response = await logApi.deleteLog(this.work._id)
                if (response.data) {
                    this.openDeleteModal = false
                    toaster.success("Work deleted")
                    this.$emit("reloadLogs")
                }
            } catch (error) {
                toaster.error(error.message)
            }
        },
    },
}
</script>

<style scoped>
.work-done-item {
    max-width: 28rem;
    border: 2px solid #eeeeee;
    border-radius: 0.5rem;
    max-height: 150px;
    transition: max-height 0.15s ease-out;
}

.work-done-item:hover {
    max-height: 800px;
    transition: max-height 0.05s cubic-bezier(1, 0.5, 0.8, 1);
    border-color: #b084cc;
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
