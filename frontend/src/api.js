import axios from "axios";

const API = axios.create({
  baseURL: (import.meta.env.NODE_ENV === "production") ? import.meta.env.VITE_API_URL : "http://localhost:8080",
  withCredentials: true,
});

export default API;
