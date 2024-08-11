import React, { useEffect } from "react";
import "./deleteProduct.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../../../REDUX/SLICES/ProductSlice";
import { axiosClient } from "../../../../UTILS/axiosClient";
import LoadingBar from "react-top-loading-bar";

function DeleteProduct() {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct({ p_id: id }));
  }, []);

  const sProduct = useSelector((state) => state.productReducer?.singleProduct);
  const status = useSelector((state) => state.productReducer?.status);

  const id = param.productid;
  async function handleDelete(e) {
    try {
      e.preventDefault();

      await axiosClient.delete(`/product/delete/${id}`);
      navigate("/dashboard");
    } catch (error) {
      Promise.reject(error);
    }
  }

  return (
    <div>
      <div className="container">
        {status === "success" && (
          <div className="sProduct">
            <div className="pimage">
              <img src={sProduct?.image?.url} alt="Not Found" />
            </div>
            <div className="pdata">
              <h3>Name : {sProduct?.title}</h3>
              <h4>₹ {sProduct?.price}</h4>
              <h4 className="oldPrice">₹ {sProduct?.old_price}</h4>
              <p className="category">Category : {sProduct?.category}</p>
              <p className="detailP">Detail : {sProduct?.description}</p>
            </div>
          </div>
        )}
        <div className="btns">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="btn cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="btn deleteBtn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
