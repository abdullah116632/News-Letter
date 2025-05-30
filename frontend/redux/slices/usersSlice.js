
import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/all/all?${page}`);
      console.log(response.data.data)
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch subscribed users
export const getSubscribedUsers = createAsyncThunk(
  "user/getSubscribedUsers",
  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`/user/subscribed/all?${page}`);
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch subscribed users";
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
      .addCase(getSubscribedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscribedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getSubscribedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});


export default usersSlice.reducer;
