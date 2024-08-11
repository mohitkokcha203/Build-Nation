import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { axiosClient } from "../../UTILS/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, setKey } from "../../UTILS/localStorage";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleClick(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/user/login", {
        email,
        password,
      });
      setKey(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      navigate("/");
    } catch (err) {
      Promise.reject(err);
    }
  }
  return (
    <div className="parentBox">
      <div className="container parent">
        <div className="main">
          <input type="checkbox" id="chk" />
          <div className="login">
            <form>
              <label id="head" htmlFor="chk">
                Login
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
                Login
              </button>
              <p id="new">
                Create a new account ? <Link to="/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
