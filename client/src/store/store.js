import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./admin/authSlice";
import adminProductsReducer from "./admin/productSlice";
import shoppingProductsReducer from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shoppingAddressSlice from "./shop/addressSlice";
import shoppingOrderSlice from "./shop/orderSlice";
import adminOrderSlice from "./admin/orderSlice";
import shoppingSearchSlice from "./shop/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shoppingProductsReducer,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
    shopOrder: shoppingOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: shoppingSearchSlice,
  },
});

export default store;
