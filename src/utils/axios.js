// ...existing code...
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { STRORAGE_KEY } from "../utils/const";

const getEnv = () => {
  // Vite: import.meta.env.VITE_API_URL
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // CRA: process.env.REACT_APP_API_URL (guarded)
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // fallback
  return "http://localhost:3000/api";
};

const BASE_URL = getEnv();

export const apiInstance = axios.create({
  baseURL: BASE_URL
});

export const apiInstanceAuth = axios.create({
  baseURL: BASE_URL
});

// attach token only if exists
apiInstanceAuth.interceptors.request.use((config) => {
  try {
    const stored = secureLocalStorage.getItem(STRORAGE_KEY);
    const token = stored?.token ?? (typeof stored === "string" ? stored : undefined);
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`
      };
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// optional: global 401 handler
apiInstanceAuth.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        secureLocalStorage.removeItem(STRORAGE_KEY);
      } catch (e) {}
      if (typeof window !== "undefined") {
        window.location.href = "/manager/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
// ...existing code...
