import React from "react";
import { KEY_ACCESS_TOKEN, getKey } from "./localStorage";
import { Navigate, Outlet } from "react-router-dom";
function RequireAdmin() {
  const user = getKey(KEY_ACCESS_TOKEN);
  return <div>{user ? <Outlet /> : <Navigate to="/admin" />}</div>;
}

export default RequireAdmin;
