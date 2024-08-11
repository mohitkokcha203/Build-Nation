import React, { useEffect } from "react";
import "./homeAdmin.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../REDUX/SLICES/ProductSlice";
import Products from "../ProductData/Products";
import { fetchAllProduct } from "../../../../REDUX/SLICES/CategorySlice";
function HomeAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchAllProduct());
  }, []);
  const products = useSelector((state) => state.productReducer?.product);

  return (
    <div className="container">
      <div className="allProducts">
        {products?.map((item) => (
          <Products key={item.product_id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default HomeAdmin;
