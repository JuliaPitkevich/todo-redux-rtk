import { apiClient } from "./api";

export const authApi = {
  login: (userData) => apiClient.post("/auth/login", userData),
  register: (userData) => apiClient.post("/auth/register", userData),
  getUser: () => apiClient.get("/auth/me"),
};
