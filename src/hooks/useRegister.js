import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";
import { data } from "react-router-dom";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("/user/account/register", data);
    },
  });
};
