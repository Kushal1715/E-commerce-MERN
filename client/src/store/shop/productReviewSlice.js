import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/product/review",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/review/add",
      formData
    );

    return response?.data;
  }
);

const ProductReviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default ProductReviewSlice.reducer;
