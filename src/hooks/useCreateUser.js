import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

// BE chưa có endpoint create — đoán endpoint, sửa lại theo BE thực tế
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data) =>
      instance.post("admin/user/create", data, { isPublic: false }),
  });
};
