import axios from "axios"

export const logApi = {
    async getLogs(date: string) {
        return axios.get(`/log/at-date/${date}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            responseType: "json",
            baseURL: import.meta.env.VITE_API_BASE_URL,
        })
    },
}
