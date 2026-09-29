import axios from "axios";

const api = axios.create({
  baseURL: "https://consultancy-management-system-2.onrender.com/api",
});

export default api;
