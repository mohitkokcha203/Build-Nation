import React, { useRef, useState } from "react";
import "./createProduct.scss";
import { createNewProduct } from "../../../../REDUX/SLICES/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [old_price, setold_price] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const [topPic, settopPic] = useState("");

  const dispatch = useDispatch();
  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setimage(fileReader.result);
      }
    };
  }

  function handleProductCreation(e) {
    e.preventDefault();
    dispatch(
      createNewProduct({
        title,
        image,
        description,
        price,
        old_price,
        category,
        stock,
        topPic,
      })
    );
  }

  const load = useSelector((state) => state.productReducer?.isLoading);

  return (
    <>
      <div className="createProduct container">
        {load && (
          <LoadingBar
            color="#ff7b00"
            progress={98}
            loaderSpeed={2000}
            waitingTime={2000}
            height={4}
          />
        )}
        <div className="formData">
          <form className="productData ">
            <p className="labelText">Product Image :</p>
            <label className="labelText pImage" htmlFor="Image">
              {image && <img src={image} alt="Not Found" />}
            </label>

            <input
              type="file"
              id="Image"
              onChange={handleImgChange}
              className="inputText "
              style={{ display: "none" }}
            />

            <label className="labelText" htmlFor="Name">
              Product Name :{" "}
            </label>
            <input
              type="text"
              onChange={(e) => {
                settitle(e.target.value);
              }}
              className="inputText"
            />

            <label className="labelText" htmlFor="Description">
              Product Description
            </label>
            <textarea
              rows="5"
              cols={40}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              className="inputText"
            ></textarea>

            <label htmlFor="Price" className="labelText">
              {" "}
              Product Price :{" "}
            </label>
            <input
              type="number"
              onChange={(e) => {
                setprice(e.target.value);
              }}
              className="inputText"
            />

            <label className="labelText" htmlFor="Old Price">
              Product Old Price :{" "}
            </label>
            <input
              type="number"
              onChange={(e) => {
                setold_price(e.target.value);
              }}
              className="inputText"
            />

            <label className="labelText" htmlFor="Category">
              Product Category :{" "}
            </label>
            <input
              type="text"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              className="inputText"
            />
            <label className="labelText" htmlFor="Stock">
              Product Stock :{" "}
            </label>
            <input
              type="number"
              onChange={(e) => {
                setstock(e.target.value);
              }}
              className="inputText"
            />
            <label className="labelText" htmlFor="top">
              isTop Product :{" "}
            </label>
            <input
              type="text"
              onChange={(e) => {
                settopPic(e.target.value);
              }}
              className="inputText"
            />
            <input
              type="submit"
              className="inputText productBtn"
              value="Create Product"
              onClick={handleProductCreation}
            />
            <input
              type="submit"
              className="inputText productBtn homeBtn"
              value="Go To Home"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
