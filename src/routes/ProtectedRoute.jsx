import { useSelector } from "react-redux";
import { Button, Result } from "antd";
import { Navigate, useLocation } from "react-router-dom";
function checkRolesExist(requireRole, roles) {
  let isExistRole = false;
  if (typeof requireRole === "string") {
    return roles.includes(requireRole.toUpperCase());
  }
  requireRole.forEach((roleWantCheck) => {
    if (roles.includes(roleWantCheck.toUpperCase())) {
      isExistRole = true;
    }
  });
  return isExistRole;
}
const ProtectedRoute = ({ children, requireRole }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticate);
  const roles = useSelector((state) => state.auth.roles);
  if (!isAuthenticated) {
    return <Navigate to={"/404"} replace />;
  }
  if (!checkRolesExist(requireRole, roles)) {
    return <Navigate to={"/403"} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
