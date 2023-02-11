import axios, { type AxiosResponse } from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const logTypeApi = {
    async getLogTypes(): Promise<AxiosResponse> {
        return axios.get("/log-type/all", AxiosConfigConstant)
    },
    async getLogType(_id: string): Promise<AxiosResponse> {
        return axios.get(`/log-type/${_id}`, AxiosConfigConstant)
    },
    async deleteLogType(_id: string): Promise<AxiosResponse> {
        return axios.delete(`/log-type/${_id}`, AxiosConfigConstant)
    },
    async updateLogType(data: {
        _id: string
        description: string
    }): Promise<AxiosResponse> {
        return axios.patch(`/log-type`, { ...data }, AxiosConfigConstant)
    },
}
