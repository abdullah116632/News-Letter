import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalName: null,
  isOpen: false,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log(action)
      state.modalName = action.payload.modalName;
      state.data = action.payload.data || null;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.data = null;
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
