import axios, { type AxiosResponse } from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const userApi = {
    async updatePassword(data: {
        password: string
        newPassword: string
        confirmNewPassword: string
    }): Promise<AxiosResponse> {
        return axios.patch(
            "/user/update-password",
            { ...data },
            AxiosConfigConstant
        )
    },
}
