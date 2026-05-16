import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId) =>
      instance.delete(`admin/user/${userId}/delete`, { isPublic: false }),
  });
};
