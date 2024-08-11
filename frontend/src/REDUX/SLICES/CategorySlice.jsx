import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../UTILS/axiosClient";

export const fetchAllProduct = createAsyncThunk(
  "products/all",
  async (_, thunkapi) => {
    try {
      thunkapi.dispatch(setLoading(true));
      const response = await axiosClient.get("product/all");
      return response.data.result.products;
    } catch (error) {
      Promise.reject(error);
    } finally {
      thunkapi.dispatch(setLoading(false));
    }
  }
);
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    AllProducts: [],
    MotherBoard: [],
    Disk: [],
    Memory: [],
    GraphicCard: [],
    Processor: [],
    isLoading: false,
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: function (builder) {
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.AllProducts = action.payload;

      state.Headphone = state.AllProducts.filter(
        (item) => item.category === "MotherBoard"
      );
      state.Watch = state.AllProducts.filter(
        (item) => item.category === "Disk"
      );
      state.Camera = state.AllProducts.filter(
        (item) => item.category === "Memory"
      );
      state.VRHeadset = state.AllProducts.filter(
        (item) => item.category === "GraphicCard"
      );
      state.Gadgets = state.AllProducts.filter(
        (item) => item.category === "Processor"
      );
      state.AllProducts = state.AllProducts.filter(
        (item) => item.topPic === true
      );
    });
  },
});

export default categorySlice.reducer;
export const { setLoading } = categorySlice.actions;
