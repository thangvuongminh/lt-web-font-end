import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/ui/Loading";
import { login } from "@store/authenticateSlice";

const AuthProvider = ({ children }) => {
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8090/user/account/refreshToken",
          {},
          { withCredentials: true },
        );
        dispatch(login(res.data.data.accessToken));
      } catch (err) {
      } finally {
        setIsRedirect(false);
      }
    };

    initAuth();
  }, []);
  if (isRedirect) {
    return <Loading />;
  }
  return <>{children}</>;
};
export default AuthProvider;
