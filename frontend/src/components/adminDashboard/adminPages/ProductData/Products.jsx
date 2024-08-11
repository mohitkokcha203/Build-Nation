import React from "react";
import "./products.scss";
import { useNavigate } from "react-router-dom";

function Products({ product }) {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="product">
        <div className="imageBox">
          <img src={product.image?.url} alt="" />
        </div>
        <div className="details">
          <h3>{product.title}</h3>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <button
            className="btn updateBtn"
            onClick={() => {
              navigate(`update/${product._id}`);
            }}
          >
            Update
          </button>
          <button
            className="btn deleteBtn"
            onClick={() => {
              navigate(`delete/${product._id}`);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
