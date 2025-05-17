// src/features/user/userSlice.js
import api from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signup thunk
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data.user; // return the user data
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/auth/login");
      return response.data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
