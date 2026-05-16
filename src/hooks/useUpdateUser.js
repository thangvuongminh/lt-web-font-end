import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userId, data }) =>
      instance.patch(`admin/user/${userId}/update`, data, { isPublic: false }),
  });
};
