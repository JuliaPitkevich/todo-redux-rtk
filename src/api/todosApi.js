import { apiClient } from "./api";

export const todosApi = {
  getAll: (completed) =>
    apiClient.get(
      completed !== undefined ? `/todos?completed=${completed}` : "/todos",
    ),

  getOne: (id) => apiClient.get(`/todos/${id}`),

  create: (todoData) => apiClient.post("/todos", todoData),

  update: (id, todoData) => apiClient.patch(`/todos/${id}`, todoData),

  delete: (id) => apiClient.delete(`/todos/${id}`),

  toggleComplete: (id) => apiClient.patch(`/todos/${id}/toggle`),
};
