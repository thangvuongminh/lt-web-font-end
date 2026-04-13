import { useSelector } from "react-redux";
import { Button, Result } from "antd";
import { Navigate, useLocation } from "react-router-dom";
function checkRolesExist(location, roleWantCheck) {
  const roles = useSelector((state) => state.auth.roles);
  const checkRouteRole = location.pathname.includes(roleWantCheck);
  if (checkRouteRole && !roles.includes(roleWantCheck.toUpperCase())) {
    return false;
  }
  return true;
}
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticate);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/404"} replace />;
  }
  const location = useLocation();
  if (!checkRolesExist(location, "admin")) {
    return <Navigate to={"/403"} replace />;
  }
  if (!checkRolesExist(location, "moderator")) {
    return <Navigate to={"/403"} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
