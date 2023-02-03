import axios from "axios"
import { AxiosConfigConstant } from "@/constants/axios-config.constant"

export const authApi = {
    async sessionHealth(): Promise<boolean> {
        try {
            const isHealthy = await axios.get(
                "/auth/session/health",
                AxiosConfigConstant
            )

            return isHealthy.data.success
        } catch (error) {
            return false
        }
    },
    login(email: string, password: string): Promise<{ access_token: string }> {
        return axios.post(
            "/auth/login",
            { email: email, password: password },
            { responseType: "json", baseURL: import.meta.env.VITE_API_BASE_URL }
        )
    },
    signup(email: string, password: string): Promise<any> {
        return axios.post(
            "/auth/signup",
            { email: email, password: password },
            { responseType: "json", baseURL: import.meta.env.VITE_API_BASE_URL }
        )
    },
}
