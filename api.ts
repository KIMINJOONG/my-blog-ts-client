import axios from "axios";
import jsCookie from "js-cookie";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "http://54.238.2.249"
    : "http://localhost:4000",
  withCredentials: true,
});

const makeHeader = async () => {
  const token = await jsCookie.get("token");
  api.defaults.headers.Authorization = token ? `token=${token}` : "";
};

export default {
  join: async (path: string, data: any) => {
    try {
      makeHeader();
      const result = await api.post(path, data);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  login: async (path: string, data: any) => {
    try {
      makeHeader();
      const result = await api.post(path, data);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  getMe: async () => {
    try {
      makeHeader();
      const result = await api.get("/users/me");
      return result;
    } catch (error) {
      return error.response;
    }
  },
  index: async (path: string) => {
    try {
      makeHeader();
      const result = await api.get(path);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  show: async (path: string) => {
    try {
      makeHeader();
      const result = await api.get(path);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  create: async (path: string, data: any) => {
    try {
      makeHeader();
      const token = await jsCookie.get("token");
      api.defaults.headers.Authorization = token ? `token=${token}` : "";
      const result = await api.post(path, data);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  update: async (path: string, data: any) => {
    try {
      makeHeader();
      const result = await api.put(path, data);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  destroy: async (path: string) => {
    try {
      makeHeader();
      const result = await api.delete(path);
      return result;
    } catch (error) {
      return error.response;
    }
  },
};
