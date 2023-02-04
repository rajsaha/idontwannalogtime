<template>
    <div
        class="work-done-item p-3 mb-4"
        @mouseenter="isBeingHovered = true"
        @mouseleave="isBeingHovered = false"
    >
        <small>#{{ work.logTypeDescription }}</small>
        <p class="max-w-max text-ellipsis font-medium">
            {{ getTruncatedDescription }}
        </p>
        <small class="mb-2">Last Updated: {{ getFormattedDate }}</small>

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
                                class="modal-header font-bold uppercase text-gray-600 text-2xl"
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

        <!--Update Work Modal-->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="openDeleteModal" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div
                                class="modal-header font-bold uppercase text-gray-600 text-2xl"
                            >
                                <slot name="header">Delete Work</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    <p>Are you sure you want to delete <b>{{ work.workedOn }}?</b></p>
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
import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
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
            return dayjs(new Date(this.work.updatedAt)).format(
                "YYYY-MM-DD HH:mm:ss"
            )
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
        }
    },
}
</script>

<style scoped>
.work-done-item {
    max-width: 28rem;
    border: 2px solid #eeeeee;
    border-radius: 0.5rem;
    max-height: 85px;
    transition: max-height 0.15s ease-out;
}

.work-done-item:hover {
    max-height: 150px;
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
    color: #b2b2b2;
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

.modal-footer {
    display: grid;
    grid-template-columns: auto auto;
}

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
