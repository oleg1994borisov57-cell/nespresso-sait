import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";

const { getSections } = new CoffeeService();

export const fetchSections = createAsyncThunk("about/getSections", async () => {
  const response = await getSections();
  return response;
});

const initialState = {
  status: "idle",
  sections: [],
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.status = "idle";
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state) => {
        state.status = "error";
      });
  },
});

const { reducer } = aboutSlice;

export default reducer;
