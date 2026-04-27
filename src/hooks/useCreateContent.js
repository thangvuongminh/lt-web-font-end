import { useMutation } from "react-query";
import instance from "@/config/axiosConfig";

export const useCreateContent = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post("/contents", data, { isPublic: false });
    },
  });
};
