import axios from "axios"

export const authApi = {
    sessionHealth(): Promise<{ success: boolean }> {
        return axios.get("/auth/session/health", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            responseType: "json",
            baseURL: "http://localhost:3001",
        })
    },
    login(email: string, password: string): Promise<{ access_token: string }> {
        return axios.post(
            "/auth/login",
            { email, password },
            { responseType: "json", baseURL: "http://localhost:3001" }
        )
    },
    signup(email: string, password: string): Promise<any> {
        return axios.post("/auth/signup")
    },
}
