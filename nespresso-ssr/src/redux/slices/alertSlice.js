import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  title: "",
  isOpen: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    handleOpen: (state, action) => {
      const { message, title } = action.payload;

      state.isOpen = true;
      state.message = message;
      state.title = title;
    },
    handleClose: (state) => {
      state.isOpen = false;
    },
  },
});

const { reducer, actions } = alertSlice;

export default reducer;
export const { handleClose, handleOpen } = actions;
