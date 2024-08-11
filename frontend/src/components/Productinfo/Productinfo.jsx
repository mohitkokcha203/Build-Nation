import React, { useEffect } from "react";
import "./productinfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../REDUX/SLICES/ProductSlice";
import { useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Footer from "../../pages/footer/Footer";
import { addToCart, removeFromCart } from "../../REDUX/SLICES/CartSlice";

function Productinfo() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.productid;
  let newProduct = null;
  useEffect(() => {
    newProduct = null;
    dispatch(fetchSingleProduct({ p_id: id }));
  }, [params]);
  newProduct = useSelector((state) => state.productReducer?.singleProduct);
  const status = useSelector((state) => state.productReducer?.status);
  const cart = useSelector((state) => state.cartSliceReducer.cart);
  const quantity = cart.find((item) => item.key === id)?.quantity || 0;
  if (status === "pending") {
    return (
      <LoadingBar
        color="red"
        progress={90}
        loaderSpeed={2000}
        waitingTime={2000}
        height={4}
      />
    );
  }

  return (
    <>
      <div className="container">
        {status === "success" && (
          <div className="productInfoBox">
            <div className="Pinfo">
              <div>
                <img
                  className="Pimg"
                  src={newProduct?.image?.url}
                  alt="Not Found"
                />
              </div>
              <div className="Pdetail">
                <h2 className="Pname"> {newProduct?.title}</h2>
                <p className="Nprice">
                  <span className="Rupees">₹</span> {newProduct?.price}
                  <span className="Oprice">{newProduct?.old_price}</span>
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <b>Category : </b>
                  {newProduct?.category}
                </p>
                <p className="about">
                  {" "}
                  <b>Description :</b> {newProduct?.description}
                </p>
                <div className="cart-options">
                  <div className="quantity-selector">
                    <span
                      className="btn minus"
                      onClick={() => dispatch(removeFromCart(newProduct))}
                    >
                      -
                    </span>
                    <span className="quantity">{quantity}</span>
                    <span
                      className="btn plus"
                      onClick={() => dispatch(addToCart(newProduct))}
                    >
                      +
                    </span>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => dispatch(addToCart(newProduct))}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footerend">
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Productinfo;
