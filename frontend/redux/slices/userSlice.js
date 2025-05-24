// src/features/user/userSlice.js
import api from "@/lib/client-axios";
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
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try{
    const response = await api.post("/auth/logout");
    return null;
  }catch(err){
    const message =
        err.response?.data?.message || err.message || "Logout failed";
      return thunkAPI.rejectWithValue(message);
  }
})

export const updatePassword = createAsyncThunk("user/updatePassword", async (data, thunkAPI) => {
  try{
    const response = await api.post("/auth/update-password", data, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data.message;
  }catch(error){
    const message =
        error.response?.data?.message || error.message || "update password failed";
      return thunkAPI.rejectWithValue(message);
  }
})

export const updateUserProfile = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
  try {
      const response = await api.patch("/user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Update failed";
      return thunkAPI.rejectWithValue(message);
    }
})


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
    // logoutUser: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("user");
    // },
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


      //logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export default userSlice.reducer;
