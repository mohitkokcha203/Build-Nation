import React from "react";
import { KEY_ACCESS_TOKEN, getKey } from "./localStorage";
import { Navigate, Outlet } from "react-router-dom";
function UserLoggedInNot() {
  const admin = getKey(KEY_ACCESS_TOKEN);
  return <div>{admin ? <Navigate to="/" /> : <Outlet />}</div>;
}

export default UserLoggedInNot;
