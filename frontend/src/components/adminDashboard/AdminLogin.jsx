import React, { useState } from "react";
import "./adminlogin.scss";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../UTILS/axiosClient";
import { KEY_ACCESS_TOKEN, setKey } from "../../UTILS/localStorage";
function AdminLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleClick(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/user/admin", {
        email,
        password,
      });
      setKey(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      navigate("/dashboard");
      console.log("ADMIN LOgin response is ===>>>", response);
    } catch (err) {
      console.log("ADMIN Error in login =>>>>>>", err);
    }
  }

  return (
    <div className="parentBoxx">
      <div className="container parent">
        <div className="main">
          <input type="checkbox" id="chk" />
          <div className="login">
            <form>
              <label id="head" htmlFor="chk">
                Admin
              </label>
              <input
                className="inputs"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                className="inputs"
                type="password"
                placeholder="password"
                required=""
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <button id="Lbutton" onClick={handleClick}>
                Login➡
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
