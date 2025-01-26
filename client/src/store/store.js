import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./admin/authSlice";
import adminProductsReducer from "./admin/productSlice";
import shoppingProductsReducer from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shoppingAddressSlice from "./shop/addressSlice";
import shoppingOrderSlice from "./shop/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shoppingProductsReducer,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
    shopOrder: shoppingOrderSlice,
  },
});

export default store;
