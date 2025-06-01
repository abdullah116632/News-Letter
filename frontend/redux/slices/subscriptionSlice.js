
import api from '@/lib/client-axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch user's subscription
export const fetchSubscription = createAsyncThunk(
  'subscription/fetchSubscription',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/payment/check'); // Adjust route if needed
    //   console.log(res.data.data)
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch subscription');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    clearSubscription(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
