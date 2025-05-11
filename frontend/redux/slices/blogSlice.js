
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBlogsSuccess: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
    },
    fetchBlogsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } = blogSlice.actions;
export default blogSlice.reducer;
