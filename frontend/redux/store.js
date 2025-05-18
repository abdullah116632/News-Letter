import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import blogReducer from './slices/blogSlice';
import modalReducer from "./slices/modalSlice"

export const store = configureStore({
    reducer: {
    userData: userReducer,
    blogData: blogReducer,
    modal: modalReducer,
  },
})
