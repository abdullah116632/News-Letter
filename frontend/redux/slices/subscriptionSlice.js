import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchActiveSubscription = createAsyncThunk(
  "subscription/fetchActive",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/subscription/active", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

export const subscribeUser = createAsyncThunk(
  "subscription/subscribe",
  async ({ price, servicePlanId }, thunkAPI) => {
    try {
      const res = await api.post(
        "/subscription/subscribe",
        { price, servicePlanId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.url; // redirect URL
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Subscription failed"
      );
    }
  }
);

export const updatePackageWithCharge = createAsyncThunk(
  "subscription/updateWithCharge",
  async ({ price, servicePlanId, subscriptionId }, thunkAPI) => {
    try {
      const res = await api.post(
        `/subscription/update-package/with-charge/${subscriptionId}`,
        { price, servicePlanId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.url;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

export const updatePackageForFree = createAsyncThunk(
  "subscription/updateFree",
  async ({ subscriptionId, servicePlanId }, thunkAPI) => {
    console.log("slice",subscriptionId, servicePlanId)
    try {
      const res = await api.patch(
        `/subscription/update-package/free/${subscriptionId}`,
        { servicePlanId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    data: null,
    loading: false,
    error: null,
    redirectUrl: null,
  },
  reducers: {
    clearSubscriptionState: (state) => {
      state.error = null;
      state.redirectUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchActiveSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.redirectUrl = action.payload;
      })
      .addCase(subscribeUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updatePackageWithCharge.fulfilled, (state, action) => {
        state.redirectUrl = action.payload;
      })
      .addCase(updatePackageWithCharge.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updatePackageForFree.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updatePackageForFree.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
