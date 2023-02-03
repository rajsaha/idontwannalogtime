import axios from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const logApi = {
    async getLogs(date: string) {
        return axios.get(`/log/at-date/${date}`, AxiosConfigConstant)
    },
    async getLog(_id: string) {
        return axios.get(`/log/${_id}`, AxiosConfigConstant)
    },
}
