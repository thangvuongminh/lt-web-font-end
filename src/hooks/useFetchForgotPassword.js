import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

export const useFetchForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => {
      return instance.post("/user/account/forgot-password", email);
    },
  });
};
