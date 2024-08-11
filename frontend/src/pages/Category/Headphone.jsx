import React, { useEffect } from "react";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
import LoadingBar from "react-top-loading-bar";

function Headphone() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const headphoneProducts = useSelector(
    (state) => state.categoryReducer?.Headphone
  );
  const load = useSelector((state) => state.categoryReducer?.isLoading);
  return (
    <div className="headphoneParent categoryList  container">
      <div className="HproductDEX ">
        <div className="allProductsDEX ">
          {headphoneProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Headphone;
