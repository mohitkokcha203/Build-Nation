import React from "react";
import "./admin.scss";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { MdOutlineLogout } from "react-icons/md";
import { axiosClient } from "../../UTILS/axiosClient";
import { KEY_ACCESS_TOKEN, removeKey } from "../../UTILS/localStorage";

const Admin = () => {
  const navigate = useNavigate();
  const load = useSelector((state) => state.productReducer.isLoading);

  async function handleLogout() {
    try {
      await axiosClient.post("/user/logout");
      removeKey(KEY_ACCESS_TOKEN);
      navigate("/admin");
    } catch (err) {
      Promise.reject(err);
    }
  }

  return (
    <div className="admin">
      <div className="dashboard">
        <div className="left-Nav flexCenter">
          <div className="logo"></div>
          <h1 className="logoname">
            Build<span className="Wname">N</span>ation
          </h1>
        </div>
        <h2>Admin Dashboard</h2>
        < MdOutlineLogout className="logoutBtn" onClick={handleLogout} />
      </div>

      <div className="adminBox">
        <div className="sidebar">
          <ul className="ulList">
            <Link className="links" to="">
              Home
            </Link>
        
            <Link className="links" to="create">
              Create Product
            </Link>
          </ul>
        </div>
        <div className="container">
          {load && (
            <LoadingBar
              color="#ff7b00"
              progress={99}
              loaderSpeed={2000}
              waitingTime={2000}
              height={4}
            />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
