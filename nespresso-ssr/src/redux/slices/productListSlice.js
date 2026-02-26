import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";

const { getCategories } = new CoffeeService();

const fetchCategories = createAsyncThunk(
  "productsList/fetchCategories",
  async (page) => {
    const response = await getCategories(page);
    return response;
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
    {
      name: "pro",
      href: "pro",
    },
  ],
  status: "idle",
  error: null,
};

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload
      );
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        return { ...state, status: "idle", categories: action.payload };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        if (action.error.name === "CanceledError") {
          return {
            ...state,
            status: "loading",
            error: action.payload,
          };
        } else {
          return { ...state, status: "error", error: action.payload };
        }
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = productsListSlice;

export default reducer;
export const { changePage, removeCategory, clearProducts, setCategories } =
  actions;
export { fetchCategories };
