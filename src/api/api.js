import { token } from "../helpers/token";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://todo-redev.onrender.com";

const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(token.get() && { Authorization: `Bearer ${token.get()}` }),
});

const getRequest = async (endpointURL, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpointURL}`, options);
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      token.remove();
      window.location.href = "/auth";
    }
    throw new Error(data.message || `Error ${response.status}`);
  }
  return data;
};

export const apiClient = {
  get: (endpointURL) => getRequest(endpointURL, { headers: getHeaders() }),
  post: (endpointURL, body) =>
    getRequest(endpointURL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }),
  patch: (endpointURL, body) =>
    getRequest(endpointURL, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }),
  delete: (endpointURL) =>
    getRequest(endpointURL, {
      method: "DELETE",
      headers: getHeaders(),
    }),
};
