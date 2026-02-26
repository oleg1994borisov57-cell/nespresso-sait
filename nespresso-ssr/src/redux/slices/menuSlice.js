import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchBarOpen: false,
  isCartOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

const { reducer, actions } = menuSlice;

export default reducer;
export const { toggleSearchBar, toggleCart } = actions;
