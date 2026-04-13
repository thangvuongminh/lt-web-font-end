import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";
import { data } from "react-router-dom";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("/user/account/login", data);
    },
  });
};
