import { useSelector } from "react-redux";
import { Button, Result } from "antd";
import { useLocation } from "react-router-dom";
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

  console.log(roles);
  if (!isAuthenticated) {
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />;
  }
  const location = useLocation();
  if (checkRolesExist(location, "admin")) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
  if (checkRolesExist(location, "moderator")) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
  return <>{children}</>;
};
export default ProtectedRoute;
