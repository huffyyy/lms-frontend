import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL,
  timeout: 3000,
});

export const apiInstanceAuth = axios.create({
  baseURL,
  timeout: 3000,
});

apiInstanceAuth.interceptors.request.use((config) => {
  const session = secureLocalStorage.getItem("STRORAGE_KEY");

  if (!session) {
    return config;
  }
  config.headers.Authorization = `JWT ${session.token}`;

  return config;
});

export default apiInstance;
