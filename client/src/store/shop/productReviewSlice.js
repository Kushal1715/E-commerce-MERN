import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/product/review/add",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/review/add",
      formData
    );

    return response?.data;
  }
);

export const getReview = createAsyncThunk("/getreview", async (productId) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/review/get/${productId}`
  );
  return response?.data;
});

const ProductReviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default ProductReviewSlice.reducer;
