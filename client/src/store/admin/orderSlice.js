import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderDetails: null,
  orderList: [],
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/order/getorders"
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getDetails",
  async (currentOrderId) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/getorder-detail/${currentOrderId}`
    );
    return response?.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateStatus",
  async ({ currentOrderId, status }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/order/update-status/${currentOrderId}`,
      { orderStatus: status }
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
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default adminOrderSlice.reducer;
