import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todosApi } from "../../api/todosApi";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (completed, thunkAPI) => {
    try {
      return await todosApi.getAll(completed);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData, thunkAPI) => {
    try {
      return await todosApi.create(todoData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todoData }, thunkAPI) => {
    try {
      return await todosApi.update(id, todoData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      await todosApi.delete(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteAllTodos = createAsyncThunk(
  "todos/deleteAllTodos",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const tasks = state.todos.tasks;

      await Promise.all(tasks.map((task) => todosApi.delete(task.id)));

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id, thunkAPI) => {
    try {
      return await todosApi.toggleComplete(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    tasks: [],
    filter: "all",
    serverError: null,
    isLoading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearErrors: (state) => {
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
        state.serverError = null;
        state.isLoading = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteAllTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.serverError = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.serverError = action.payload;
        },
      );
  },
});

export const { setFilter, clearErrors } = todosSlice.actions;
export default todosSlice.reducer;
