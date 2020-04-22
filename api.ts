import axios from "axios";
import jsCookie from "js-cookie";

const api = axios.create({
    baseURL: "http://localhost:4000",
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
            const Authorization = await jsCookie.get("token");
            const result = await api.get("/users/me", {
                params: {},
                headers: {
                    Authorization,
                },
            });
            return result;
        } catch (error) {
            return error.response;
        }
    },
};
