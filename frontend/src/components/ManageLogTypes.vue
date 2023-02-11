<template>
    <div>
        <h1 class="font-bold text-2xl uppercase mb-4">Manage Log Types</h1>
        <div class="list-of-log-types mb-4">
            <div
                class="log-type p-4 rounded mb-2"
                v-for="logType in logTypes"
                :key="logType.value"
            >
                <div class="grid grid-cols-3">
                    <span class="font-bold">{{ logType.label }}</span>
                    <button
                        class="text-[#f67280] hover:text-[#cb4654] active:text-[#9d3943] text-white text-sm font-bold py-2 px-4 rounded"
                        @click="openDeleteLogTypeDialog"
                    >
                        Delete
                    </button>
                    <button
                        class="bg-[#665687] hover:bg-[#331268] active:bg-[#190933] transition-[background-color] text-white text-sm font-bold py-2 px-4 rounded"
                        @click="openUpdateLogTypeDialog"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
        <FormKit
            type="form"
            :id="formId"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Log"
            @submit="submitHandler"
            :actions="false"
            incomplete-message=""
        >
            <FormKit
                type="text"
                placeholder="Add Log Type"
                name="logType"
                validation="required"
                :validation-messages="{
                    required: 'Required',
                }"
            />
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
                                    <FormKit
                                        type="form"
                                        :id="updateLogTypeFormId"
                                        :form-class="
                                            updateLogTypeSubmitted
                                                ? 'hide'
                                                : 'show'
                                        "
                                        submit-label="Log"
                                        @submit="submitUpdateLogTypeHandler"
                                        :actions="false"
                                        incomplete-message=""
                                    >
                                        <FormKit
                                            type="text"
                                            placeholder="Update Log Type"
                                            name="logType"
                                            validation="required"
                                            :validation-messages="{
                                                required: 'Required',
                                            }"
                                        />
                                    </FormKit>
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
                                        <b>{{ logType.label }}?</b>
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
const toaster = createToaster()

export default {
    created() {
        this.formId = this.makeId()
        this.updateLogTypeFormId = this.makeId()
    },
    async mounted() {
        await this.getLogTypes()
        this.node = this.$formkit.get(this.formId)
        this.updateLogTypeNode = this.$formkit.get(this.updateLogTypeFormId)
    },
    data() {
        return {
            submitted: false,
            updateLogTypeSubmitted: false,
            node: undefined,
            updateLogTypeNode: undefined,
            formId: null,
            updateLogTypeFormId: null,
            logTypes: [],
            logType: Object,
            openUpdateModal: false,
            openDeleteModal: false,
        }
    },
    methods: {
        async submitHandler() {
            if (!this.node.context.state.valid) {
                this.node.submit()
                return false
            }

            return this.node.value
        },
        async submitUpdateLogTypeHandler() {
            if (!this.updateLogTypeNode.context.state.valid) {
                this.updateLogTypeNode.submit()
                return false
            }

            return this.updateLogTypeNode.value
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
        },
        async openUpdateLogTypeDialog() {
            await this.getLogType()
        },
        async openDeleteLogTypeDialog() {
            this.openDeleteModal = true
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
                const response = await logTypeApi.deleteLogType(_id)
                if (response.data) {
                    this.openDeleteModal = false
                    toaster.success("Log Type updated")
                    this.$emit("reloadLogTypes")
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
</style>
