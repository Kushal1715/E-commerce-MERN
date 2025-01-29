import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderDetails: null,
  orderList: [],
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = axios.get(
      "http://localhost:5000/api/admin/order/getorders"
    );
    return response?.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload.data);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        (state.isLoading = false), (state.orderList = []);
      });
  },
});

export default adminOrderSlice.reducer;
