import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";

const { getAccessoryCategories } = new CoffeeService();

export const fetchAccesoriesCategories = createAsyncThunk(
  "accesories/fetchAccesoriesCategories",
  async () => {
    const data = await getAccessoryCategories();
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

const accesoriesSlice = createSlice({
  name: "accesories",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccesoriesCategories.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchAccesoriesCategories.fulfilled, (state, action) => {
        return { ...state, status: "idle", categories: action.payload };
      })
      .addCase(fetchAccesoriesCategories.rejected, (state) => {
        return { ...state, status: "error", categories: [] };
      });
  },
});

const { reducer, actions } = accesoriesSlice;
export default reducer;
export const { setPage } = actions;
