import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";

const { getMachineCategories } = new CoffeeService();

export const fetchMachineCategories = createAsyncThunk(
  "productsMachine/fetchMachineCategories",
  async (page) => {
    const data = await getMachineCategories(page);
    return data;
  }
);

const initialState = {
  categories: [],
  page: "original",
  pages: [
    {
      name: "original",
      href: "",
    },
    {
      name: "vertuo",
      href: "vertuo",
    },
  ],
  status: "idle",
};

const productsMachineSlice = createSlice({
  name: "productsMachine",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachineCategories.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchMachineCategories.fulfilled, (state, action) => {
        return { ...state, status: "idle", categories: action.payload };
      })
      .addCase(fetchMachineCategories.rejected, (state) => {
        return { ...state, status: "error", categories: [] };
      });
  },
});

const { reducer, actions } = productsMachineSlice;
export default reducer;
export const { setPage } = actions;
