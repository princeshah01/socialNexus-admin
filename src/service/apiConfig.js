import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.137.111:3000",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Unauthorized — maybe token expired
      console.log("Unauthorized! Logging out...");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
