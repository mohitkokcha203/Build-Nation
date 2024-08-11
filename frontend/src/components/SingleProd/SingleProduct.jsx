import React from "react";
import "./singleProduct.scss";
import { useNavigate } from "react-router-dom";
function SingleProduct({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="Aproduct"
        onClick={() => {
          navigate(`/productinfo/${product._id}`);
        }}
      >
        <figure>
          <img
            className="imageview "
            src={product.image?.url}
            alt="Not found"
          />
          <figcaption>{product.title}</figcaption>
        </figure>

        <p>
          <span>₹</span> {product.price}
        </p>
      </div>
    </>
  );
}

export default SingleProduct;
