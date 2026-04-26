import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";
import { data } from "react-router-dom";

export const useFetchRegisterCreator = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("/ai/register/creator", data, {
        isPublic: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
