import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Component/Loader";
import { AuthContext } from "../../Context/AuthProvider";
import useCheckAdmin from "../../Hooks/useCheckAdmin";

const AdminRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useCheckAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loader />;
  }
  if (user?.uid && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;
