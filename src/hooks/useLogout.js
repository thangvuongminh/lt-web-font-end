import instance from "@/config/axiosConfig";
import { logout } from "@/store/authenticateSlice";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await instance.post(
        "/user/account/logout",
        {},
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      navigate("/", { replace: true });
      setTimeout(() => {
        dispatch(logout());
      }, 100);
    },
    onError: () => {
      navigate("/", { replace: true });
      setTimeout(() => {
        dispatch(logout());
      }, 100);
    },
  });
};
