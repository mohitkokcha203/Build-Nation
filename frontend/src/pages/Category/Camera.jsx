import React, { useEffect } from "react";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
import "./motherboard.scss";
function Camera() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const CameraProducts = useSelector((state) => state.categoryReducer?.Camera);
  return (
    <div className="CameraParent categoryList container">
      <div className="motherb">
      <div className="HproductDEX DEX  ">
        <div className="allProductsDEX ">
          {CameraProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div></div>

    </div>
  );
}

export default Camera;
