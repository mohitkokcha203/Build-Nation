import React, { useEffect } from "react";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
function VRHeadset() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const VRHeadsetProducts = useSelector(
    (state) => state.categoryReducer?.VRHeadset
  );
  return (
    <div className="VRHeadsetParent categoryList container">
      <div className="HproductDEX ">
        <div className="allProductsDEX">
          {VRHeadsetProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VRHeadset;
