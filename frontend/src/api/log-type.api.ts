import axios, { type AxiosResponse } from "axios"
import type { Dropdown } from "@/interfaces/dropdown.interface"

export const logTypeApi = {
    async getLogTypes(): Promise<AxiosResponse> {
        return axios.get("/log-type/all", {
            responseType: "json",
            baseURL: import.meta.env.VITE_API_BASE_URL,
        })
    },
}
