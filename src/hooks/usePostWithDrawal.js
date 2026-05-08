import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";
import { data } from "react-router-dom";

export const usePostWithDrawal = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("withdrawal", data, {
        isPublic: false,
      });
    },
  });
};
