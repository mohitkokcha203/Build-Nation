import React from "react";
import "./cart.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import CartProduct from "../cartProduct/CartProduct";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";

function Cart({ onclose }) {
  const cart = useSelector((state) => state.cartSliceReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const isCartEmpty = cart.length === 0;

  return (
    <div className="cart">
      <div className="overlay" onClick={onclose}></div>
      <div className="cart-content">
        <div className="header">
          <h3 className="heading-text">Shoping Cart</h3>
          <div className="close-btn center" onClick={onclose}>
            <AiFillCloseCircle /> Close
          </div>
        </div>
        <div className="cartdetail">
          <div className="cartitem">
            {cart.map((item) => (
              <CartProduct key={item._id} cartProduct={item} />
            ))}
          </div>
          {isCartEmpty && (
            <div className="empty-cart-info">
              <div className="icon">
                <BsCartX />
              </div>
              <h4>Cart is Empty</h4>
            </div>
          )}
          {!isCartEmpty && (
            <div className="cartinfo">
              <div className="totalamount">
                <h4 className="total">Total :</h4>
                <h4 className="amount">₹ {totalAmount}</h4>
              </div>
              <div>Checkout Now</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
