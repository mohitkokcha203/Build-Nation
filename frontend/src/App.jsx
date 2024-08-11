import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/adminDashboard/Admin";
import CreateProduct from "./components/adminDashboard/adminPages/CreateProductPage/CreateProduct";
import HomeAdmin from "./components/adminDashboard/adminPages/HomeAdmin/HomeAdmin";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import AdminLogin from "./components/adminDashboard/AdminLogin";
import Signup from "./pages/SignupPage/Signup";
import DeleteProduct from "./components/adminDashboard/adminPages/DeleteProduct/DeleteProduct";
import UpdateProduct from "./components/adminDashboard/adminPages/UpdateProduct/UpdateProduct";
import Productinfo from "./components/Productinfo/Productinfo";
import Headphone from "./pages/Category/Headphone";
import Camera from "./pages/Category/Camera";
import Watch from "./pages/Category/Watch";
import VRHeadset from "./pages/Category/VRHeadset";
import Gadgets from "./pages/Category/Gadgets";
import AdminLoggedInNot from "./UTILS/AdminLoggedInNot";
import UserLoggedInNot from "./UTILS/UserLoggedInNot";
import RequireAdmin from "./UTILS/RequireAdmin";
import Parent from "./pages/HomeParent/Parent";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<Parent />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/headphone" element={<Headphone />} />
          <Route path="/category/camera" element={<Camera />} />
          <Route path="/category/watch" element={<Watch />} />
          <Route path="/category/vr-headset" element={<VRHeadset />} />
          <Route path="/category/gadgets" element={<Gadgets />} />
          <Route path="/productinfo/:productid" element={<Productinfo />} />
        </Route>
        <Route element={<UserLoggedInNot />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/*==============================   ADMIN ALL ROUTES  ADMIN ALL ROUTES   =============================== */}
        <Route element={<AdminLoggedInNot />}>
          <Route path="/admin" element={<AdminLogin />} />
        </Route>
        <Route element={<RequireAdmin />}>
          <Route path="/dashboard" element={<Admin />}>
            <Route path="" element={<HomeAdmin />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="delete/:productid" element={<DeleteProduct />} />
            <Route path="update/:productid" element={<UpdateProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
