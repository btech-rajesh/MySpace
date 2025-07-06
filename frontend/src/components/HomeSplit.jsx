import React from "react";
import MySpace from "../MySpace/MySpace";
import LogIn from "../Auth/LogIn";
import SignUp from "../Auth/SignUp";
import { useLocation } from "react-router-dom";

const HomeSplit = () => {
  const location = useLocation();
  // Show LogIn or SignUp based on query param or location
  const showLogin = location.pathname === "/login" || location.pathname === "/home" ;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <MySpace />
      </div>
      <div style={{ flex: 1 }}>
        {showLogin ? <LogIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default HomeSplit;