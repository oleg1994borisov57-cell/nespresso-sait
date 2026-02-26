import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";

const { getExclusiveCategories } = new CoffeeService();

export const fetchExclusiveCategories = createAsyncThunk(
  "exclusive/fetchExclusiveCategories",
  async () => {
    const data = await getExclusiveCategories();
    return data;
  }
);

const initialState = {
  categories: [],
  // page: "original",
  // pages: [
  //   {
  //     name: "original",
  //     icon: <OriginalPageIcon />,
  //   },
  //   {
  //     name: "vertuo",
  //     icon: <VertuoPageIcon />,
  //   },
  // ],
  status: "idle",
};

const exclusiveProductsSlice = createSlice({
  name: "exclusive",
  initialState,
  // reducers: {
  //   setPage: (state, action) => {
  //     state.page = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExclusiveCategories.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchExclusiveCategories.fulfilled, (state, action) => {
        return { ...state, status: "idle", categories: action.payload };
      })
      .addCase(fetchExclusiveCategories.rejected, (state) => {
        return { ...state, status: "error", categories: [] };
      });
  },
});

const { reducer, actions } = exclusiveProductsSlice;
export default reducer;
export const { setPage } = actions;
