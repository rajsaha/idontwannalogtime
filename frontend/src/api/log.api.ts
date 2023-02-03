import axios from "axios"

export const logApi = {
    async getLogs() {
        return axios.get("/log/at-date/2023-02-02", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            responseType: "json",
            baseURL: import.meta.env.VITE_API_BASE_URL,
        })
    },
}
