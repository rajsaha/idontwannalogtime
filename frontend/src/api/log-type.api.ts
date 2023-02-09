import axios, { type AxiosResponse } from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const logTypeApi = {
    async getLogTypes(): Promise<AxiosResponse> {
        return axios.get("/log-type/all", AxiosConfigConstant)
    },
}
