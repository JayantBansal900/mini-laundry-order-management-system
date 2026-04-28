import axios from "axios";

const API = axios.create({
  baseURL:
    "https://laundry-management-backend.onrender.com/api"
});

export default API;