import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  products: [],
};

export const addProduct = createAsyncThunk(
  "/products/new",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);
export const getAllProducts = createAsyncThunk(
  "/products/getAllProducts",
  async () => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/get"
    );

    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ formData, id }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
