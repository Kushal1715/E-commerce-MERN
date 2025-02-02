import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchProducts: [],
};

export const searchProduct = createAsyncThunk(
  "/search/products",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/search/get/${keyword}`
    );

    return response?.data;
  }
);

const searchSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {
    resetSearchProducts: (state) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchProducts = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.searchProducts = [];
      });
  },
});

export default searchSlice.reducer;
export const { resetSearchProducts } = searchSlice.actions;
