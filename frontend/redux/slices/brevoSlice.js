import api from "@/lib/client-axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Add to Brevo
export const addUserToBrevo = createAsyncThunk(
  "brevo/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brevo/add`,
        { user },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Add failed");
    }
  }
);

// Remove from Brevo
export const removeUserFromBrevo = createAsyncThunk(
  "brevo/removeUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brevo/remove`,
        { user },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Remove failed");
    }
  }
);


const brevoSlice = createSlice({
  name: "brevo",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addUserToBrevo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserToBrevo.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addUserToBrevo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove
      .addCase(removeUserFromBrevo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserFromBrevo.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(removeUserFromBrevo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brevoSlice.reducer;
