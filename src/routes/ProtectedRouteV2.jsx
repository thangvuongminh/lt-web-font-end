import { useSelector } from "react-redux";
import { Button, Result } from "antd";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRouteV2 = ({ children, requireRole }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticate);
  const roles = useSelector((state) => state.auth.roles);
  if (!isAuthenticated) {
    return <Navigate to={"/404"} replace />;
  }
  if (roles.length > 1) {
    return <Navigate to={"/403"} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRouteV2;
