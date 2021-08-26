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
  getProducts() {
    return apiClient.get("/api/products");
  },
  getProduct(code) {
    return apiClient.get(`/api/products/${code}`);
  },
  deleteProduct(code) {
    return apiClient.delete(`/api/products/${code}`);
  },
  createProduct(product) {
    return apiClient.post("/api/products", product);
  },
  updateProduct(code, product) {
    return apiClient.put(`/api/products/${code}`, product);
  },
  getReviews(code) {
    return apiClient.get(`/api/products/${code}/reviews`);
  },
};
