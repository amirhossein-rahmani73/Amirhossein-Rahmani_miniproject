import axios from "axios";
import { getCookie } from "../utils/cookie";

const apiAdmin = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

apiAdmin.interceptors.request.use(
  (request) => {
    const token = getCookie();
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiAdmin;
