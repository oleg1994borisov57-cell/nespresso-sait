import { configureStore } from "@reduxjs/toolkit";
import shopFilter from "../slices/shopFilterSlice";
import productList from "../slices/productListSlice";
import menu from "../slices/menuSlice";
import cart from "../slices/cartSlice";
import alert from "../slices/alertSlice";
import productsMachine from "../slices/productsMachineSlice";
import about from "../slices/aboutSlice";
import accesories from "../slices/accesoriesSlice";
import exclusiveProducts from "../slices/exclusiveProductsSlice";

const store = configureStore({
  reducer: {
    shopFilter,
    productList,
    menu,
    cart,
    alert,
    productsMachine,
    about,
    accesories,
    exclusiveProducts,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
