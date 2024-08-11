import React, { useEffect, useState } from "react";
import "./updateProduct.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  updateProduct,
} from "../../../../REDUX/SLICES/ProductSlice";

function UpdateProduct() {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [old_price, setold_price] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const [topPic, settopPic] = useState("");

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = param.productid;

  useEffect(() => {
    dispatch(fetchSingleProduct({ p_id: id }));
  }, []);

  const sProduct = useSelector((state) => state.productReducer?.singleProduct);

  function handlePreview(e) {
    e.preventDefault();
    settitle(sProduct?.title || "");
    setdescription(sProduct?.description || "");
    setprice(sProduct?.price || "");
    setold_price(sProduct?.old_price || "");
    setcategory(sProduct?.category || "");
    setstock(sProduct?.stock || "");
    settopPic(sProduct?.topPic || "");
  }

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

  function handleProductUpdation(e) {
    e.preventDefault();
    dispatch(
      updateProduct({
        p_id: id,
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
  return (
    <>
      <div className="updateProduct container">
        <div className="div"></div>
        <div className="formData">
          <form className="productData ">
            <p className="labelText">Product Image :</p>
            <label className="labelText pImage" htmlFor="Image">
              {image ? (
                <img src={image} alt="New" />
              ) : (
                <img src={sProduct.image?.url} alt="Preview" />
              )}
            </label>

            <input
              type="file"
              id="Image"
              onChange={handleImgChange}
              className="inputText "
              style={{ display: "none" }}
            />
            <button className="inputText productBtn " onClick={handlePreview}>
              Preview Old Data
            </button>
            <label className="labelText" htmlFor="Name">
              Product Name :{" "}
            </label>
            <input
              type="text"
              placeholder={title}
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
              placeholder={description}
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
              placeholder={price}
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
              placeholder={old_price}
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
              placeholder={category}
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
              placeholder={stock}
              onChange={(e) => {
                setstock(e.target.value);
              }}
              className="inputText"
            />
            <label className="labelText" htmlFor="top">
              isTop Product :{" "}
            </label>
            <input
              type="number"
              placeholder={topPic ? "true" : "false"}
              onChange={(e) => {
                settopPic(e.target.value);
              }}
              className="inputText"
            />
            <input
              type="submit"
              className="inputText productBtn"
              value="Update Product"
              onClick={handleProductUpdation}
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
}

export default UpdateProduct;
