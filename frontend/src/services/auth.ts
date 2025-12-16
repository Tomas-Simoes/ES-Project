import { api } from "../axios";


export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await api.post("/api/auth/login", payload);
  return res.data; 
}