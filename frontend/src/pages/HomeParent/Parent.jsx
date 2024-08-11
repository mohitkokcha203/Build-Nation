import React, { useEffect } from "react";
import { fetchData } from "../../REDUX/SLICES/ProductSlice";
import { fetchAllProduct } from "../../REDUX/SLICES/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../../components/NAVBAR/Navbar";
import Footer from "../footer/Footer";
import "./parent.scss";
export default function Parent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchAllProduct());
  }, []);
  return (
    <div className="homeParent">
      <Navbar />
      <div className="allpages">
        <Outlet />
      </div>
    </div>
  );
}
