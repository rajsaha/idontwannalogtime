<template>
    <div>
        <h1 class="font-bold text-2xl uppercase mb-4">Manage Log Types</h1>
        <div class="list-of-log-types mb-4" v-if="!noUserLogTypesFound">
            <div
                class="log-type p-4 rounded mb-2"
                v-for="logType in logTypes"
                :key="logType.value"
            >
                <div class="grid grid-cols-3">
                    <span class="font-bold">{{ logType.label }}</span>
                    <button
                        class="text-[#f67280] hover:text-[#cb4654] active:text-[#9d3943] text-white text-sm font-bold py-2 px-4 rounded"
                        @click="openDeleteLogTypeDialog(logType.value)"
                    >
                        Delete
                    </button>
                    <button
                        class="bg-[#665687] hover:bg-[#331268] active:bg-[#190933] transition-[background-color] text-white text-sm font-bold py-2 px-4 rounded"
                        @click="openUpdateLogTypeDialog(logType.value)"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
        <div
            v-else
            class="p-4 grid place-content-center bg-emerald-50 rounded border-b-gray-300 text-neutral-500 text-sm"
        >
            Create your own log type below
        </div>
        <div class="divider mt-4 mb-4 bg-gray-100 rounded"></div>
        <FormKit
            type="form"
            :id="formId"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Log"
            @submit="submitHandler"
            :actions="false"
            incomplete-message=""
        >
            <div class="grid grid-rows-2 add-log-type-form">
                <FormKit
                    type="text"
                    placeholder="Add Log Type"
                    name="description"
                />
                <button
                    class="bg-[#665687] hover:bg-[#331268] active:bg-[#190933] transition-[background-color] text-white text-sm font-bold py-2 px-4 rounded"
                >
                    Add
                </button>
            </div>
        </FormKit>

        <!--Update Log Type-->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="openUpdateModal" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div
                                class="modal-header font-bold uppercase text-gray-600 text-2xl"
                            >
                                <slot name="header">Update Log Type</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    <UpdateLogTypeForm
                                        :logType="logType"
                                        ref="updateLogTypeForm"
                                    ></UpdateLogTypeForm>
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button
                                        class="custom-button-no-fill py-2 px-4 rounded font-bold"
                                        @click="cancelUpdate(logType.value)"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        class="custom-button py-2 px-4 rounded font-bold"
                                        @click="confirmUpdate(logType.value)"
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

        <!--Delete Log Type-->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="openDeleteModal" class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div
                                class="modal-header font-bold uppercase text-gray-600 text-2xl"
                            >
                                <slot name="header">Delete Log Type</slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    <p>
                                        Are you sure you want to delete
                                        <b>{{ logType.description }}?</b>
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
import { logTypeApi } from "@/api/log-type.api"
import { createToaster } from "@meforma/vue-toaster"
import UpdateLogTypeForm from "@/components/UpdateLogTypeForm.vue"
const toaster = createToaster()

export default {
    components: { UpdateLogTypeForm },
    created() {
        this.formId = this.makeId()
    },
    async mounted() {
        await this.getLogTypes()
        this.node = this.$formkit.get(this.formId)
    },
    data() {
        return {
            submitted: false,
            node: undefined,
            formId: null,
            logTypes: [],
            logType: Object,
            openUpdateModal: false,
            openDeleteModal: false,
            noUserLogTypesFound: true,
        }
    },
    methods: {
        async submitHandler() {
            if (!this.node.context.state.valid) {
                this.node.submit()
                return false
            }

            await this.addLogType()
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
        async getLogTypes() {
            this.logTypes = (await logTypeApi.getLogTypes()).data
            for (const logType of this.logTypes) {
                if (logType.createdBy === "user") {
                    this.noUserLogTypesFound = false
                }
            }
        },
        async openUpdateLogTypeDialog(_id) {
            await this.getLogType(_id)
        },
        async openDeleteLogTypeDialog(_id) {
            try {
                this.logType = (await logTypeApi.getLogType(_id)).data
                this.openDeleteModal = true
            } catch (error) {
                toaster.error(error.message)
            }
        },
        async getLogType(_id) {
            try {
                this.logType = (await logTypeApi.getLogType(_id)).data
                this.openUpdateModal = true
            } catch (error) {
                toaster.error(error.message)
            }
        },
        cancelDelete() {
            this.openDeleteModal = false
        },
        async confirmDelete(_id) {
            try {
                const response = await logTypeApi.deleteLogType(_id)
                if (response.data) {
                    this.openDeleteModal = false
                    toaster.success("Log Type deleted")
                    this.$emit("reloadLogTypes")
                }
            } catch (error) {
                toaster.error(error.message)
            }
        },
        cancelUpdate() {
            this.openUpdateModal = false
        },
        async confirmUpdate(_id) {
            try {
                const response = await logTypeApi.updateLogType({
                    _id: this.logType._id,
                    description: this.$formkit.get(this.formId).value
                        .description,
                })
                if (response.data) {
                    this.openDeleteModal = false
                    toaster.success("Log Type updated")
                    this.$emit("reloadLogTypes")
                }
            } catch (error) {
                toaster.error(error.message)
            }
        },
        async addLogType() {
            try {
                const response = await logTypeApi.createLogType({
                    description: this.$formkit.get(this.formId).value
                        .description,
                })
                if (response.data) {
                    toaster.success("Log Type created")
                    await this.getLogTypes()
                    this.$formkit.get(this.formId).reset()
                }
            } catch (error) {
                toaster.error(error.message)
            }
        },
    },
}
</script>

<style scoped>
.log-type {
    border: 2px solid #eeeeee;
}

.log-type > div {
    grid-template-columns: 1fr min-content min-content;
    grid-gap: 1rem;
}

.log-type > div > span {
    align-self: center;
}

.divider {
    width: 100%;
    height: 2px;
}

.add-log-type-form {
    grid-template-rows: auto min-content;
}

.add-log-type-form > .formkit-outer {
    margin-bottom: 0;
}
</style>
