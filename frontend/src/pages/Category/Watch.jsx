import React, { useEffect } from "react";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
function Watch() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const WatchProducts = useSelector((state) => state.categoryReducer?.Watch);
  return (
    <div className="WatchParent categoryList container">
      <div className="HproductDEX DEX  ">
        <div className="allProductsDEX ">
          {WatchProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;
