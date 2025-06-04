
import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (page, thunkAPI) => {
    console.log("page", page)
    try {
      const response = await api.get(`/user/all/all?page=${page}`);
      console.log(response.data)
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch subscribed users
export const getAllSubscribers = createAsyncThunk(
  "user/getSubscribedUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/subscribed/all?page=${page}`);
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch subscribed users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getActiveSubscribers = createAsyncThunk(
  "user/getSubscribedUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/subscribed/active?page=${page}`);
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch active subscriber";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getExpiredSubscribers = createAsyncThunk(
  "user/getSubscribedUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/subscribed/expired?page=${page}`);
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch expires subscriber";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserAdminStatus = createAsyncThunk(
  "user/updateAdminStatus",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await api.put(`/user/admin-access/${userId}`, {}, {
        headers: {"Content-Type": "application/json"}
      });
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update admin status";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const initialState = {
  users: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

        // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get subscribed users
      .addCase(getAllSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});


export default usersSlice.reducer;
