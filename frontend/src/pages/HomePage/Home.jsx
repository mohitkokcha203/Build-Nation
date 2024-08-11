import React, { useEffect, useState } from "react";
import "./home.scss";
import { useSelector } from "react-redux";
import Hero from "../../components/HERO/Hero";
import LoadingBar from "react-top-loading-bar";
import SingleProduct from "../../components/SingleProd/SingleProduct";
import Footer from "../footer/Footer";

const Home = () => {
  const status = useSelector((state) => state.productReducer.error);
  const load = useSelector((state) => state.productReducer.isLoading);
  const topProducts = useSelector(
    (state) => state.categoryReducer?.AllProducts
  );

  if (status === "failed") {
    return (
      <div className="flexCenter nn">
        <h2>Opps Something Went Wrong!!! try again</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="homeBoxx">
      {load && (
        <LoadingBar
          color="red"
          progress={90}
          loaderSpeed={2000}
          waitingTime={2000}
          height={4}
        />
      )}
      <Hero />

      <div className="Hproduct container">
        <h2 className="topText ">Top Products </h2>
        <div className="allProducts ">
          {topProducts?.map((item) => (
            <SingleProduct key={item._id} product={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
