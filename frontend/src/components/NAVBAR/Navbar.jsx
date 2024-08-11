import React, { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { axiosClient } from "../../UTILS/axiosClient";
import { BsFillCartCheckFill } from "react-icons/bs";
import Cart from "../../pages/cart/Cart";
import { useSelector } from "react-redux";
import { removeKey, KEY_ACCESS_TOKEN } from "../../UTILS/localStorage";
import { RxHamburgerMenu } from "react-icons/rx";
function Navbar() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartSliceReducer.cart);
  let totalItem = 0;
  cart.forEach((item) => (totalItem += item.quantity));

  const [openCart, setopenCart] = useState(false);
  async function handleLogout() {
    try {
      await axiosClient.post("/user/logout");
      removeKey(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (err) {
      Promise.reject(err);
    }
  }
  return (
    <div>
      <div id="navbar">
        <div className="nav-left Nflex">
          <div className="logo"></div>
          <h1
            className="logoname"
            onClick={() => {
              navigate("/");
            }}
          >
            Build<span className="Wname">N</span>ation
          </h1>
          <ul className="Nflex Nlist">
            <li>
              <Link className="CategoryLink" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="CategoryLink" to="/category/headphone">
                Motherboard
              </Link>
            </li>
            <li>
              <Link className="CategoryLink" to="/category/watch">
                Disk
              </Link>
            </li>
            <li>
              <Link className="CategoryLink" to="/category/camera">
                Memory
              </Link>
            </li>
            <li>
              <Link className="CategoryLink" to="/category/vr-headset">
                Graphic Card
              </Link>
            </li>
            <li>
              <Link className="CategoryLink" to="/category/gadgets">
                Processor
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="Hambutton">
            <RxHamburgerMenu />
          </div>
          <div className="cart" onClick={() => setopenCart(!openCart)}>
            <BsFillCartCheckFill className="cart-icon" />
            <span className="item-count flexCenter">{totalItem}</span>
          </div>
          <MdOutlineLogout className="logoutBtn" onClick={handleLogout} />
        </div>
      </div>
      {openCart && <Cart onclose={() => setopenCart(false)} />}
    </div>
  );
}

export default Navbar;
