import api from "./api";
import { jwtDecode } from "jwt-decode";

// ...

export const login = async (correo, password) => {
  const res = await api.post("auth/token/", { username: correo, password });
  localStorage.setItem("token", res.data.access);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
