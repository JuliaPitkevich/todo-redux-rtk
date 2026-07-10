import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../helpers/token";
import { authApi } from "../../api/authApi";

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (userData, thunkAPI) => {
    try {
      const apiFunc = userData.name ? authApi.register : authApi.login;
      const data = await apiFunc(userData);

      token.set(data.access_token);

      const userName = userData.name || (await authApi.getUser()).name;

      return userName;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: "",
    serverError: null,
    isLoading: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.serverError = null;
    },
    resetAuth: (state) => {
      state.userName = "";
      state.serverError = null;
      state.isLoading = false;
      token.remove();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
        state.serverError = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userName = action.payload;
        state.serverError = null;
        state.isLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.serverError = action.payload;
        token.remove();
        state.isLoading = false;
      });
  },
});

export const { clearErrors, resetAuth } = authSlice.actions;
export default authSlice.reducer;
