import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("/user/account/change-password", data);
    },
  });
};
