import React from "react";
import { KEY_ACCESS_TOKEN, getKey } from "./localStorage";
import { Navigate, Outlet } from "react-router-dom";

function AdminLoggedInNot() {
  const admin = getKey(KEY_ACCESS_TOKEN);
  return <div>{admin ? <Navigate to="/dashboard" /> : <Outlet />}</div>;
}

export default AdminLoggedInNot;
