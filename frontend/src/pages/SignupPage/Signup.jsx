import React, { useState } from "react";
import "./signup.scss";
import { Link } from "react-router-dom";
import { axiosClient } from "../../UTILS/axiosClient";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/user/signup", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      Promise.reject(err);
    }
  }

  return (
    <div className="parentbox">
      <div className="container parent">
        <div className="main">
          <input type="checkbox" id="chk" />
          <div className="signup">
            <form action="">
              <label id="head" htmlFor="chk">
                Sign up
              </label>
              <input
                className="input"
                type="text"
                placeholder="User name"
                required=""
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                required=""
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                className="input"
                type="password"
                placeholder="password"
                required=""
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <button id="Lbutton" className="Sbutton" onClick={handleSubmit}>
                Sign up
              </button>
              <p id="new">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
