import axios from "axios";

export const api = axios.create({
  baseURL: "", //http://es-project-production.up.railway.app:3000
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) config.headers.Authorization = `Bearer ${token}`;
   return config;
});
