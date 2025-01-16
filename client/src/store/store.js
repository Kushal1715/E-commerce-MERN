import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsReducer from "./productSlice";
import shoppingProductsReducer from "./shop-product-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shoppingProductsReducer,
  },
});

export default store;
