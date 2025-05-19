import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import blogReducer from './slices/blogSlice';
import modalReducer from "./slices/modalSlice";
import reviewSlice from "./slices/reviewSlice";

export const store = configureStore({
    reducer: {
    userData: userReducer,
    blogData: blogReducer,
    modal: modalReducer,
    reviewData: reviewSlice
  },
})
