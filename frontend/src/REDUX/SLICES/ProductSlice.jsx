import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../UTILS/axiosClient";

export const fetchData = createAsyncThunk(
  "products/fetch",
  async (_, thunkapi) => {
    try {
      thunkapi.dispatch(setLoading(true));
      const response = await axiosClient.get("/product/all");
      return response.data.result.products;
    } catch (error) {
      Promise.reject(error);
    } finally {
      thunkapi.dispatch(setLoading(false));
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/single",
  async (body, thunkapi) => {
    try {
      thunkapi.dispatch(setLoading(true));
      const response = await axiosClient.post("/product/single", body);

      return response.data.result.product;
    } catch (error) {
      Promise.reject(error);
    } finally {
      thunkapi.dispatch(setLoading(false));
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "product/create",
  async (body, thunkapi) => {
    try {
      thunkapi.dispatch(setLoading(true));
      const response = await axiosClient.post("/product/create", body);
      return response.data.result.product;
    } catch (error) {
      Promise.reject(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (body, thunkapi) => {
    try {
      thunkapi.dispatch(setLoading(true));
      const response = await axiosClient.put("/product/update", body);

      return response.data.result.product;
    } catch (error) {
      Promise.reject(error);
    } finally {
      thunkapi.dispatch(setLoading(false));
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    product: [],
    singleProduct: {},
    status: "idle",
    error: null,
    isLoading: false,
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.status = "success";
      });
  },
});

export default productSlice.reducer;
export const { setLoading } = productSlice.actions;
