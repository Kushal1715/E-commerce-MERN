const { createSlice } = require("@reduxjs/toolkit");

const initialValue = {
  isLoading: false,
  products: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default shoppingProductSlice.reducer;
