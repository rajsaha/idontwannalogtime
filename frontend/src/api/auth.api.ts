import axios from "axios"

export const authApi = {
    sessionHealth() {
        return axios.get("/auth/session/health", {
            headers: { Authorization: "Bearer asd" },
            responseType: "json",
            baseURL: "http://localhost:3001",
        })
    },
}
