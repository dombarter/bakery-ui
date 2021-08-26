import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getHours() {
    return apiClient.get("api/bakery/hours");
  },
};
