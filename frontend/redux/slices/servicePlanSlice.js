import api from '@/lib/client-axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch all service plans
export const fetchServicePlans = createAsyncThunk(
  'servicePlan/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/service-plans/');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const servicePlanSlice = createSlice({
  name: 'servicePlan',
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add sync reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchServicePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch service plans';
      });
  },
});

export default servicePlanSlice.reducer;
