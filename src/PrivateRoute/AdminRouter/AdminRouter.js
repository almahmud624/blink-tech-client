import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useCheckAdmin from "../../Hooks/useCheckAdmin";

const AdminRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useCheckAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return `${(<h1>loading...</h1>)}`;
  }
  if (user?.uid && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;
