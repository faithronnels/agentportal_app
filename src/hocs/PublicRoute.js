import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, children }) => {
  let location = useLocation();
  if (!isAuthenticated) {
    // if (isIdle) {
    //   logoutUser();
    //   return <Navigate to="/signin" state={{ from: location }} replace />;
    // }
    return children;
    
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PublicRoute;
