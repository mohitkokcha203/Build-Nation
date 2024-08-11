import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./SLICES/ProductSlice";
import categoryReducer from "./SLICES/CategorySlice";
import cartSliceReducer from "./SLICES/CartSlice";
export default configureStore({
  reducer: {
    productReducer,
    categoryReducer,
    cartSliceReducer,
  },
});
