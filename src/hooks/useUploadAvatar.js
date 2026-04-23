import { useMutation } from "react-query";
import instance from "@/config/axiosConfig";

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: (formData) => {
      return instance.post("/profile/upload/avatar", formData, {
        isPublic: false,
      });
    },
  });
};
