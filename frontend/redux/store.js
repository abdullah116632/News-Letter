import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import blogReducer from './slices/blogSlice';
import modalReducer from "./slices/modalSlice";
import reviewSlice from "./slices/reviewSlice";

export const store = configureStore({
    reducer: {
    authData: authReducer,
    usersData: usersReducer,
    blogData: blogReducer,
    modal: modalReducer,
    reviewData: reviewSlice
  },
})
