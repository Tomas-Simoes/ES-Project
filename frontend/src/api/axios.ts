import axios from "axios";

export const api = axios.create({
  baseURL: "http://es-project-production.up.railway.app:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
