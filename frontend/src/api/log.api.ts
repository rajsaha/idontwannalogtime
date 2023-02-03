import axios, { type AxiosResponse } from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const logApi = {
    async getLogs(date: string): Promise<AxiosResponse> {
        return axios.get(`/log/at-date/${date}`, AxiosConfigConstant)
    },
    async getLog(_id: string): Promise<AxiosResponse> {
        return axios.get(`/log/${_id}`, AxiosConfigConstant)
    },
}
