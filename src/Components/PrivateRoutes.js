import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
const PrivateRoutes = () => {
  const myContext = useContext(AllContext);
  const permission = myContext.adminPermission;

  // If user is admin, let the Outlet render, otherwise navigate to signin
  return permission ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
