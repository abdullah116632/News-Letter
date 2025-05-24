const { default: api } = require("@/lib/client-axios");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchAllReview = createAsyncThunk("review/fetchAllReview", async (page = 1, thunkAPI) => {
    try{
        const res = await api.get(`/review?${page}`, {
            headers: {"Content-Type": "application/json"}
        })
        return res.data.data.reviews;
    }catch(err){
        const msg = err.response?.data?.message || err.message || "review data fetch failed";
        return thunkAPI.rejectWithValue(msg);
    }
})

export const deleteReview = createAsyncThunk("review/deleteReview", async (reviewId, thunkAPI) => {
    try{
        const res = await api.delete(`/review/${reviewId}`, {
            headers: {"Content-Type": "application/json"}
        })
        return reviewId;
    }catch(error){
        const msg = err.response?.data?.message || err.message || "review delete failed";
        return thunkAPI.rejectWithValue(msg);
    }
})

export const createReview = createAsyncThunk("review/createReview", async (data, thunkAPI) => {
    try{
        const res = await api.post("/review", data, {
            headers: {"Content-Type": "application/json"}
        })
        return res.data.data.review;
    }catch(error){
        const msg = err.response?.data?.message || err.message || "review crate failed";
        return thunkAPI.rejectWithValue(msg);
    }
})

const initialState = {
    reviews: [],
    loading: false,
    error: null
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReview.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAllReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchAllReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.page;
            })


            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter(review => review._id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.page;
            })

            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = [action.payload, ...state.reviews];
            })
            .addCase(createReview.rejected, (state, aciton) => {
                state.loading = false;
                state.error = aciton.payload;
            })
    }
})

export default reviewSlice.reducer;