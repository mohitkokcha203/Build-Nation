import React, { useEffect } from "react";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
function Gadgets() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const GadgetsProducts = useSelector(
    (state) => state.categoryReducer?.Gadgets
  );
  return (
    <div className="GadgetsParent categoryList container">
      <div className="HproductDEX">
        <div className="allProductsDEX ">
          {GadgetsProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gadgets;
