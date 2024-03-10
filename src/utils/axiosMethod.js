import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
