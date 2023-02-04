import axios, { type AxiosResponse } from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const logApi = {
    async getLogs(date: string): Promise<AxiosResponse> {
        return axios.get(`/log/at-date/${date}`, AxiosConfigConstant)
    },
    async getLog(_id: string): Promise<AxiosResponse> {
        return axios.get(`/log/${_id}`, AxiosConfigConstant)
    },
    async createLog(data: {
        workedOn: string
        timeSpentInPlainEnglish: string
        logType: string
        date: string
    }): Promise<AxiosResponse> {
        return axios.post(`/log`, { ...data }, AxiosConfigConstant)
    },
    async updateLog(data: {
        _id: string,
        workedOn: string
        timeSpentInPlainEnglish: string
        logType: string
        date: string
    }): Promise<AxiosResponse> {
        return axios.patch(`/log`, { ...data }, AxiosConfigConstant)
    },
    async deleteLog(_id: string): Promise<AxiosResponse> {
        return axios.delete(`/log/${_id}`, AxiosConfigConstant)
    }
}
