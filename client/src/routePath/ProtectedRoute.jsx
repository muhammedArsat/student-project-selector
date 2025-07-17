import React, { useContext, useEffect } from "react";
import AuthContext from "../hooks/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole  }) => {
  const { email, role, loading } = useContext(AuthContext);


  if (loading) {
    return <h1>Loading</h1>;
  }
  if (!email) {
    return <Navigate to={"/"} replace />;
  }

  if (!allowedRole.includes(role)) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
