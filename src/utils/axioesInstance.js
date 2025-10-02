import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // send cookies if needed
  headers: {
    "Content-Type": "application/json",
    "x-gp-name": import.meta.env.VITE_GP_NAME, // custom header for GP

  },
});

export default axiosInstance;
