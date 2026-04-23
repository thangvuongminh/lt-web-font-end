import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";
import { data } from "react-router-dom";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.put("/profile/update", data, { isPublic: false });
    },
  });
};
