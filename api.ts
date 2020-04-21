import axios from "axios";
import jsCookie from "js-cookie";

const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        Authorization: jsCookie.get("token") ? jsCookie.get("token") : "",
    },
    withCredentials: true,
});

export default {
    login: async (path: string, data: any) => {
        try {
            const result = await api.post(path, data);
            return result;
        } catch (error) {
            return error.response;
        }
    },
    getMe: async () => {
        try {
            const result = await api.get("/users/me");
            return result;
        } catch (error) {
            return error.response;
        }
    },
};
