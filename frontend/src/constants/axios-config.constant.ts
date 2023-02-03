import type { RawAxiosRequestConfig } from "axios"

export const AxiosConfigConstant: RawAxiosRequestConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    responseType: "json",
    baseURL: import.meta.env.VITE_API_BASE_URL,
}
